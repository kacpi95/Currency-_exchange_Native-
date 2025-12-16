import { useContext, useEffect, useState } from 'react';
import TransactionApi from '../api/transaction';
import { AuthContext } from '../context/AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Text,
  StyleSheet,
  View,
  ActivityIndicator,
  FlatList,
} from 'react-native';

export default function TransactionScreen() {
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState(null);

  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const res = await TransactionApi.get('/history', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTransactions(res.data);
      } catch (err) {
        console.log(err);
        console.log('Transaction error:', err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTransaction();
  }, []);

  if (loading)
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size='large' color='#028090' />
      </SafeAreaView>
    );

  if (!transactions.length)
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.emptyText}>No transactions yet</Text>
      </SafeAreaView>
    );

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text
        style={[
          styles.type,
          item.type === 'buy'
            ? styles.buy
            : item.type === 'sell'
            ? styles.sell
            : styles.deposit,
        ]}
      >
        {item.type.toUpperCase()}
      </Text>
      <Text style={styles.amount}>
        {item.amountFrom} {item.fromCurrency} → {item.amountTo.toFixed(2)}
        {item.toCurrency}
      </Text>
      <Text style={styles.rate}>Rate: {item.rateUsed}</Text>
      <Text style={styles.date}>
        {new Date(item.createdAt).toLocaleString()}
      </Text>
    </View>
  );

  return (
    <FlatList
      data={transactions}
      keyExtractor={(item) => item._id}
      renderItem={renderItem}
      contentContainerStyle={styles.container}
    />
  );
}

const styles = StyleSheet.create({});
