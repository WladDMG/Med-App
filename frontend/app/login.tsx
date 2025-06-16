import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, TextInput, Text, useTheme } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { useAuth } from '../context/AuthContext';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');

  const { login } = useAuth();
  const router = useRouter();
  const theme = useTheme();

  const handleLogin = async () => {
    setLoading(true);
    setErro('');

    try {
      const response = await fetch('http://192.168.31.253:3000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erro ao fazer login');
      }

      if (!data.access_token) {
        throw new Error('Token inválido recebido do servidor');
      }

      await login(data.access_token);
      router.replace('/'); // redireciona para a tela principal

    } catch (err: any) {
      setErro(err.message || 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>Login</Text>

      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        style={styles.input}
      />

      <TextInput
        label="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
        style={styles.input}
      />

      {erro ? <Text style={styles.error}>{erro}</Text> : null}

      <Button
        mode="contained"
        onPress={handleLogin}
        loading={loading}
        disabled={loading}
        style={styles.button}
      >
        Entrar
      </Button>

      <Button
        mode="text"
        onPress={() => router.push('/register')}
        style={styles.buttonRegister}
      >
        Criar conta
      </Button>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
  },
  buttonRegister: {
    marginTop: 12,
  },
  error: {
    color: 'red',
    marginBottom: 8,
    textAlign: 'center',
  },
});
