import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'expo-router';
import { ActivityIndicator } from 'react-native-paper';
import { View } from 'react-native';

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { token, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !token) {
      router.replace('/login');
    }
  }, [token, isLoading]);

  if (isLoading || !token) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <>{children}</>;
};
