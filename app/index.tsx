import { useAuth } from '@/hooks/useAuth';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const login = useAuth((state) => state.login);

  const handleLogin = async () => {
    const success = await login(email, password);
    if (success) {
      router.replace('/home');
    } else {
      Alert.alert('Erro', 'Credenciais inválidas');
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 20 }}>
      <View style={{ alignItems: 'center', marginBottom: 40 }}>
        <View style={{ width: 100, height: 100, backgroundColor: '#ddd', borderRadius: 50 }} />
        <Text style={{ fontSize: 24, marginTop: 16 }}>Nome do App</Text>
      </View>

      <View style={{ backgroundColor: 'white', borderRadius: 12, padding: 24 }}>
        <Text style={{ fontSize: 20, textAlign: 'center', marginBottom: 24 }}>Login</Text>
        
        <TextInput
          placeholder="E-mail"
          value={email}
          onChangeText={setEmail}
          style={{ borderBottomWidth: 1, padding: 8, marginBottom: 16 }}
        />

        <TextInput
          placeholder="Senha"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={{ borderBottomWidth: 1, padding: 8, marginBottom: 24 }}
        />

        <TouchableOpacity
          onPress={handleLogin}
          style={{ backgroundColor: '#2563eb', padding: 16, borderRadius: 8 }}
        >
          <Text style={{ color: 'white', textAlign: 'center' }}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}