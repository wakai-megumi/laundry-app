import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useEffect } from 'react';
import { calendermaker } from '../utils/Calendermaker';
import { useState } from 'react';
import Date from './Date';

const Calendar = ({ onSelectDate, selected }) => {

    const [dates, setDates] = useState([]);


    useEffect(() => {
        calendermaker(31, setDates);       // util function for making some dates 

    }, [])



    return (
        <>
            <View style={styles.centered}>
                <Text style={styles.title}>Current month</Text>
            </View>
            <View style={styles.dateSection}>
                <View style={styles.scroll}>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    >
                        {dates.map((date, index) => (
                            <Date
                                key={index}
                                date={date}
                                onSelectDate={onSelectDate}
                                selected={selected}
                            />
                        ))}
                    </ScrollView>
                </View>
            </View>
        </>
    )
}

export default Calendar

const styles = StyleSheet.create({
    centered: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    dateSection: {
        width: '100%',
        padding: 20,
    },
    scroll: {
        height: 150,
    },
})