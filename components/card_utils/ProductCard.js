import { Pressable, StyleSheet, Text, View, Image } from "react-native"
import React from "react"
import { useDispatch, useSelector } from "react-redux"
import {
    add_to_cart,
    decrease_quantity_of_item_cart,
    increase_quantity_of_item_cart,
} from "../../redux-store/CartReducer"
import {
    decrease_quantity_of_item,
    increase_quantity_of_item,
} from "../../redux-store/ProductReducer"

const ProductCard = ({ item }) => {
    const dispatcher = useDispatch()
    //

    const cart = useSelector((state) => state.cart.cart)
    const add_item_to_cart = () => {
        dispatcher(add_to_cart(item)) // item
        dispatcher(increase_quantity_of_item(item)) // product
    }
    return (
        <View
            style={{
                backgroundColor: "black",
                padding: 5,
                marginHorizontal: 5,
                marginVertical: 9,
            }}
        >
            <Pressable
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <View>
                    <Image
                        style={{ height: 120, width: 120 }}
                        source={{ uri: item.url }}
                    />
                </View>
                <View style={{ marginLeft: -50, justifyContent: "center" }}>
                    <Text style={{ fontSize: 20, fontWeight: "600", color: "white" }}>
                        {item.name}
                    </Text>
                    <Text style={{ color: "white", marginTop: 5, marginLeft: -2 }}>
                        {" "}
                        RS. {item.price}
                    </Text>
                </View>

                {cart.some((cartItem) => cartItem.id === item.id) ? (
                    <>
                        <Pressable
                            style={{
                                flexDirection: "row",
                                gap: 10,
                                marginRight: 20,
                                alignItems: "center",
                                justifyContent: "center",
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
                                        fontSize: 25,
                                        fontWeight: "800",
                                        marginTop: -4,
                                    }}
                                >
                                    -
                                </Text>
                            </Pressable>
                            <Text style={{ color: "white", fontSize: 30 }}>
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
                                        fontSize: 25,
                                        fontWeight: "600",
                                        marginTop: -2,
                                    }}
                                >
                                    +
                                </Text>
                            </Pressable>
                        </Pressable>
                    </>
                ) : (
                    <>
                        <Pressable
                            onPress={add_item_to_cart}
                            style={{
                                marginRight: 20,
                                paddingVertical: 8,
                                paddingHorizontal: 12,
                                backgroundColor: "orange",
                                borderRadius: 10,
                            }}
                        >
                            <Text style={{ color: "white", fontWeight: "500" }}>Add</Text>
                        </Pressable>
                    </>
                )}
            </Pressable>
        </View>
    )
}

export default ProductCard

const styles = StyleSheet.create({})
