import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import CommonStyles from '../styles/common';
import Colors from '../styles/colors';

export default function CurrencySelector({ label, value, onSelect }) {
  const currencies = ['PLN', 'USD', 'EUR'];

  return (
    <>
      <Text style={CommonStyles.subtitle}>{label}</Text>
      <View style={styles.currencyRow}>
        {currencies.map((cur) => (
          <TouchableOpacity
            key={cur}
            style={[
              styles.currencyButton,
              value === cur && styles.currencyActive,
            ]}
            onPress={() => onSelect(cur)}
          >
            <Text
              style={[
                styles.currencyText,
                value === cur && styles.currencyTextActive,
              ]}
            >
              {cur}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  currencyRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 10,
  },

  currencyButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.borderDefault,
    backgroundColor: Colors.backgroundWhite,
  },

  currencyActive: {
    backgroundColor: Colors.textSecondary,
    borderColor: Colors.textSecondary,
  },

  currencyText: {
    fontWeight: '600',
    color: Colors.textPrimary,
  },

  currencyTextActive: {
    color: Colors.backgroundWhite,
  },
});
