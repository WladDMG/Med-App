import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { Button, Text, TextInput, HelperText } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useAuth } from '../../context/AuthContext';
import { Picker } from '@react-native-picker/picker';

export default function AgendarConsultaScreen() {
  const { token } = useAuth();

  const [especialidade, setEspecialidade] = useState('');
  const [medicoId, setMedicoId] = useState('');
  const [medicos, setMedicos] = useState<any[]>([]);
  const [dataSelecionada, setDataSelecionada] = useState<Date>(new Date());
  const [displayDate, setDisplayDate] = useState(''); // para exibição
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [descricao, setDescricao] = useState('');
  const [mensagem, setMensagem] = useState('');

  useEffect(() => {
    if (!token) return;
    (async () => {
      try {
        const res = await fetch('http://192.168.31.253:3000/users', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setMedicos(data.filter((u: any) => u.tipo === 'medico'));
      } catch (err) {
        console.log('Erro ao buscar médicos:', err);
      }
    })();
  }, [token]);

  // Quando escolher data, abre o time picker
  const onChangeDate = (_: any, selected?: Date) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selected) {
      setDataSelecionada(selected);
      setShowTimePicker(true);
    }
  };

  // Ao escolher hora
  const onChangeTime = (_: any, selected?: Date) => {
    setShowTimePicker(Platform.OS === 'ios');
    if (selected) {
      const dt = new Date(dataSelecionada);
      dt.setHours(selected.getHours(), selected.getMinutes());
      setDataSelecionada(dt);

      const d = dt.getDate().toString().padStart(2, '0');
      const m = (dt.getMonth() + 1).toString().padStart(2, '0');
      const y = dt.getFullYear();
      const hh = dt.getHours().toString().padStart(2, '0');
      const mm = dt.getMinutes().toString().padStart(2, '0');
      setDisplayDate(`${d}/${m}/${y} - ${hh}:${mm}`);
    }
  };

  const handleAgendar = async () => {
    setMensagem('');
    if (!especialidade || !medicoId || !displayDate) {
      setMensagem('Preencha todos os campos corretamente.');
      return;
    }

    const isoDate = dataSelecionada.toISOString();
    try {
      const res = await fetch('http://192.168.31.253:3000/consultas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          especialidade,
          medicoId,
          dataHora: isoDate,
          descricao,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Erro ao agendar');
      setMensagem('Consulta agendada com sucesso!');
    } catch (err: any) {
      setMensagem(err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineSmall" style={styles.title}>
        Agendar Consulta
      </Text>

      <Text variant="titleMedium">Especialidade</Text>
      <Picker
        selectedValue={especialidade}
        onValueChange={setEspecialidade}
        style={styles.picker}
      >
        <Picker.Item label="Selecione..." value="" />
        <Picker.Item label="Cardiologia" value="cardiologia" />
        <Picker.Item label="Pediatria" value="pediatria" />
        <Picker.Item label="Ortopedia" value="ortopedia" />
      </Picker>

      <Text variant="titleMedium" style={{ marginTop: 12 }}>
        Médico
      </Text>
      <Picker
        selectedValue={medicoId}
        onValueChange={setMedicoId}
        style={styles.picker}
      >
        <Picker.Item label="Selecione..." value="" />
        {medicos
          .filter((m) => m.especialidade === especialidade)
          .map((med) => (
            <Picker.Item key={med._id} label={med.nome} value={med._id} />
          ))}
      </Picker>

      <Text variant="titleMedium" style={{ marginTop: 12 }}>
        Data e Hora
      </Text>
      <TouchableOpacity onPress={() => setShowDatePicker(true)}>
        <TextInput
          label="DD/MM/AAAA - HH:MM"
          value={displayDate}
          editable={false}
          right={
            displayDate ? <TextInput.Icon icon="calendar" /> : undefined
          }
          style={styles.input}
        />
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={dataSelecionada}
          mode="date"
          display="default"
          onChange={onChangeDate}
        />
      )}
      {showTimePicker && (
        <DateTimePicker
          value={dataSelecionada}
          mode="time"
          display="default"
          onChange={onChangeTime}
        />
      )}

      <TextInput
        label="Descrição"
        value={descricao}
        onChangeText={setDescricao}
        style={styles.input}
        multiline
      />

      {mensagem ? (
        <HelperText type="info" visible>
          {mensagem}
        </HelperText>
      ) : null}

      <Button mode="contained" onPress={handleAgendar} style={styles.button}>
        Confirmar Agendamento
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  title: {
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    marginTop: 8,
  },
  picker: {
    backgroundColor: '#eee',
    marginTop: 8,
    marginBottom: 12,
  },
  button: {
    marginTop: 20,
  },
});
