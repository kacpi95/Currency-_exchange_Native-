import { useEffect, useState } from 'react';
import CurrentRatesApi from '../api/currentRates';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, StyleSheet, Text } from 'react-native';

export default function CurrentRatesScreen() {
  const [rates, setRates] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRates = async () => {
    try {
      const res = await CurrentRatesApi.get('/current');
      setRates(res.data);
    } catch (err) {
      console.log('Currency error:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRates();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Current Rates</Text>

      <View style={styles.cardContainer}>
        {rates.map((el) => (
          <View key={el.code} style={styles.card}>
            <Text style={styles.currency}>{el.code}</Text>
            <Text style={styles.rate}>{el.mid.toFixed(2)}</Text>
            <Text style={styles.date}>{el.date}</Text>
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#e8f7f2',
  },

  title: {
    marginBottom: 20,
    fontSize: 26,
    fontWeight: '700',
    textAlign: 'center',
    color: '#05668d',
  },

  cardContainer: {
    width: '100%',
    gap: 12,
    alignItems: 'center',
  },

  card: {
    width: '100%',
    maxWidth: 300,
    borderRadius: 12,
    borderWidth: 1,
    paddingVertical: 16,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderColor: '#a3d2ca',
    backgroundColor: '#ffffff',
  },

  currency: {
    marginBottom: 6,
    fontSize: 18,
    fontWeight: '600',
    color: '#028090',
  },

  rate: {
    marginBottom: 4,
    fontSize: 22,
    fontWeight: '700',
    color: '#05668d',
  },

  date: {
    fontSize: 12,
    color: '#999',
  },
});
