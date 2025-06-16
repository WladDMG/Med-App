import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Alert,
} from 'react-native';
import {
  Text,
  Button,
  Surface,
  Divider,
  Avatar,
  Switch,
} from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'expo-router';
import { useThemeContext } from '../../context/ThemeContext';

export default function PerfilScreen() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const { isDark, toggleTheme } = useThemeContext();

  const [avatarUri, setAvatarUri] = useState<string | null>(null);

  // Carrega avatar salvo no AsyncStorage
  useEffect(() => {
    AsyncStorage.getItem('avatarUri').then(uri => {
      if (uri) setAvatarUri(uri);
    });
  }, []);

  // Seleciona nova imagem de avatar
  const escolherAvatar = async () => {
    const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!perm.granted) {
      Alert.alert('Permissão negada', 'Você precisa permitir acesso à galeria.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      setAvatarUri(uri);
      await AsyncStorage.setItem('avatarUri', uri);
    }
  };

  const handleLogout = async () => {
    await logout();
    router.replace('/login');
  };

  return (
    <Surface style={styles.container}>
      <View style={styles.header}>
        <Avatar.Image
          size={80}
          source={{
            uri: avatarUri || 'https://source.unsplash.com/80x80/?portrait,person',
          }}
          style={{ marginBottom: 8 }}
        />
        <Button onPress={escolherAvatar}>Alterar foto</Button>
        <Text variant="headlineSmall" style={styles.title}>
          {user?.nome}
        </Text>
      </View>

      <Divider style={{ marginVertical: 16 }} />

      <Text variant="titleMedium">Email</Text>
      <Text style={styles.info}>{user?.email}</Text>

      <Text variant="titleMedium">Tipo</Text>
      <Text style={styles.info}>{user?.role}</Text>

      <View style={styles.switchContainer}>
        <Text variant="titleMedium">Modo Escuro</Text>
        <Switch value={isDark} onValueChange={toggleTheme} />
      </View>

      <Button mode="outlined" onPress={handleLogout} style={styles.logoutBtn}>
        Sair
      </Button>
    </Surface>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  header: {
    alignItems: 'center',
    gap: 8,
  },
  title: {
    marginTop: 8,
    textAlign: 'center',
  },
  info: {
    marginBottom: 16,
    fontSize: 16,
    color: '#555',
  },
  logoutBtn: {
    marginTop: 32,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 16,
  },
});
