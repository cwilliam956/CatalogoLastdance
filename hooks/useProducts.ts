import { ProductService } from '@/app/services/api';
import { Product } from '@/types/product';
import { useEffect, useState } from 'react';

type CreateProductInput = Omit<Product, 'id' | 'imageUrl'> & {
  image?: { uri: string; type: string; name: string };
};

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await ProductService.getAll();
      setProducts(data);
      setError(null);
    } catch (err) {
      setError('Failed to load products');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addProduct = async (product: CreateProductInput) => {
    try {
      setLoading(true);
      const newProduct = await ProductService.create(product);
      setProducts([...products, newProduct]);
      setError(null);
    } catch (err) {
      setError('Failed to create product');
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      setLoading(true);
      await ProductService.delete(id);
      setProducts(products.filter(p => p.id !== id));
      setError(null);
    } catch (err) {
      setError('Failed to delete product');
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    products,
    loading,
    error,
    addProduct,
    deleteProduct,
    refresh: loadProducts
  };
};
