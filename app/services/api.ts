import { Product } from "@/types/product";
import axios from "axios";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

const defaultImage = 'https://placehold.co/600x400?text=Produto';

export const ProductService = {
  async create(product: Omit<Product, 'id' | 'imageUrl'> & { image?: { uri: string; type: string; name: string } }): Promise<Product> {
    try {
      const formData = new FormData();
      formData.append('name', product.name);
      formData.append('description', product.description);
      formData.append('price_in_cents', product.price.toString());
      formData.append('category', product.category);

      // Handle image upload
      if (product.image) {
        formData.append('image', {
          uri: product.image.uri,
          name: product.image.name,
          type: product.image.type,
        } as any);
      } else {
        formData.append('image', {
          uri: defaultImage,
          name: 'default.jpg',
          type: 'image/jpeg',
        } as any);
      }

      console.log('Sending request to:', `${API_URL}/produtos`);
      console.log('FormData:', {
        name: product.name,
        description: product.description,
        price_in_cents: product.price,
        category: product.category,
        image: product.image ? 'File object' : 'Default image file'
      });

      const response = await axios.post(`${API_URL}/produtos`, formData, {
        headers: {
          'Accept': 'application/json',
        },
      });

      const data = response.data;
      return {
        ...data,
        imageUrl: data.image_url ?? defaultImage,
      };
    } catch (error) {
      console.log('Error:', error);
      console.error('Create product error:', error);
      throw error;
    }
  },

  async getById(id: string): Promise<Product> {
    try {
      const response = await axios.get(`${API_URL}/produtos/${id}`);
      const data = response.data;
      return {
        id: data.id,
        name: data.name,
        description: data.description,
        price: data.price_in_cents,
        imageUrl: data.image_url ?? defaultImage,
        category: data.category ?? '',
      };
    } catch (error) {
      console.error('Get product error:', error);
      throw error;
    }
  },

  async getAll(): Promise<Product[]> {
    try {
      console.log('Fetching products from:', `${API_URL}/produtos`);
      const response = await axios.get(`${API_URL}/produtos`);
      const data = response.data;
      return data.map((item: any) => ({
        id: item.id,
        name: item.name,
        description: item.description,
        price: item.price_in_cents,
        imageUrl: item.image_url ?? defaultImage,
        category: item.category ?? '',
      }));
    } catch (error) {
      console.error('List products error:', error);
      throw error;
    }
  },

  async update(id: string, product: Partial<Product>): Promise<void> {
    await axios.put(`${API_URL}/produtos/${id}`, product, {
      headers: { 'Content-Type': 'application/json' },
    });
  },

  async delete(id: string): Promise<void> {
    try {
      const response = await axios.delete(`${API_URL}/produtos/${id}`);
      if (response.status !== 204) {
        const errorText = response.data;
        console.error('API Error:', errorText);
        throw new Error('Failed to delete product');
      }
    } catch (error) {
      console.error('Delete product error:', error);
      throw error;
    }
  }
};
