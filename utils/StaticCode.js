import { Alert } from "react-native";



const createTwoButtonAlert = (alert_title, alert_msg) =>
    Alert.alert(alert_title, alert_msg, [
        {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
        },
        { text: 'OK', onPress: () => console.log('OK Pressed') },
    ]);



export default createTwoButtonAlert