import { useEffect, useState } from 'react';
import CurrentRatesApi from '../api/currentRates';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, StyleSheet, Text } from 'react-native';
import CommonStyles from '../styles/common';
import Colors from '../styles/colors';

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
    <SafeAreaView style={CommonStyles.container}>
      <Text style={CommonStyles.title}>Current Rates</Text>

      <View style={CommonStyles.cardContainer}>
        {rates.map((el) => (
          <View key={el.code} style={CommonStyles.card}>
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
  currency: {
    marginBottom: 6,
    fontSize: 18,
    fontWeight: '600',
    color: Colors.textSecondary,
  },

  rate: {
    marginBottom: 4,
    fontSize: 22,
    fontWeight: '700',
    color: Colors.textPrimary,
  },

  date: {
    fontSize: 12,
    color: Colors.textDisabled,
  },
});
