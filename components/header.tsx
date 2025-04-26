import { useAuth } from '@/hooks/useAuth';
import { useNavigation } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';

export default function Header({ username }: Readonly<{ username: string }>) {
  const logout = useAuth((state) => state.logout);
  const navigation = useNavigation();

  return (
    <View
      style={{
        backgroundColor: '#6751a3',
        padding: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {navigation.canGoBack() && (
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              marginRight: 16,
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              padding: 8,
              borderRadius: 8,
            }}
          >
            <Text style={{ color: 'white', fontSize: 18 }}>←</Text>
          </TouchableOpacity>
        )}

        <View style={{
          width: 40,
          height: 40,
          borderRadius: 20,
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          justifyContent: 'center',
          alignItems: 'center',
          marginRight: 12,
        }}>
          <Text style={{ fontSize: 20 }}>👤</Text>
        </View>

        <Text style={{
          fontSize: 18,
          color: 'white',
          fontWeight: '600',
        }}>
          {username}
        </Text>
      </View>

      <TouchableOpacity
        onPress={logout}
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          paddingHorizontal: 12,
          paddingVertical: 8,
          borderRadius: 8,
        }}
      >
        <Text style={{ color: 'white', fontWeight: '500' }}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}
