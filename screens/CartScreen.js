import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import { clear_cart, decrease_quantity_of_item_cart, increase_quantity_of_item_cart } from '../redux-store/CartReducer';
import { decrease_quantity_of_item, increase_quantity_of_item } from '../redux-store/ProductReducer';
import { useDispatch, useSelector } from 'react-redux';
import { auth, db } from "../firebase"
import { doc, setDoc } from "firebase/firestore"

const CartScreen = () => {
    const cart = useSelector((state) => state.cart.cart)
    let sum = 0;
    let item_quantity = 0;
    cart.forEach((item) => {
        sum = sum + item.price * item.quantity;
        item_quantity = item_quantity + item.quantity;


    })
    const dispatcher = useDispatch()
    total = sum;

    const navigation = useNavigation()
    const route = useRoute();
    console.log(cart)
    const handle_order_confirmation = async () => {

        // updating these values in the firebase 
        const user_id = auth.currentUser.uid;
        await setDoc(doc(db, "users", `${user_id}`), {
            order: { ...cart },
            pickupDetails: route.params,
        },
            { merge: true }
        )
        dispatcher(clear_cart());
        // naviagation to the order screen 
        navigation.navigate("OrderScreen")
    }
    return (
        <>
            <ScrollView style={{ marginVertical: 20 }}>
                <View>
                    <Pressable style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}><Text style={{ fontSize: 20, fontWeight: 'bold' }}> Bucket </Text>

                    </Pressable>
                </View>
                <View >
                    {cart.length > 0 ? (

                        cart.map((item, index) => {

                            return (
                                <Pressable key={index} style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', backgroundColor: '#EAEAEA', paddingVertical: 5 }}>
                                    <Text style={{ fontSize: 20, fontWeight: 'semibold' }}>{item.name}</Text>
                                    {/*  - and + button */}
                                    <Pressable
                                        style={{
                                            flexDirection: "row",
                                            marginLeft: 60,
                                            gap: 15,
                                            alignItems: "center",
                                            justifyContent: "center",
                                            borderWidth: 1,
                                            borderColor: 'black',
                                            borderRadius: 20,
                                            paddingHorizontal: 10,
                                            paddingVertical: 2
                                        }}
                                    >
                                        <Pressable
                                            onPress={() => {
                                                dispatcher(decrease_quantity_of_item(item))   // product

                                                dispatcher(decrease_quantity_of_item_cart(item))   // cart

                                            }}
                                            style={{
                                                backgroundColor: "orange",
                                                borderRadius: 100,
                                                alignItems: "center",
                                                justifyContent: "center",
                                                width: 30,
                                                height: 30,
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    color: "white",
                                                    fontSize: 20,
                                                    fontWeight: "800",
                                                    marginTop: -4,
                                                }}
                                            >
                                                -
                                            </Text>
                                        </Pressable>
                                        <Text style={{ fontSize: 23 }}>
                                            {item.quantity}
                                        </Text>
                                        <Pressable
                                            onPress={() => {
                                                dispatcher(increase_quantity_of_item(item))

                                                dispatcher(increase_quantity_of_item_cart(item))
                                            }}
                                            style={{
                                                backgroundColor: "orange",
                                                borderRadius: 100,
                                                alignItems: "center",
                                                justifyContent: "center",
                                                width: 30,
                                                height: 30,
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    color: "white",
                                                    fontSize: 20,
                                                    fontWeight: "600",
                                                    marginTop: -2,
                                                }}
                                            >
                                                +
                                            </Text>
                                        </Pressable>
                                    </Pressable>
                                    <Text style={{ fontSize: 20, fontWeight: 'semibold' }}>{item.price * item.quantity}</Text>
                                </Pressable>
                            )
                        })
                    ) : (
                        <View>
                            <Text>Your Cart does not contain anything</Text>
                        </View>
                    )}
                </View>
                {/* billing details section    --- can be made a module later  */}
                <View >
                    <Text style={{ marginLeft: 5, marginTop: 15, fontSize: 20, fontWeight: 'bold' }}>Billing Details</Text>
                    <View style={{ backgroundColor: '#EAEAEA', paddingVertical: 5, paddingLeft: 20, gap: 10 }}
                    >
                        <Text>Total bill :   {total}</Text>
                        <Text>Delivery fee : 1.2 km      FREE</Text>
                        <Text>   No. of Days : {route.params.DayRange}  Days</Text>
                        <Text>  Pick up time : {route.params.selectecTime}  </Text>





                    </View>


                </View>

            </ScrollView >

            {/* checkout option */}
            {
                cart.length > 0 ? <Pressable style={styles.checkout}>
                    <View style={{ flexDirection: 'column', gap: 10 }}>
                        <Text style={{ margin: -4, fontSize: 15, fontWeight: '600', }}> {item_quantity} items || $ {total}</Text>
                        <Text style={{ color: 'green' }}>extra charges may apply </Text>

                    </View>
                    <Pressable
                        onPress={() => handle_order_confirmation()}
                        style={{ backgroundColor: 'black', borderRadius: 6, paddingHorizontal: 7 }} >
                        <Text style={{ color: 'white', fontSize: 20, fontWeight: '600' }}>  place order</Text>
                    </Pressable>

                </Pressable >
                    :
                    null
            }
        </>

    )
}

export default CartScreen

const styles = StyleSheet.create({
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
})