import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

//  time date
const time_data = ["11:00", "12:00", "01:00", "02:00", "04:00"];
const delivery_days = ["1-2", "2-3", "3-4", "5-6", "7-8"]

const TImeTab = ({ setTime, currentTime }) => {
    return (
        <ScrollView contentContainerStyle={styles.container} showsHorizontalScrollIndicator={false} horizontal={true} >
            {
                time_data.map((time) => (
                    <Pressable key={time} style={[styles.buttons_style, currentTime == time && { backgroundColor: "#614c66" }]} onPress={() => setTime(time)}>
                        <Text style={[currentTime == time && { color: 'white' }]}>{time} PM</Text>
                    </Pressable>
                ))
            }
        </ScrollView>
    )
}
const DayTab = ({ setDayrange, currentDayRange }) => {
    return (<ScrollView contentContainerStyle={styles.container} showsHorizontalScrollIndicator={false} horizontal={true} >
        {
            delivery_days.map((days) => (
                <Pressable key={days} style={[styles.buttons_style, currentDayRange == days && { backgroundColor: "#614c66" }]} onPress={() => setDayrange(days)}>
                    <Text style={[currentDayRange == days && { color: 'white' }]}>{days} days</Text>
                </Pressable>
            ))
        }
    </ScrollView>)
}

export { TImeTab, DayTab }

const styles = StyleSheet.create({
    container: {

        flexDirection: 'row',
        // justifyContent: 'space-between',
        paddingHorizontal: 14,
        alignItems: 'center',
        paddingVertical: 10,
    },
    buttons_style: {
        borderWidth: 1,
        borderColor: 'black',
        marginHorizontal: 10,
        padding: 5
    }
})