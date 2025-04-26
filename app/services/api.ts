import { Product } from "@/types/product";

// Use 10.0.2.2 for Android emulator to access localhost
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
        // Convert the image object to a File object
        const response = await fetch(product.image.uri);
        const blob = await response.blob();
        const file = new File([blob], product.image.name, { type: product.image.type });
        formData.append('image', file);
      } else {
        // If no image, fetch the default image and convert to File
        const response = await fetch(defaultImage);
        const blob = await response.blob();
        const file = new File([blob], 'default.jpg', { type: 'image/jpeg' });
        formData.append('image', file);
      }

      console.log('Sending request to:', `${API_URL}/produtos`);
      console.log('FormData:', {
        name: product.name,
        description: product.description,
        price_in_cents: product.price,
        category: product.category,
        image: product.image ? 'File object' : 'Default image file'
      });

      const response = await fetch(`${API_URL}/produtos`, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error:', errorText);
        throw new Error(`Failed to create product: ${errorText}`);
      }

      const data = await response.json();
      return {
        ...data,
        imageUrl: data.image_url ?? defaultImage,
      };
    } catch (error) {
      console.error('Create product error:', error);
      throw error;
    }
  },

  async getById(id: string): Promise<Product> {
    try {
      const response = await fetch(`${API_URL}/produtos/${id}`);
      if (!response.ok) {
        throw new Error('Product not found');
      }
      const data = await response.json();
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
      const response = await fetch(`${API_URL}/produtos`);
      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error:', errorText);
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
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
    await fetch(`${API_URL}/produtos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });
  },

  async delete(id: string): Promise<void> {
    try {
      const response = await fetch(`${API_URL}/produtos/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error:', errorText);
        throw new Error('Failed to delete product');
      }
    } catch (error) {
      console.error('Delete product error:', error);
      throw error;
    }
  }
};
