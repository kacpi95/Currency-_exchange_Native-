import { useContext } from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthContext } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const { user, logout } = useContext(AuthContext);
  const navigation = useNavigation();

  const handleLogout = () => {
    logout();
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Welcome, {user.name || user.email}</Text>

      <Text style={styles.subtitle}>Quick actions</Text>

      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('Wallet')}
        >
          <Text style={styles.cardTitle}>Wallet</Text>
          <Text style={styles.cardDesc}>Check balances & currencies</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('History')}
        >
          <Text style={styles.cardTitle}>History</Text>
          <Text style={styles.cardDesc}>View your transactions</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.card, styles.logoutCard]}
          onPress={handleLogout}
        >
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#e8f7f2',
  },

  title: {
    marginBottom: 6,
    textAlign: 'center',
    fontSize: 26,
    fontWeight: '700',
    color: '#05668d',
  },

  subtitle: {
    marginBottom: 24,
    textAlign: 'center',
    fontSize: 16,
    color: '#028090',
  },

  actions: {
    width: '100%',
    gap: 15,
    alignItems: 'center',
  },

  card: {
    width: '100%',
    maxWidth: 360,
    alignItems: 'center',
    padding: 20,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#a3d2ca',
    backgroundColor: '#ffffff',
  },

  cardTitle: {
    marginBottom: 6,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    color: '#05668d',
  },

  cardDesc: {
    fontSize: 14,
    textAlign: 'center',
    color: '#666',
  },

  logoutCard: {
    backgroundColor: '#fdf1f1',
    borderColor: '#f5c2c2',
  },

  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    color: '#c1121f',
  },
});
