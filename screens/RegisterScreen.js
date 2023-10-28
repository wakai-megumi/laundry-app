import {
    Keyboard,
    KeyboardAvoidingView,
    Pressable,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native"
import React, { useState } from "react"
import { Entypo } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import createTwoButtonAlert from "../utils/StaticCode"
import { auth, createUserWithEmailAndPassword, db } from "../firebase"
import { doc, setDoc } from "firebase/firestore"
const RegisterScreen = () => {
    const [buttonPressed, setButtonPressed] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [phone_no, setPhone_no] = useState("")

    const handlePressIn = () => {
        setButtonPressed(true)
    }
    // handle no account
    const navigation = useNavigation()
    const handle_already_account = () => {
        navigation.navigate("Login")
    }
    // handle register
    const handle_register = () => {
        if (email === "" || password === "" || phone_no === "") {
            createTwoButtonAlert("Some values are missing", " please fill all the details");
            return;
        }
        createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
            console.log(userCredential, " ew user ")
            const user = userCredential._tokenResponse.email
            const myuserId = userCredential.user.uid

            setDoc(doc(db, "users", `${myuserId}`), {
                email: user,
                phone_no: phone_no
            })
            createTwoButtonAlert("Account created Successfully", " please login to continue")
            // move  to the login page
            setTimeout(() => {
                navigation.navigate("Login");                 // add delay  so the  user can read the message

            }, 2000)

        }).catch((error) => {
            let error_Message = "An error has occurred , please try again later"
            if (error.code == "auth/invalid-email") error_Message = " Invalid email address  "
            else if (error.code == "auth/email-already-in-use") error_Message = "Email already exist , please register using different email"

            createTwoButtonAlert("Error", error_Message)
        })

    }
    return (
        <SafeAreaView style={styles.logincontainer}>
            <KeyboardAvoidingView>
                <View style={styles.parent_view}>
                    <View style={styles.heading_Section}>
                        <Text
                            style={{
                                fontSize: 35,
                                fontWeight: "bold",
                                color: "purple",
                            }}
                        >

                            Register
                        </Text>
                    </View>
                    <View style={styles.detail_section}>
                        <Text>Enter details here!</Text>
                    </View>
                    <View style={styles.credentials}>
                        <View style={{ flexDirection: "row", gap: 10 }}>
                            <Entypo name="mail" size={24} color="black" />
                            <TextInput
                                placeholder="email here"
                                onChangeText={(text) => setEmail(text)}
                                style={{
                                    borderColor: "lightgrey",
                                    fontSize: email ? 18 : 15,
                                    letterSpacing: 2,
                                    borderBottomWidth: 2,
                                    width: 300,
                                }}
                            />
                        </View>
                        <View style={{ flexDirection: "row", gap: 10, marginTop: 20 }}>
                            <Entypo name="key" size={24} color="black" />
                            <TextInput
                                placeholder="Password"
                                onChangeText={(e) => setPassword(e)}

                                secureTextEntry={true}
                                style={{
                                    borderColor: "lightgrey",
                                    fontSize: password ? 18 : 15,

                                    letterSpacing: 2,
                                    borderBottomWidth: 2,
                                    width: 300,
                                }}
                            />
                        </View>
                        <View style={{ flexDirection: "row", gap: 10, marginTop: 20 }}>
                            <Entypo name="phone" size={24} color="black" />
                            <TextInput

                                placeholder="Phone no. here"
                                onChangeText={(e) => setPhone_no(e)}

                                style={{
                                    borderColor: "lightgrey",
                                    fontSize: password ? 24 : 15,

                                    letterSpacing: 2,
                                    borderBottomWidth: 2,
                                    width: 300,
                                }}
                            />
                        </View>
                    </View>
                    <Pressable
                        onPress={() => {
                            handle_register()
                        }}
                        onPressIn={handlePressIn}
                        style={[styles.button, buttonPressed && styles.buttonPressed]}
                    >
                        <Text
                            style={{
                                fontSize: 20,
                                fontWeight: "bold",
                                letterSpacing: 2,
                                color: "white",
                            }}
                        >
                            Register
                        </Text>
                    </Pressable>
                    <Pressable onPress={handle_already_account}>
                        <Text >Already have an acccount  ? click here</Text>
                    </Pressable>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({
    parent_view: {
        marginTop: 20,
        alignItems: "center",
        justifyContent: "center",
        padding: 5,
    },
    logincontainer: { flex: 1, backgroundColor: "#eee" },
    heading_Section: {
        marginTop: 80,
    },
    detail_section: {},
    credentials: {
        marginTop: 50,
        alignItems: "center",
        justifyContent: "center",
    },
    button: {
        padding: 8,
        marginVertical: 20,
        borderRadius: 25,
        backgroundColor: "orange",
        paddingHorizontal: 50,
        alignItems: "center",
        justifyContent: "center",
        elevation: 5, // Add elevation for the 3D effect,
        button: {
            width: 200,
            height: 50,
            backgroundColor: "orange",
            borderRadius: 25,
            alignItems: "center",
            justifyContent: "center",
            ...Platform.select({
                ios: {
                    shadowColor: "rgba(222, 123, 24, 0.727)",
                    shadowOffset: { width: 2, height: 2 },
                    shadowOpacity: 1,
                    shadowRadius: 5,
                },
                android: {
                    elevation: 5, // Elevation on Android simulates a shadow effect
                },
            }),
        },
    },
    buttonPressed: {
        transform: [{ translateY: 2 }, { translateX: 2 }], // Move the button down and to the right
    },
})
