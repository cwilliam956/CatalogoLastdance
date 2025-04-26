import { Product } from "@/types/product";
import axios, { AxiosError } from "axios";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

const defaultImage = 'https://placehold.co/600x400?text=Produto';

interface CreateProductData {
  name: string;
  description: string;
  price: number;
  category: string;
  image?: {
    uri: string;
    type: string;
    name: string;
  };
}

interface ApiError {
  message: string;
  status?: number;
}

export const ProductService = {
  async create(product: CreateProductData): Promise<Product> {
    try {
      if (!product.name || !product.description || !product.price || !product.category) {
        throw new Error('Todos os campos são obrigatórios');
      }

      const formData = new FormData();
      formData.append('name', product.name);
      formData.append('description', product.description);
      formData.append('price_in_cents', product.price.toString());
      formData.append('category', product.category);

      if (product.image) {
        const response = await fetch(product.image.uri);
        const blob = await response.blob();
        formData.append('image', blob, product.image.name);
      }

      const response = await axios.post(`${API_URL}/produtos`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Accept': 'application/json',
        },
      });

      if (response.status === 201 && response.data) {
        const data = response.data;
        return {
          id: data.id,
          name: data.name,
          description: data.description,
          price: data.price_in_cents,
          category: data.category,
          imageUrl: data.image_url ?? defaultImage
        };
      }

      throw new Error('Resposta inválida do servidor');
    } catch (error) {
      console.error('Erro ao criar produto:', error);

      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ApiError>;
        const errorMessage = axiosError.response?.data?.message ??
          axiosError.message ??
          'Erro ao criar o produto';
        throw new Error(errorMessage);
      }

      throw error;
    }
  },

  async getById(id: string): Promise<Product> {
    try {
      if (!id) {
        throw new Error('ID do produto é obrigatório');
      }

      const response = await axios.get(`${API_URL}/produtos/${id}`);

      if (response.status === 200 && response.data) {
        const data = response.data;
        return {
          id: data.id,
          name: data.name,
          description: data.description,
          price: data.price_in_cents,
          category: data.category,
          imageUrl: data.image_url ?? defaultImage
        };
      }

      throw new Error('Produto não encontrado');
    } catch (error) {
      console.error('Erro ao buscar produto:', error);

      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ApiError>;
        if (axiosError.response?.status === 404) {
          throw new Error('Produto não encontrado');
        }
        throw new Error(axiosError.response?.data?.message ?? 'Erro ao buscar o produto');
      }

      throw error;
    }
  },

  async getAll(): Promise<Product[]> {
    try {
      const response = await axios.get(`${API_URL}/produtos`);

      if (response.status === 200 && Array.isArray(response.data)) {
        return response.data.map((item: any) => ({
          id: item.id,
          name: item.name,
          description: item.description,
          price: item.price_in_cents,
          category: item.category,
          imageUrl: item.image_url ?? defaultImage
        }));
      }

      throw new Error('Resposta inválida do servidor');
    } catch (error) {
      console.error('Erro ao listar produtos:', error);

      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ApiError>;
        throw new Error(axiosError.response?.data?.message ?? 'Erro ao listar os produtos');
      }

      throw error;
    }
  },

  async update(id: string, product: Partial<Product>): Promise<void> {
    try {
      if (!id) {
        throw new Error('ID do produto é obrigatório');
      }

      const response = await axios.put(`${API_URL}/produtos/${id}`, product, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.status !== 200) {
        throw new Error('Erro ao atualizar o produto');
      }
    } catch (error) {
      console.error('Erro ao atualizar produto:', error);

      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ApiError>;
        throw new Error(axiosError.response?.data?.message ?? 'Erro ao atualizar o produto');
      }

      throw error;
    }
  },

  async delete(id: string): Promise<void> {
    try {
      if (!id) {
        throw new Error('ID do produto é obrigatório');
      }

      const response = await axios.delete(`${API_URL}/produtos/${id}`);

      if (response.status !== 204) {
        throw new Error('Erro ao deletar o produto');
      }
    } catch (error) {
      console.error('Erro ao deletar produto:', error);

      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ApiError>;
        throw new Error(axiosError.response?.data?.message ?? 'Erro ao deletar o produto');
      }

      throw error;
    }
  }
};
