import { useAuth } from '@/hooks/useAuth';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, ScrollView, Text, TextInput, TouchableOpacity, View, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';

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
    <View style={{ flex: 1, backgroundColor: '#f8fafc' }}>
      <StatusBar style="dark" />
      <LinearGradient
        colors={['#4f46e5', '#6366f1']}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          height: '40%',
          borderBottomLeftRadius: 40,
          borderBottomRightRadius: 40,
        }}
      />

      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
          padding: 20
        }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ alignItems: 'center', marginBottom: 40 }}>
          <View style={{
            width: 120,
            height: 120,
            backgroundColor: 'white',
            borderRadius: 60,
            justifyContent: 'center',
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 5,
          }}>
            <Text style={{ fontSize: 50 }}>💃</Text>
          </View>
          <Text style={{
            fontSize: 32,
            marginTop: 16,
            color: 'white',
            fontWeight: 'bold',
            textShadowColor: 'rgba(0, 0, 0, 0.2)',
            textShadowOffset: { width: 0, height: 2 },
            textShadowRadius: 4,
          }}>
            Last Dance
          </Text>
        </View>

        <View style={{
          backgroundColor: 'white',
          borderRadius: 20,
          padding: 24,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 5,
        }}>
          <Text style={{
            fontSize: 24,
            textAlign: 'center',
            marginBottom: 24,
            color: '#1e293b',
            fontWeight: 'bold',
          }}>
            Bem-vindo de volta
          </Text>

          <View style={{ marginBottom: 16 }}>
            <Text style={{
              color: '#64748b',
              marginBottom: 8,
              fontWeight: '500',
            }}>
              E-mail
            </Text>
            <TextInput
              placeholder="Digite seu e-mail"
              placeholderTextColor="#94a3b8"
              value={email}
              onChangeText={setEmail}
              style={{
                borderWidth: 1,
                borderColor: '#e2e8f0',
                padding: 16,
                borderRadius: 12,
                fontSize: 16,
                backgroundColor: '#f8fafc',
              }}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={{ marginBottom: 24 }}>
            <Text style={{
              color: '#64748b',
              marginBottom: 8,
              fontWeight: '500',
            }}>
              Senha
            </Text>
            <TextInput
              placeholder="Digite sua senha"
              placeholderTextColor="#94a3b8"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              style={{
                borderWidth: 1,
                borderColor: '#e2e8f0',
                padding: 16,
                borderRadius: 12,
                fontSize: 16,
                backgroundColor: '#f8fafc',
              }}
            />
          </View>

          <TouchableOpacity
            onPress={handleLogin}
            style={{
              backgroundColor: '#4f46e5',
              padding: 16,
              borderRadius: 12,
              shadowColor: '#4f46e5',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 8,
              elevation: 5,
            }}
          >
            <Text style={{
              color: 'white',
              textAlign: 'center',
              fontSize: 16,
              fontWeight: 'bold',
            }}>
              Entrar
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
