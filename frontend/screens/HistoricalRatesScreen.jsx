import { useState } from 'react';
import CurrentRatesApi from '../api/currentRates';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  StyleSheet,
  TextInput,
  Text,
  FlatList,
  TouchableOpacity,
  View,
} from 'react-native';
import CurrencySelector from '../components/CurrencySelector';

export default function HistoricalRateScreen() {
  const [rates, setRates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currency, setCurrency] = useState('USD');
  const [start, setStart] = useState('2024-12-01');
  const [end, setEnd] = useState('2024-12-17');

  const fetchRates = async () => {
    try {
      const res = await CurrentRatesApi.get(
        `/history/${currency}/${start}/${end}`
      );
      setRates(res.data);
    } catch (err) {
      console.log('Currency error:', err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Exchange Rates</Text>

      <CurrencySelector
        label='Currency'
        value={currency}
        onSelect={setCurrency}
      />

      <TextInput
        style={styles.input}
        placeholder='Start YYYY-MM-DD'
        value={start}
        onChangeText={setStart}
      />

      <TextInput
        style={styles.input}
        placeholder='End YYYY-MM-DD'
        value={end}
        onChangeText={setEnd}
      />

      <TouchableOpacity style={styles.fetchButton} onPress={fetchRates}>
        <Text style={styles.fetchText}>Fetch</Text>
      </TouchableOpacity>

      <FlatList
        data={rates}
        keyExtractor={(item) => item.effectiveDate}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardDate}>{item.effectiveDate}</Text>
            <Text style={styles.cardRate}>{item.mid.toFixed(2)}</Text>
          </View>
        )}
      />
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

  input: {
    width: '100%',
    maxWidth: 300,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderRadius: 8,
    textAlign: 'center',
    backgroundColor: '#fff',
    borderColor: '#a3d2ca',
  },

  fetchButton: {
    width: '100%',
    maxWidth: 300,
    paddingVertical: 14,
    marginBottom: 20,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#028090',
  },

  fetchText: {
    fontWeight: '600',
    fontSize: 16,
    textAlign: 'center',
    color: '#fff',
  },

  listContainer: {
    width: '100%',
    alignItems: 'center',
  },

  card: {
    width: '100%',
    maxWidth: 300,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#fff',
    borderColor: '#a3d2ca',
  },

  cardDate: {
    marginBottom: 4,
    fontSize: 14,
    color: '#028090',
  },

  cardRate: {
    fontSize: 18,
    fontWeight: '700',
    color: '#05668d',
  },

  currencyRow: {
    marginBottom: 12,
    gap: 12,
    flexDirection: 'row',
  },

  currencyButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#a3d2ca',
    backgroundColor: '#fff',
  },

  currencyActive: {
    backgroundColor: '#028090',
    borderColor: '#028090',
  },

  currencyText: {
    fontWeight: '600',
    color: '#05668d',
    textAlign: 'center',
  },

  currencyTextActive: {
    color: '#fff',
  },
});
