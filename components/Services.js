import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { products_data, services_data } from '../data/TempData'
import ServiceCard from './card_utils/ServiceCard'


const Services = () => {

    //



    return (
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ margin: 9 }} >
            {
                services_data.map((service) => (
                    < ServiceCard key={service.id} url={service.url} name={service.name} />
                ))
            }
        </ScrollView >
    )
}

export default Services

const styles = StyleSheet.create({})    