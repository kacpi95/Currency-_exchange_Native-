import { useCallback, useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import WalletApi from '../api/wallet';
import {
  ActivityIndicator,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import CommonStyles from '../styles/common';

export default function WalletScreen({ navigation }) {
  const { token } = useContext(AuthContext);
  const [wallet, setWallet] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchWallet = async () => {
    try {
      const res = await WalletApi.get('/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setWallet(res.data);
    } catch (err) {
      console.log(err);
      console.log('Wallet error:', err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchWallet();
    }, [])
  );

  useEffect(() => {
    fetchWallet();
  }, []);

  if (loading || !wallet) {
    return (
      <SafeAreaView style={CommonStyles.container}>
        <ActivityIndicator size='large' color='#028090' />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={CommonStyles.container}>
      <Text style={CommonStyles.title}>Your wallet</Text>

      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>PLN</Text>
          <Text style={styles.cardBalance}>{wallet.balance.PLN}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>USD</Text>
          <Text style={styles.cardBalance}>{wallet.balance.USD}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>EUR</Text>
          <Text style={styles.cardBalance}>{wallet.balance.EUR}</Text>
        </View>
      </View>
      <TouchableOpacity
        style={CommonStyles.button}
        onPress={() => navigation.navigate('Transaction')}
      >
        <Text style={CommonStyles.buttonText}>Make Transaction</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={CommonStyles.button}
        onPress={() => navigation.navigate('History')}
      >
        <Text style={CommonStyles.buttonText}>Transaction History</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={CommonStyles.button}
        onPress={() => navigation.navigate('Deposit')}
      >
        <Text style={CommonStyles.buttonText}>Deposit PLN</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: '100%',
    gap: 15,
    alignItems: 'center',
  },

  card: {
    width: '100%',
    maxWidth: 300,
    paddingVertical: 20,
    borderWidth: 1,
    paddingHorizontal: 15,
    borderRadius: 12,
    alignItems: 'center',
    borderColor: '#a3d2ca',
    backgroundColor: '#ffffff',
  },

  cardTitle: {
    marginBottom: 6,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    color: '#028090',
  },

  cardBalance: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    color: '#05668d',
  },
});
