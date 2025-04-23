import { useLocalSearchParams, router } from 'expo-router';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'; // Adicionei ScrollView aqui
import { useProducts } from '@/hooks/useProducts';

export default function ProductDetails() {
  const { id } = useLocalSearchParams();
  const { products, deleteProduct } = useProducts();
  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <View style={styles.container}>
        <Text>Produto não encontrado</Text>
      </View>
    );
  }

  const formatPrice = (cents: number) => {
    return `R$ ${(cents / 100).toFixed(2).replace('.', ',')}`;
  };

  return (
    <ScrollView style={styles.container}>
      <Image 
        source={{ uri: product.imageUrl }} 
        style={styles.productImage}
        resizeMode="contain"
      />
      
      <View style={styles.detailsContainer}>
        <Text style={styles.productName}>{product.name}</Text>
        <Text style={styles.productPrice}>{formatPrice(product.price)}</Text>
        <Text style={styles.productCategory}>{product.category}</Text>
        
        <Text style={styles.sectionTitle}>Descrição:</Text>
        <Text style={styles.productDescription}>{product.description}</Text>
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity 
          style={[styles.button, styles.editButton]}
          onPress={() => router.push(`/product/edit/${product.id}`)}
        >
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.button, styles.deleteButton]}
          onPress={() => {
            deleteProduct(product.id);
            router.back();
          }}
        >
          <Text style={styles.buttonText}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  productImage: {
    width: '100%',
    height: 300,
  },
  detailsContainer: {
    padding: 20,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2563eb',
    marginBottom: 8,
  },
  productCategory: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  productDescription: {
    fontSize: 16,
    lineHeight: 24,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    marginTop: 20,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  editButton: {
    backgroundColor: '#2563eb',
  },
  deleteButton: {
    backgroundColor: '#ef4444',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});