import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList, Share } from 'react-native';
import { Card, Text, IconButton, Surface } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ProtectedRoute } from '../../components/ProtectedRoute';

type Artigo = {
  id?: string;          // agora opcional para pegar casos indefinidos
  titulo: string;
  descricao: string;
  imagem?: string;
};

export default function ArtigosScreen() {
  const [artigos, setArtigos] = useState<Artigo[]>([]);
  const [curtidos, setCurtidos] = useState<string[]>([]);

  // Busca artigos (ou fallback)
  useEffect(() => {
    const fetchArtigos = async () => {
      try {
        const res = await fetch('http://192.168.31.253:3000/artigos');
        const data: Artigo[] = await res.json();
        setArtigos(data);
      } catch {
        setArtigos([
          { id: '1-checkup',    titulo: 'Check‑up anual é essencial', descricao: 'Fazer exames regulares ajuda a prevenir doenças silenciosas.', imagem: 'https://source.unsplash.com/600x400/?health,doctor' },
          { id: '2-alimentacao', titulo: 'Alimente‑se bem!',               descricao: 'Uma boa alimentação fortalece o corpo e a mente.',                imagem: 'https://source.unsplash.com/600x400/?healthy,food'   },
          { id: '3-exercicio',   titulo: 'Mexa‑se!',                       descricao: 'Exercícios físicos melhoram sua saúde mental e física.',           imagem: 'https://source.unsplash.com/600x400/?exercise,fitness'},
        ]);
      }
    };
    fetchArtigos();
  }, []);

  // Carrega curtidos do storage
  useEffect(() => {
    AsyncStorage.getItem('artigosCurtidos').then(stored => {
      if (stored) setCurtidos(JSON.parse(stored));
    });
  }, []);

  // Toggle like individual
  const toggleCurtir = async (id: string) => {
    const novo = curtidos.includes(id)
      ? curtidos.filter(x => x !== id)
      : [...curtidos, id];

    setCurtidos(novo);
    await AsyncStorage.setItem('artigosCurtidos', JSON.stringify(novo));
  };

  // Compartilhar (não interfere nas curtidas)
  const compartilhar = async (titulo: string) => {
    try {
      await Share.share({ message: `Confira este artigo: "${titulo}" no App Médico!` });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <ProtectedRoute>
      <Surface style={styles.container}>
        <FlatList
          data={artigos}
          keyExtractor={(item, index) =>
            // se houver id utilizamos, senão index
            item.id ? item.id : index.toString()
          }
          renderItem={({ item, index }) => {
            const key = item.id ?? index.toString();
            return (
              <Card mode="contained" style={styles.card}>
                {item.imagem && (
                  <Card.Cover source={{ uri: item.imagem }} style={styles.cover} />
                )}
                <Card.Title title={item.titulo} />
                <Card.Content>
                  <Text>{item.descricao}</Text>
                </Card.Content>
                <Card.Actions>
                  <IconButton
                    icon={ curtidos.includes(key) ? 'heart' : 'heart-outline' }
                    iconColor={ curtidos.includes(key) ? 'red' : undefined }
                    onPress={() => toggleCurtir(key)}
                  />
                  <IconButton
                    icon="share-variant"
                    onPress={() => compartilhar(item.titulo)}
                  />
                </Card.Actions>
              </Card>
            );
          }}
        />
      </Surface>
    </ProtectedRoute>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    marginBottom: 20,
  },
  cover: {
    height: 180,
  },
});
