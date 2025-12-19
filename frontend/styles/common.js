import { StyleSheet } from 'react-native';
import Colors from './colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: Colors.backgroundDefault,
  },

  title: {
    marginBottom: 24,
    fontSize: 28,
    fontWeight: '700',
    color: Colors.textPrimary,
  },

  input: {
    width: '100%',
    maxWidth: 300,
    marginBottom: 15,
    padding: 12,
    borderWidth: 1,
    borderRadius: 8,
    fontSize: 16,
    borderColor: Colors.borderDefault,
    backgroundColor: Colors.backgroundWhite,
  },

  button: {
    width: '100%',
    maxWidth: 300,
    alignItems: 'center',
    marginTop: 10,
    padding: 15,
    borderRadius: 8,
    backgroundColor: Colors.textSecondary,
  },

  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.backgroundWhite,
  },

  link: {
    marginTop: 18,
    fontSize: 14,
    color: Colors.textPrimary,
  },

  subtitle: {
    marginBottom: 15,
    marginTop: 10,
    textAlign: 'center',
    fontSize: 16,
    color: Colors.textSecondary,
  },

  cardContainer: {
    width: '100%',
    gap: 15,
    marginBottom: 20,
    alignItems: 'center',
  },

  card: {
    width: '100%',
    maxWidth: 360,
    alignItems: 'center',
    padding: 20,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Colors.borderDefault,
    backgroundColor: Colors.backgroundWhite,
  },

  cardTitle: {
    marginBottom: 6,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
});
