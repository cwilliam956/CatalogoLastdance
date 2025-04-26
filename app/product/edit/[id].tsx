import { useProducts } from '@/hooks/useProducts';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function EditProduct() {
  const { id } = useLocalSearchParams();
  const { products } = useProducts();
  const [product, setProduct] = useState<{
    name: string;
    description: string;
    imageUrl: string;
    price: string;
    category: string;
  } | null>(null);

  useEffect(() => {
    const foundProduct = products.find(p => p.id === id);
    if (foundProduct) {
      setProduct({
        name: foundProduct.name,
        description: foundProduct.description,
        imageUrl: foundProduct.imageUrl,
        price: foundProduct.price.toString(),
        category: foundProduct.category
      });
    }
  }, [id, products]);

  if (!product) {
    return (
      <View style={styles.container}>
        <Text>Produto não encontrado</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Detalhes do Produto</Text>

      <TextInput
        placeholder="Nome do produto"
        value={product.name}
        editable={false}
        style={styles.input}
      />

      <TextInput
        placeholder="Descrição"
        value={product.description}
        editable={false}
        style={styles.input}
        multiline
      />

      <TextInput
        placeholder="Preço (em centavos)"
        value={product.price}
        editable={false}
        style={styles.input}
        keyboardType="numeric"
      />

      <TextInput
        placeholder="Categoria"
        value={product.category}
        editable={false}
        style={styles.input}
      />

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <Text style={styles.backButtonText}>Voltar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: '#f5f5f5',
  },
  backButton: {
    backgroundColor: '#2563eb',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  backButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
