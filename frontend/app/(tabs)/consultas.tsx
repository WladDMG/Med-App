import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Card, Text, Divider } from 'react-native-paper';
import { useAuth } from '../../context/AuthContext';
import { API_BASE_URL } from '../../constants/api';

type Consulta = {
  _id: string;
  dataHora: string;
  descricao?: string;
  especialidade?: string;
  medicoId: {
    _id: string;
    nome: string;
  };
  pacienteId: string;
};

export default function ConsultasScreen() {
  const [consultas, setConsultas] = useState<Consulta[]>([]);
  const { token, user } = useAuth(); // supondo que `user` tenha o nome do paciente

  useEffect(() => {
    const fetchConsultas = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/consultas/minhas`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) throw new Error('Erro ao buscar consultas');
        const data: Consulta[] = await response.json();
        setConsultas(data);
      } catch (err) {
        console.error('Erro ao carregar consultas:', err);
      }
    };
    if (token) fetchConsultas();
  }, [token]);

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    if (isNaN(d.getTime())) return 'Data inválida';
    return d.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {consultas.length === 0 && (
        <Text style={styles.emptyText}>Nenhuma consulta agendada.</Text>
      )}

      {consultas.map(consulta => {
        const nomeMedico = consulta.medicoId.nome;
        const espMedico = consulta.especialidade ?? '—';
        // se AuthContext fornece o usuário, exiba nome real; senão exiba ID
        const nomePaciente = user?.nome ?? consulta.pacienteId;

        const dataFormatada = formatDate(consulta.dataHora);

        return (
          <Card key={consulta._id} mode="contained" style={styles.card}>
            <Card.Content>
              <View style={styles.row}>
                <Text variant="titleMedium" style={styles.label}>Médico:</Text>
                <Text variant="bodyMedium">{nomeMedico}</Text>
              </View>
              <Divider style={styles.divider} />

              <View style={styles.row}>
                <Text variant="titleMedium" style={styles.label}>Especialidade:</Text>
                <Text variant="bodyMedium">{espMedico}</Text>
              </View>
              <Divider style={styles.divider} />

              <View style={styles.row}>
                <Text variant="titleMedium" style={styles.label}>Paciente:</Text>
                <Text variant="bodyMedium">{nomePaciente}</Text>
              </View>
              <Divider style={styles.divider} />

              <View style={styles.row}>
                <Text variant="titleMedium" style={styles.label}>Data:</Text>
                <Text variant="bodyMedium">{dataFormatada}</Text>
              </View>
            </Card.Content>
          </Card>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  card: {
    marginBottom: 16,
    borderRadius: 8,
    elevation: 4,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  label: {
    fontWeight: '600',
  },
  divider: {
    marginVertical: 6,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 32,
    color: '#666',
  },
});
