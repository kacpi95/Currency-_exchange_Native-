import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import TransactionScreen from '../screens/TransactionScreen';
import WalletStackNavigator from './WalletStackNavigator';
import ExchangeRateStackNavigator from './ExchangeRateStackNavigator';

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name='Home'
        component={HomeScreen}
        options={{ headerShown: false, title: 'Home' }}
      />
      <Tab.Screen
        name='Wallet'
        component={WalletStackNavigator}
        options={{ headerShown: false }}
      />
      <Tab.Screen name='History' component={TransactionScreen} />
      <Tab.Screen
        name='ExchangeRate'
        component={ExchangeRateStackNavigator}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}
