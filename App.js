import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import { Provider } from 'react-redux';
import store from './redux-store/store';
import StackNavigator from './StackNavigator';
import { AlertNotificationRoot } from 'react-native-alert-notification';

export default function App() {
  return (
    <Provider store={store}>
      <AlertNotificationRoot>
        <StackNavigator />

      </AlertNotificationRoot>

    </Provider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
});
