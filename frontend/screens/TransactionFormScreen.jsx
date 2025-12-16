import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Alert } from 'react-native';
import TransactionApi from '../api/transaction';

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
