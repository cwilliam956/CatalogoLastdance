import { useAuth } from '@/hooks/useAuth';
import { useNavigation } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';

export default function Header({ username }: { username: string }) {
  const logout = useAuth((state) => state.logout);
  const navigation = useNavigation();

  return (
    <View style={{ 
      backgroundColor: '#e5e7eb', 
      padding: 16, 
      flexDirection: 'row', 
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {navigation.canGoBack() && (
          <TouchableOpacity 
            onPress={() => navigation.goBack()}
            style={{ marginRight: 16 }}
          >
            <Text>←</Text>
          </TouchableOpacity>
        )}
        
        <View style={{ 
          width: 40, 
          height: 40, 
          borderRadius: 20, 
          backgroundColor: '#d1d5db',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Text>👤</Text>
        </View>
        
        <Text style={{ fontSize: 18, marginLeft: 12 }}>{username}</Text>
      </View>

      <TouchableOpacity onPress={logout}>
        <Text>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}