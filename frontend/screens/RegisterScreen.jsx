import { useState } from 'react';
import API from '../api/api';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !password) {
      Alert.alert('Complete all fields');
      return;
    }

    try {
      setLoading(true);
      await API.post('/register', { name, email, password });
      Alert.alert('Registration completed, you can log in');
      navigation.navigate('Login');
    } catch (err) {
      console.log(err.response?.data || err.message);
      Alert.alert(
        'Registration error',
        err.response?.data?.message || 'Something went wrong!'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Registration</Text>
      <TextInput
        style={styles.input}
        placeholder='Name'
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder='Email'
        keyboardType='email-address'
        autoCapitalize='none'
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder='Password'
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>
          {loading ? 'loading' : 'Register'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonText}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.link}>Have an account? Log in</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#e8f7f2',
  },

  title: {
    marginBottom: 24,
    fontSize: 28,
    fontWeight: '700',
    color: '#05668d',
  },

  input: {
    width: '100%',
    marginBottom: 15,
    padding: 12,
    borderWidth: 1,
    borderRadius: 8,
    fontSize: 16,
    borderColor: '#a3d2ca',
    backgroundColor: '#ffffff',
  },

  button: {
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
    padding: 15,
    borderRadius: 8,
    backgroundColor: '#028090',
  },

  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },

  link: {
    marginTop: 18,
    fontSize: 14,
    color: '#05668d',
  },
});
