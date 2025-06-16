import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text, HelperText, RadioButton, Menu } from 'react-native-paper';
import { useRouter } from 'expo-router';

export default function RegisterScreen() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [tipo, setTipo] = useState<'paciente' | 'medico'>('paciente');
  const [especialidade, setEspecialidade] = useState('');
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleRegister = async () => {
    setLoading(true);
    setErro('');

    try {
      const body: any = {
        nome,
        email,
        senha,
        tipo,
      };

      if (tipo === 'medico') {
        body.especialidade = especialidade;
      }

      const res = await fetch('http://192.168.31.253:3000/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Erro ao registrar');
      }

      router.replace('/login'); // vai direto pro login após registro
    } catch (err: any) {
      setErro(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>Registro</Text>

      <TextInput label="Nome" value={nome} onChangeText={setNome} style={styles.input} />
      <TextInput label="Email" value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" style={styles.input} />
      <TextInput label="Senha" value={senha} onChangeText={setSenha} secureTextEntry style={styles.input} />

      <Text style={styles.label}>Tipo de usuário:</Text>
      <RadioButton.Group onValueChange={value => setTipo(value as 'paciente' | 'medico')} value={tipo}>
  <View style={styles.radioGroup}>
    <RadioButton.Item label="Paciente" value="paciente" />
    <RadioButton.Item label="Médico" value="medico" />
  </View>
</RadioButton.Group>

      {tipo === 'medico' && (
        <TextInput
          label="Especialidade"
          value={especialidade}
          onChangeText={setEspecialidade}
          style={styles.input}
          placeholder="cardiologia, pediatria, ortopedia..."
        />
      )}

      {erro ? <HelperText type="error" visible>{erro}</HelperText> : null}

      <Button mode="contained" onPress={handleRegister} loading={loading} disabled={loading} style={styles.button}>
        Registrar
      </Button>

      <Button onPress={() => router.push('/login')} style={{ marginTop: 10 }}>
        Já tem conta? Entrar
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    marginBottom: 16,
  },
  input: {
    marginBottom: 12,
  },
  label: {
    marginTop: 8,
    fontWeight: 'bold',
  },
  radioGroup: {
    flexDirection: 'column',
    marginVertical: 8,
  },
  button: {
    marginTop: 16,
  },
});
