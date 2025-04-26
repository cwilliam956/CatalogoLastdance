import { Product } from "@/types/product";
import axios, { AxiosError } from "axios";
import * as FileSystem from 'expo-file-system';

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

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const ProductService = {
  async create(product: CreateProductData): Promise<Product> {
    if (!product.name || !product.description || !product.price || !product.category || !product.image) {
      throw new Error('Todos os campos são obrigatórios, incluindo a imagem');
    }

    try {
      let base64Image = '';

      if (product.image?.uri) {
        try {
          const fileContent = await FileSystem.readAsStringAsync(product.image.uri, {
            encoding: FileSystem.EncodingType.Base64,
          });

          base64Image = `data:${product.image.type};base64,${fileContent}`;
          console.log('Image converted to base64 successfully');
        } catch (error) {
          console.error('Error converting image to base64:', error);
          throw new Error('Falha ao processar a imagem. Tente novamente.');
        }
      }

      if (!base64Image) {
        throw new Error('Não foi possível processar a imagem');
      }

      const productData = {
        name: product.name,
        description: product.description,
        price_in_cents: product.price,
        category: product.category,
        image: base64Image
      };

      const response = await api.post('/produtos', productData);

      if (response.status !== 201) {
        throw new Error(response.data?.message ?? 'Erro ao criar o produto');
      }

      const data = response.data;
      return {
        id: data.id,
        name: data.name,
        description: data.description,
        price: data.price_in_cents,
        category: data.category,
        imageUrl: data.image_url ?? defaultImage,
      };
    } catch (error) {
      console.error('Erro ao criar produto:', error);
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ApiError>;
        throw new Error(axiosError.response?.data?.message ?? 'Erro ao criar o produto');
      }
      throw error;
    }
  },

  async getById(id: string): Promise<Product> {
    try {
      if (!id) {
        throw new Error('ID do produto é obrigatório');
      }

      const response = await api.get(`/produtos/${id}`);

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
      const timestamp = new Date().getTime();
      const response = await api.get(`/produtos?_=${timestamp}`, {
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      });

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

      const response = await api.put(`/produtos/${id}`, product);

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

      const response = await api.delete(`/produtos/${id}`);

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
