import { useContext } from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthContext } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const { user, setToken } = useContext(AuthContext);
  const navigation = useNavigation();

  const handleLogout = () => {
    setToken(null);
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Welcome, {user.name || user.email}</Text>
      <Text style={styles.subtitle}>Quick actions:</Text>
      <View>
        <TouchableOpacity
          title='Go to Wallet'
          onPress={() => navigation.navigate('Wallet')}
        />
        <TouchableOpacity
          title='Go to History'
          onPress={() => navigation.navigate('History')}
        />
        <TouchableOpacity title='Logout' onPress={handleLogout} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
