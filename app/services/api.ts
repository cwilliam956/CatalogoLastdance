const API_URL = 'https://sua-api.com';

export const ProductService = {
  async create(product: Omit<Product, 'id'>): Promise<string> {
    const response = await fetch(`${API_URL}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });
    const data = await response.json();
    return data.id;
  },

  async getById(id: string): Promise<Product> {
    const response = await fetch(`${API_URL}/products/${id}`);
    return await response.json();
  },

  async getAll(): Promise<Product[]> {
    const response = await fetch(`${API_URL}/products`);
    return await response.json();
  },

  async update(id: string, product: Partial<Product>): Promise<void> {
    await fetch(`${API_URL}/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });
  },

  async delete(id: string): Promise<void> {
    await fetch(`${API_URL}/products/${id}`, {
      method: 'DELETE',
    });
  }
};