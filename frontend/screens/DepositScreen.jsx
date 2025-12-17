import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import WalletApi from '../api/wallet';
import { StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function DepositScreen({ navigation }) {
  const { token } = useContext(AuthContext);
  const [amount, setAmount] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleDeposit = async () => {
    setLoading(true);
    try {
      const res = await WalletApi.get(
        '/deposit',
        { amount, currency: 'PLN' },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigation.goBack();
    } catch (err) {
      console.log('Error', err.response?.data?.message || err.message);
    } finally {
      setLoading(fasle);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Deposit PLN</Text>

      <Text style={styles.subtitle}>Amount</Text>
      <TextInput
        style={styles.input}
        keyboardType='numeric'
        placeholder='Amount'
        value={amount}
        onChangeText={setAmount}
      />

      <TouchableOpacity
        style={[styles.submitButton, loading && styles.disabled]}
        disabled={loading}
        onPress={handleDeposit}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Processing...' : 'Submit'}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
