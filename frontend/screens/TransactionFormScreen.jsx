import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import {
  Alert,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import TransactionApi from '../api/transaction';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TransactionFormScreen({ route }) {
  const { token } = useContext(AuthContext);
  const [fetchWallet] = route.params;

  const [fromCurrency, setFromCurrency] = useState('PLN');
  const [toCurrency, setToCurrency] = useState('USD');
  const [amountFrom, setAmountFrom] = useState('');
  const [type, setType] = useState('buy');
  const [loading, setLoading] = useState(false);

  const handleTransaction = async () => {
    if (!amountFrom) return Alert.alert('Error', 'Enter amount');

    setLoading(true);

    try {
      const res = await TransactionApi.post(
        '/',
        { type, fromCurrency, toCurrency, amountFrom: Number(amountFrom) },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      Alert.alert(`Success, Transaction completed`);
      fetchWallet();
    } catch (err) {
      Alert.alert('Error', err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };
}

return (
  <SafeAreaView style={styles.container}>
    <Text style={styles.title}>Make Transaction</Text>

    <Text style={styles.subtitle}>Type:</Text>
    <TouchableOpacity
      style={styles.button}
      title='Buy'
      onPress={() => setType('buy')}
      color={type === 'buy' ? 'green' : 'grey'}
    />
    <TouchableOpacity
      style={styles.button}
      title='Sell'
      onPress={() => setType('sell')}
      color={type === 'sell' ? 'red' : 'grey'}
    />

    <Text style={styles.subtitle}>From Currency:</Text>
    <TextInput
      style={styles.input}
      value={fromCurrency}
      onChangeText={setFromCurrency}
    />

    <Text style={styles.subtitle}>To Currency:</Text>
    <TextInput
      style={styles.input}
      value={toCurrency}
      onChangeText={setToCurrency}
    />

    <Text style={styles.subtitle}>Amount:</Text>
    <TextInput
      style={styles.input}
      value={amountFrom}
      onChangeText={setAmountFrom}
      keyboardType='numeric'
    />

    <TouchableOpacity
      title={loading ? 'Processing...' : 'Submit'}
      onPress={handleTransaction}
      disabled={loading}
    />
  </SafeAreaView>
);

const styles = StyleSheet.create({});
