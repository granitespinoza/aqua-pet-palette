
// Centralized API client for multi-tenant architecture
class ApiClient {
  private baseUrl: string;
  private tenantId: string | null = null;

  constructor(baseUrl: string = '') {
    this.baseUrl = baseUrl;
  }

  setTenant(tenantId: string) {
    this.tenantId = tenantId;
    console.log('API Client tenant set to:', tenantId);
  }

  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
    
    if (this.tenantId) {
      headers['X-Tenant-ID'] = this.tenantId;
    }
    
    return headers;
  }

  async get<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'GET',
      headers: this.getHeaders(),
    });
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }
    
    return response.json();
  }

  async post<T>(endpoint: string, data: any): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }
    
    return response.json();
  }

  async put<T>(endpoint: string, data: any): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }
    
    return response.json();
  }

  async delete<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'DELETE',
      headers: this.getHeaders(),
    });
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }
    
    return response.json();
  }

  // Specific API methods for the pet shop
  async searchProducts(query: string, page: number = 1, limit: number = 20) {
    console.log(`Searching products for tenant ${this.tenantId}:`, query);
    return this.get(`/api/products/search?q=${encodeURIComponent(query)}&page=${page}&limit=${limit}&tenant=${this.tenantId}`);
  }

  async getProducts(categoryId?: string, brandId?: number, page: number = 1, limit: number = 20) {
    let endpoint = `/api/products?page=${page}&limit=${limit}&tenant=${this.tenantId}`;
    if (categoryId) endpoint += `&category=${categoryId}`;
    if (brandId) endpoint += `&brand=${brandId}`;
    
    console.log(`Getting products for tenant ${this.tenantId}:`, endpoint);
    return this.get(endpoint);
  }

  async login(credentials: { email: string; password: string }) {
    console.log(`Login for tenant ${this.tenantId}`);
    return this.post('/api/auth/login', { ...credentials, tenant_id: this.tenantId });
  }

  async register(userData: { nombre: string; email: string; password: string }) {
    console.log(`Register for tenant ${this.tenantId}`);
    return this.post('/api/auth/register', { ...userData, tenant_id: this.tenantId });
  }

  async createOrder(orderData: any) {
    console.log(`Creating order for tenant ${this.tenantId}`);
    return this.post('/api/orders', { ...orderData, tenant_id: this.tenantId });
  }
}

// Export singleton instance
export const apiClient = new ApiClient();
