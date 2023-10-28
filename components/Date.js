import { Pressable, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React from 'react'
import moment from 'moment'
const Date = ({ date, onSelectDate, selected }) => {

    // check if the  date is the today's date show today or the day name
    const current_day = moment(date).format('DD-MM-YYYY') === moment().format('DD-MM-YYYY') ? 'today' : moment(date).format('ddd');   // 16-09-2023

    // find the day number    -1,2,3,23 , 15 -----
    const day_number = moment(date).format('D');
    //
    const fulldate = moment(date).format('DD-MM-YYYY');   /// we will compare if the current date is same aas selected date then highligh the button 






    return (
        <Pressable
            onPress={() => onSelectDate(fulldate)}
            style={[
                styles.card,
                selected === fulldate && { backgroundColor: '#614c66' },
            ]}
        >
            <Text
                style={[
                    styles.big,
                    selected === fulldate && { color: '#fff' },
                ]}
            >
                {current_day}
            </Text>
            <View style={{ height: 10 }} />
            <Text
                style={[
                    styles.medium,
                    selected === fulldate && {
                        color: '#fff',
                        fontWeight: 'bold',
                        fontSize: 24,
                    },
                ]}
            >
                {day_number}
            </Text>

        </Pressable>
    )
}

export default Date

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#eee',
        borderRadius: 10,
        borderColor: '#ddd',
        padding: 10,
        marginVertical: 10,
        alignItems: 'center',
        height: 90,
        width: 80,
        marginHorizontal: 5,
    },
    big: {
        fontWeight: 'bold',
        fontSize: 20,
    },
    medium: {
        fontSize: 16,
    },
})