import { Pressable, SafeAreaView, StyleSheet, Text, View, Image, TextInput, ScrollView } from "react-native"
import React, { useEffect, useState } from "react"
import * as Location from "expo-location"
import createTwoButtonAlert from "../utils/StaticCode"
import { FontAwesome } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import Services from "../components/Services";
import Caraousel from "../components/Caraousel";
import Products from "../components/Products";
import { useSelector } from 'react-redux'
import { useNavigation } from "@react-navigation/native";
const messages = {
    msg_one: {
        alert_title: "location is not enabled on the device",
        alert_msg: "please enable it in the settings of the device",
    },
    msg_two: {
        alert_title: "permission denied for the app",
        alert_msg: "allow the app to use the services",
    },
}
const HomeScreen = () => {
    // 
    const cart = useSelector((state) => state.cart.cart)
    let sum = 0;
    let item_quantity = 0;
    cart.forEach((item) => {

        item_quantity = item_quantity + item.quantity;
        sum = sum + item.price * item.quantity;
    })
    let total = sum
    const navigation = useNavigation()
    //
    const [showCurrentAddress, set_showCurrentAddress] = useState(
        "location is loading"
    )
    const [islocation_services_enabled, set_islocation_services_enabled] =
        useState(false)
    //
    useEffect(() => {
        check_if_location_enabled()
        get_current_location()
    }, [])
    //
    const check_if_location_enabled = async () => {
        const is_enabled = await Location.hasServicesEnabledAsync()
        if (!is_enabled)
            createTwoButtonAlert(
                messages.msg_one.alert_title,
                messages.msg_one.alert_msg
            )
        else set_islocation_services_enabled(is_enabled)
    }
    //
    const get_current_location = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync()
        if (status !== "granted")
            createTwoButtonAlert(
                messages.msg_two.alert_title,

                messages.msg_two.alert_msg
            )
        const { coords } = await Location.getCurrentPositionAsync()
        // console.log(coords, "coords in homescreen")
        if (coords) {
            const { latitude, longitude } = coords
            let response = await Location.reverseGeocodeAsync({ latitude, longitude })
            // console.log(response)
            for (let item of response) {
                const address = `${item.country} ,${item.city} ,${item.postalCode}`
                // console.log(address)
                set_showCurrentAddress(address)
            }
        }
    }
    //
    return (
        <>
            <ScrollView style={{ backgroundColor: 'gray', flex: 1 }}>
                <View style={styles.header_style}>
                    <FontAwesome name="location-arrow" size={24} color="orange" />
                    <View style={styles.container}>

                        <Text style={styles.header_text}>HOME</Text>
                        <Text style={styles.address_style}>{showCurrentAddress}</Text>

                    </View>

                    <View style={styles.profile_container}>
                        <Pressable style={styles.profile_button}
                            onPress={() => navigation.navigate("ProfileScreen")}
                        >
                            <Image
                                style={styles.profile_image}
                                source={{ uri: "https://yt3.ggpht.com/yti/AOXPAcVv7qRZXNyGJcU3p7DET-NlQJbXOW9ai3QepPAwGA=s88-c-k-c0x00ffffff-no-rj" }}
                            />
                        </Pressable>
                    </View>

                </View>
                {/* search bar */}
                <View style={{ flexDirection: 'row', margin: 4, padding: 4, justifyContent: "space-between", alignItems: "center", borderWidth: 2, borderRadius: 10, borderColor: "orange", }}>
                    <TextInput placeholder="Search here or more" style={{ fontSize: 20, padding: 3 }} />
                    <EvilIcons name="search" size={24} color="black" style={{ marginRight: 4 }} />
                </View>
                {/* Carousel */}
                <View style={{ width: '90%', margin: 3, }}>
                    <Caraousel />

                </View>
                {/* horizontal scrool for services */}
                <View>
                    <Text style={{ fontSize: 20, textAlign: 'center', fontWeight: '700', color: 'white', marginBottom: 5 }}> Services</Text>
                    < Services />
                </View>
                {/*   products list */}
                <View >
                    <View style={{ flexDirection: 'row', gap: 20, backgroundColor: 'black', alignItems: 'center', justifyContent: 'center', paddingVertical: 5 }}>
                        <Text style={{ color: 'white', height: 30, paddingTop: 5 }}>Products listed below</Text>
                        <Pressable onPress={() => navigation.navigate("ADDProdcuts")}
                            style={{ backgroundColor: 'orange', borderRadius: 50, paddingVertical: 2, paddingHorizontal: 5, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white', marginRight: 5 }}> +</Text>
                        </Pressable>
                    </View>

                    <Products />
                </View>
            </ScrollView >

            {/* checkout option */}
            {
                cart.length > 0 ? <Pressable style={styles.checkout}>
                    <View style={{ flexDirection: 'column', gap: 10 }}>
                        <Text style={{ margin: -4, fontSize: 15, fontWeight: '600', }}> {item_quantity} items || $ {total}</Text>
                        <Text style={{ color: 'green' }}>extra charges may apply </Text>

                    </View>
                    <Pressable style={{ backgroundColor: 'black', borderRadius: 6, paddingHorizontal: 7 }} onPress={() => navigation.navigate('Checkout')}>
                        <Text style={{ color: 'white', fontSize: 20, fontWeight: '600' }}>  checkout</Text>
                    </Pressable>

                </Pressable >
                    :
                    null
            }

        </>
    );

}

export default HomeScreen

const styles = StyleSheet.create({
    header_style: {
        padding: 15,
        height: 100,
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center',
        backgroundColor: "black",
    },
    header_text: {
        color: 'white',
        fontWeight: '700',
        fontSize: 18,
    },
    container: {
        flexDirection: 'column',
        alignContent: "center",
    },

    address_style: {
        zIndex: 999,
        color: 'white',
        marginLeft: 5,
        fontSize: 14,
    },
    profile_container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    profile_button: {
        padding: 5,
        borderRadius: 25,
        backgroundColor: 'white',
    },
    profile_image: {
        width: 40,
        height: 40,
        borderRadius: 14,
    },
    checkout: {
        border: '5px solid black',
        backgroundColor: 'orange',
        height: 70,
        margin: 5,
        borderRadius: 10,
        padding: 5,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    }

});

