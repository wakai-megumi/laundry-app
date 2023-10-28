import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { addDoc, collection, getDocs } from 'firebase/firestore'
import createTwoButtonAlert from "../utils/StaticCode"
import { db } from '../firebase'

const AddProducts = () => {
    const [product_name, set_product_name] = React.useState('');
    const [product_quantity, set_product_quantity] = React.useState('');
    const [product_price, set_product_price] = React.useState('');
    const [product_image, set_product_image] = React.useState('');

    const add_product_in_db = async () => {
        if (product_name == '' || product_quantity == '' || product_price == '' || product_image == '') {
            createTwoButtonAlert("Invalid Details", " please fill all the details")
            return;
        }
        // add product in firebase db
        const products_collection = collection(db, "types");

        const query_snapshot = await getDocs(products_collection);
        let product_id = query_snapshot.size;

        await addDoc(products_collection, {
            id: product_id++,
            name: product_name,
            quantity: product_quantity,
            price: product_price,
            url: product_image
        })
        clear_all_fields();
        createTwoButtonAlert('Product added successfully', 'please continue to add more products')

    }
    const clear_all_fields = () => {
        set_product_name('');
        set_product_quantity('');
        set_product_price('');
        set_product_image('');
    }
    return (
        <SafeAreaView style={{ flex: 1, alignItems: 'center', backgroundColor: 'gray' }}>
            <Text style={styles.heading}> ADD Services Details here</Text>
            <View style={styles.product_section}>
                <Text style={styles.product_detail_heading}>Product Name</Text>
                <TextInput style={styles.product_detail} placeholder="Enter product name here" value={product_name} onChangeText={(text) => set_product_name(text)}></TextInput>

            </View>
            <View style={styles.product_section}>
                <Text style={styles.product_detail_heading}>Product Quantity</Text>
                <TextInput style={styles.product_detail} placeholder="Enter product Quantity here" value={product_quantity} onChangeText={(text) => set_product_quantity(text)}></TextInput>

            </View>
            <View style={styles.product_section}>
                <Text style={styles.product_detail_heading}>Product Price</Text>
                <TextInput style={styles.product_detail} placeholder="Enter product price here" value={product_price} onChangeText={(text) => set_product_price(text)}></TextInput>

            </View>
            {/*  storing images  */}
            <View style={styles.product_section}>
                <Text style={styles.product_detail_heading}>Product image</Text>
                <TextInput style={styles.product_detail} placeholder="Enter product image url here" value={product_image} onChangeText={(text) => set_product_image(text)}></TextInput>

            </View>
            <Pressable onPress={add_product_in_db}>
                <Text style={{ backgroundColor: 'orange', color: 'black', padding: 10, fontSize: 18, letterSpacing: 1.5, fontWeight: '700', borderRadius: 10 }}>Add  Service</Text>
            </Pressable>


        </SafeAreaView>
    )
}

export default AddProducts

const styles = StyleSheet.create({
    heading: {
        backgroundColor: 'black',
        width: '100%',
        color: 'white',
        height: 60,
        fontSize: 20,
        textAlign: 'center',
        paddingTop: 15,
    },
    product_section: {
        justifyContent: 'space-between',

        marginVertical: 30,
        width: "80%",
        alignItems: 'flex-start',
        gap: 10
    },
    product_detail_heading: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    product_detail: {
        width: '100%',
        height: 40,
        borderRadius: 10,
        borderBottomWidth: 3,
        borderTopWidth: 1,
        borderLeftWidth: 2,
        borderColor: 'orange',
        paddingLeft: 20,
        backgroundColor: 'lightgray',
        letterSpacing: 1.2,
        fontWeight: '600',
        fontSize: 15
    }
})