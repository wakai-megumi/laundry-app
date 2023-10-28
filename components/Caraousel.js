import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SliderBox } from "react-native-image-slider-box"
const Caraousel = () => {
    const images =
        ["https://yt3.ggpht.com/yti/AOXPAcVv7qRZXNyGJcU3p7DET-NlQJbXOW9ai3QepPAwGA=s88-c-k-c0x00ffffff-no-rj",
            "https://images.pexels.com/photos/36717/amazing-animal-beautiful-beautifull.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500",
            "https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832_640.jpg",
        ]

    return (
        <View >
            <SliderBox images={images} circleLoop dotColor="orange" inactiveDotColor="#90A4AE"
                ImaageComponentStyle={{

                    width: "90%",



                }}
            />
        </View>
    )
}

export default Caraousel

const styles = StyleSheet.create({})