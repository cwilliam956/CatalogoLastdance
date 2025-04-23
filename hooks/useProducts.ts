import { useState } from 'react';
import { Product } from '@/types/product';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([
    {
      id: '1',
      name: 'Camiseta LastDance',
      description: 'Camiseta premium em algodão',
      imageUrl: 'https://via.placeholder.com/300x400?text=Camiseta',
      price: 7990,
      category: 'Roupas'
    },
    {
      id: '2',
      name: 'Mochila Urbana',
      description: 'Mochila resistente para dia a dia',
      imageUrl: 'https://via.placeholder.com/300x400?text=Mochila',
      price: 12000,
      category: 'Acessórios'
    },
    {
      id: '3',
      name: 'Caneca Personalizada',
      description: 'Caneca cerâmica de alta qualidade',
      imageUrl: 'https://via.placeholder.com/300x400?text=Caneca',
      price: 3500,
      category: 'Acessórios'
    }
  ]);

  const addProduct = (product: Omit<Product, 'id'>) => {
    const newProduct = {
      ...product,
      id: Math.random().toString(36).substring(2, 9)
    };
    setProducts([...products, newProduct]);
  };

  const updateProduct = (id: string, updatedProduct: Partial<Product>) => {
    setProducts(products.map(p => p.id === id ? {...p, ...updatedProduct} : p));
  };

  const deleteProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
  };

  return {
    products,
    addProduct,
    updateProduct,
    deleteProduct
  };
};