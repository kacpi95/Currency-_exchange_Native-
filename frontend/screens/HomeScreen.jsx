import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { ActivityIndicator, StyleSheete } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const { token } = useContext(AuthContext);
  const [wallet, setWallet] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchWallet = async () => {
      try {
        const res = await axios.get('/api/wallet', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setWallet(res.data);
      } catch (err) {
        console.log(object);
        console.log('Wallet error:', err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWallet();
  }, []);
  if (loading) {
    return <ActivityIndicator size='large' />;
  }
  return;
}

const styles = StyleSheet.create({});
