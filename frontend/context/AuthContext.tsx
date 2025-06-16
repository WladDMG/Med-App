import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type User = {
  id: string;
  nome: string;
  email: string;
  role: 'paciente' | 'medico' | 'admin';
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadFromStorage = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        const storedUser = await AsyncStorage.getItem('user');

        if (storedToken) setToken(storedToken);
        if (storedUser) setUser(JSON.parse(storedUser));
      } catch (error) {
        console.log('Erro ao carregar dados do AsyncStorage:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadFromStorage();
  }, []);

  const login = async (newToken: string) => {
    setToken(newToken);
    await AsyncStorage.setItem('token', newToken);

    const res = await fetch('http://192.168.31.253:3000/users/me', {
      headers: {
        Authorization: `Bearer ${newToken}`,
      },
    });

    if (!res.ok) {
      throw new Error('Falha ao buscar dados do usuário');
    }

    const userData: User = await res.json();
    setUser(userData);
    await AsyncStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = async () => {
    setToken(null);
    setUser(null);
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};
