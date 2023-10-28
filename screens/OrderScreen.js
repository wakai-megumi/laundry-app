import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { SafeAreaView } from 'react-native-safe-area-context'

const OrderScreen = () => {

    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: 20 }}
        >
            <Text>your order has been placed</Text>
            <Text> we are working on adding the animation to this screen , hopefully next time </Text>
            <Text> That's all for this  </Text>

        </SafeAreaView>
    )
}

export default OrderScreen

const styles = StyleSheet.create({})