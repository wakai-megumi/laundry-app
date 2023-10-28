import { Pressable, StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const ServiceCard = (props) => {

    return (
        <View style={{ marginRight: 15, }}>


            <Pressable style={{
                borderRadius: 5,

                overflow: 'hidden',

                backgroundColor: 'white',
                alignItems: 'center',
                justifyContent: 'center'
            }} >

                <Image
                    style={{
                        height: 100,
                        width: 100,


                        // overflow: 'hidden'
                    }}
                    resizeMode="cover"
                    source={{ uri: props.url }}
                />

                <Text style={{ textAlign: 'center' }}>{props.name}</Text>
            </Pressable>

        </View>
    )
}

export default ServiceCard

const styles = StyleSheet.create({})