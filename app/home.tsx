import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Header from '@/components/header';
import { useAuth } from '@/hooks/useAuth';
import { useProducts } from '@/hooks/useProducts';
import { router } from 'expo-router';

export default function HomeScreen() {
  const { user } = useAuth();
  const { products } = useProducts();

  const formatPrice = (cents: number) => {
    return `R$ ${(cents / 100).toFixed(2).replace('.', ',')}`;
  };

  return (
    <View style={styles.container}>
      <Header username={user?.name || ''} />
      
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Catálogo LastDance</Text>
        
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => router.push('/product/create')}
        >
          <Text style={styles.addButtonText}>+ Adicionar Produto</Text>
        </TouchableOpacity>

        {products.map((product) => (
          <TouchableOpacity 
            key={product.id} 
            style={styles.productCard}
            onPress={() => router.push(`/product/${product.id}`)}
          >
            <Image 
              source={{ uri: product.imageUrl }} 
              style={styles.productImage} 
              resizeMode="cover"
            />
            <View style={styles.productInfo}>
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.productPrice}>{formatPrice(product.price)}</Text>
              <Text style={styles.productCategory}>{product.category}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  addButton: {
    backgroundColor: '#2563eb',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  productCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  productImage: {
    width: '100%',
    height: 200,
  },
  productInfo: {
    padding: 16,
  },
  productName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2563eb',
    marginBottom: 4,
  },
  productCategory: {
    fontSize: 14,
    color: '#666',
  },
});