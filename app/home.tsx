import Header from '@/components/header';
import { useAuth } from '@/hooks/useAuth';
import { useProducts } from '@/hooks/useProducts';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  const { user } = useAuth();
  const { products } = useProducts();

  const formatPrice = (cents: number) => {
    return `R$ ${(cents / 100).toFixed(2).replace('.', ',')}`;
  };

  return (
    <View style={styles.container}>
      <Header username={user?.name || ''} />

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Catálogo LastDance</Text>

          <TouchableOpacity
            style={styles.addButton}
            onPress={() => router.push('/product/create')}
          >
            <LinearGradient
              colors={['#4f46e5', '#6366f1']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.gradientButton}
            >
              <Text style={styles.addButtonText}>+ Adicionar Produto</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <View style={styles.productsGrid}>
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
              <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.7)']}
                style={styles.imageOverlay}
              />
              <View style={styles.productInfo}>
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.productPrice}>{formatPrice(product.price)}</Text>
                <View style={styles.categoryContainer}>
                  <Text style={styles.productCategory}>{product.category}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  scrollContainer: {
    padding: 16,
  },
  headerContainer: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#1e293b',
  },
  addButton: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 20,
  },
  gradientButton: {
    padding: 16,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  productCard: {
    width: '48%',
    backgroundColor: 'white',
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  productImage: {
    width: '100%',
    height: 180,
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
  },
  productInfo: {
    padding: 12,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fbbf24',
    marginBottom: 4,
  },
  categoryContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  productCategory: {
    fontSize: 12,
    color: 'white',
    fontWeight: '500',
  },
});
