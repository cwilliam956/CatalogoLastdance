import { Stack } from 'expo-router';
import { useAuth } from '@/hooks/useAuth';

export default function Layout() {
  const { user } = useAuth();
  
  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{ headerShown: false }} 
        redirect={!!user}
      />
      <Stack.Screen 
        name="home" 
        options={{ headerShown: false }} 
        redirect={!user}
      />
      <Stack.Screen 
        name="product/create" 
        options={{ title: 'Novo Produto' }} 
      />
      <Stack.Screen 
        name="product/[id]" 
        options={{ title: 'Detalhes' }} 
      />
      <Stack.Screen 
        name="product/edit/[id]" 
        options={{ title: 'Editar Produto' }} 
      />
    </Stack>
  );
}