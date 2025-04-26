import { useAuth } from '@/hooks/useAuth';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);
  const login = useAuth((state) => state.login);

  const handleLogin = async () => {
    setLoginError(null);
    const success = await login(email, password);
    if (success) {
      router.replace('/home');
    } else {
      setLoginError('E-mail ou senha inválidos. Tente novamente.');
    }
  };

  const handleDemoLogin = async () => {
    setLoginError(null);
    const success = await login('admin', 'admin');
    if (success) {
      router.replace('/home');
    } else {
      setLoginError('Não foi possível acessar a conta de demonstração.');
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

        {/* Banner de erro amigável */}
        {loginError && (
          <View style={{
            backgroundColor: '#fee2e2',
            borderRadius: 10,
            padding: 16,
            marginBottom: 16,
            borderWidth: 1,
            borderColor: '#fca5a5',
          }}>
            <Text style={{ color: '#b91c1c', textAlign: 'center', fontWeight: 'bold' }}>{loginError}</Text>
          </View>
        )}

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

          {/* Botão Esqueceu a senha? */}
          <TouchableOpacity
            onPress={handleDemoLogin}
            style={{ marginTop: 16, alignItems: 'center' }}
            activeOpacity={0.7}
          >
            <Text style={{ color: '#6366f1', fontWeight: 'bold', fontSize: 16 }}>
              Esqueceu a senha?
            </Text>
            <Text style={{ color: '#64748b', fontSize: 12, marginTop: 2 }}>
              Entrar com conta de demonstração
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
