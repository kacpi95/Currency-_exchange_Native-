import { useState } from 'react';
import API from '../api/api';
import { Alert } from 'react-native';

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

  return;
}
