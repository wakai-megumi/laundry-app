import {
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    Pressable,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native"
import React from "react"
import { useEffect, useState } from "react"
import { Entypo } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import { signInWithEmailAndPassword } from "firebase/auth"

import { auth } from "../firebase"
import createTwoButtonAlert from "../utils/StaticCode"
const LoginScreen = () => {
    const [buttonPressed, setButtonPressed] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(true)
    const handlePressIn = () => {
        setButtonPressed(true)
    }
    const navigation = useNavigation()

    //  checking if the user is logged in or not
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authuser) => {
            if (authuser) navigation.navigate("Home")
            else setLoading(false)
        })
        return unsubscribe
    }, [])
    // handle no account
    const handle_no_account = () => {
        navigation.navigate("Register")
    }
    // handle login functionality for the app
    const handle_login_button = () => {
        if (email === "" || password === "") {
            createTwoButtonAlert("Invalid Details", " please fill all the details")
            return;
        }
        signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
            const user = userCredential.user
            if (user) {
                // Alert.alert("Login Successfull", "We hope you enjoy our services")
                setTimeout(() => {
                    navigation.navigate("Home")
                }, 2000)
            }
        }).catch((error) => {
            createTwoButtonAlert("your email or password is incorrect", "please try again")
        })
    }

    return (
        <SafeAreaView style={styles.logincontainer}>

            {
                loading ? (
                    <View style={{ flex: 1, alignItems: "center", flexDirection: 'row', gap: 10, justifyContent: "center" }}>
                        <Text> Loading please wait !</Text>
                        <ActivityIndicator size="large" color="#00ff00" />
                    </View>
                ) : (
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
                                    Login
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
                                            fontSize: email ? 24 : 15,
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
                                    handle_login_button()
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
                                    Login
                                </Text>
                            </Pressable>
                            <Pressable onPress={handle_no_account}>
                                <Text > Don't have an acccount , click here</Text>
                            </Pressable>
                        </View>
                    </KeyboardAvoidingView >
                )
            }




        </SafeAreaView >
    )
}

export default LoginScreen

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
