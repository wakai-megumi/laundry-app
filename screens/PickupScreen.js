import { Pressable, StyleSheet, Text, TextInput, View } from "react-native"
import React, { useState } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import Calendar from "../components/Calender"
import { DayTab, TImeTab } from "../components/PickerTabs"
import { useNavigation } from "@react-navigation/native"
import { ALERT_TYPE, AlertNotificationRoot, Toast } from 'react-native-alert-notification';
import { useSelector } from "react-redux"
export default function PickupScreen() {
  const [address, setAddress] = useState("")
  const [selectedDate, setselectedDate] = useState("")
  const [selectTime, setSelectTime] = useState("")
  const [DayRange, setDayRange] = useState("")
  const cart = useSelector((state) => state.cart.cart)
  const navigation = useNavigation()
  let item_quantity = 0;
  let sum = 0;

  cart.forEach((item) => {
    sum = sum + item.price * item.quantity;
    item_quantity = item_quantity + item.quantity;


  })
  let total = sum
  const movement_to_cart_page = () => {
    if (selectedDate == "" || selectTime == "" || DayRange == "") {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: 'missing details',
        textBody: 'Please select all the details required for efficient service',
      })
    }
    else {
      navigation.replace("Cart", {
        selectecTime: selectTime,
        DayRange,
        selectedDate
      })
    }
  }
  return (
    <>

      <SafeAreaView>
        {/*  address section */}
        <View style={{ margin: 4, gap: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: "500" }}>ADDRESS</Text>
          <TextInput
            style={{
              height: 150,
              borderColor: "gray",
              borderWidth: 1,
              color: "black",
              paddingHorizontal: 5,
              fontSize: 15,
            }}
          />
        </View>
        {/*  date picker */}
        <Calendar onSelectDate={setselectedDate} selected={selectedDate} />
        {/* time selector */}
        <View>
          <Text
            style={{
              paddingBottom: 10,
              paddingLeft: 10,
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            Select Time
          </Text>
          <TImeTab setTime={setSelectTime} currentTime={selectTime} />
        </View>
        {/*  day range selector */}
        <View>
          <Text
            style={{
              paddingBottom: 10,
              paddingLeft: 10,
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            In Days Delivery expected :
          </Text>
          <DayTab setDayrange={setDayRange} currentDayRange={DayRange} />
        </View>
      </SafeAreaView>

      {/* checkout option */}
      {
        cart.length > 0 ? <Pressable style={styles.checkout}>
          <View style={{ flexDirection: 'column', gap: 10 }}>
            <Text style={{ margin: -4, fontSize: 15, fontWeight: '600', }}> {item_quantity} items || $ {total}</Text>
            <Text style={{ color: 'green' }}>extra charges may apply </Text>

          </View>
          <Pressable style={{ backgroundColor: 'black', borderRadius: 6, paddingHorizontal: 7 }} onPress={movement_to_cart_page}>
            <Text style={{ color: 'white', fontSize: 20, fontWeight: '600' }}>  proceed to cart</Text>
          </Pressable>

        </Pressable >
          :
          null
      }
    </>
  )
}

const styles = StyleSheet.create({
  checkout: {
    border: '5px solid black',
    backgroundColor: 'orange',
    height: 70,
    margin: 5,
    borderRadius: 10,
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  }
})
