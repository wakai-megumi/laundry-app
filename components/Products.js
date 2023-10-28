import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { products_data } from '../data/TempData'
import ProductCard from './card_utils/ProductCard'
import { useDispatch, useSelector } from 'react-redux'
import { get_products } from '../redux-store/ProductReducer'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase'
import { ActivityIndicator } from 'react-native'

const Products = () => {
    const [products_loading, set_products_loading] = useState(true)
    const products = useSelector((state) => state.product.product)

    const dispatch = useDispatch()
    const fetch_product_from_server = async () => {
        const collection_reference = collection(db, 'types');
        const query_snapshot = await getDocs(collection_reference)
        query_snapshot.forEach((doc) => {
            const data = doc.data();

            dispatch(get_products(data))
        })

    }
    useEffect(() => {
        if (products.length > 0) return;  // check if we have already the items so again initiating the req will have copy of the products rendered
        set_products_loading(true)
        fetch_product_from_server()
        set_products_loading(false)
    }, [])
    return (


        <View>
            {
                products_loading ?
                    <View style={{ alignItems: 'center', justifyContent: 'center  ' }}>
                        < Text > loading products </Text >
                        < ActivityIndicator size='large' color='red' />
                    </View>

                    :

                    products.map(product => (
                        <ProductCard key={product.id} item={product} />
                    ))
            }
        </View>
    )
}

export default Products

const styles = StyleSheet.create({})