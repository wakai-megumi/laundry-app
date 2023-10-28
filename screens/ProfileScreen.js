import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { auth } from '../firebase'
import { useNavigation } from "@react-navigation/native";

const ProfileScreen = () => {
    const navigation = useNavigation();
    const handle_sign_out_user = async () => {
        await auth.signOut(auth).then(() => {
            navigation.navigate('Login')
        }).catch((error) => {
            console.log(error)
        })
    }
    return (
        <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ gap: 10 }}>
                <Text >
                    Please click below to sign out from the app!
                </Text>
                <Pressable
                    onPress={() => handle_sign_out_user()}
                    style={{ borderRadius: 50, alignItems: 'center', padding: 10, backgroundColor: 'orange', fontsize: 20, fontWeight: 'bold', color: 'white' }}>
                    <Text style={{ color: 'white', fontSize: 20 }}>
                        Sign out!
                    </Text>
                </Pressable>
            </View>
        </SafeAreaView>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({})