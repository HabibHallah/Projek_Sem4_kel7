// File: productAPI.js
import axios from "axios";

const SUPABASE_URL = "https://hkkkmtwjeqkyeicsalgd.supabase.co";
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhra2ttdHdqZXFreWVpY3NhbGdkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAwODM1NDAsImV4cCI6MjA2NTY1OTU0MH0.MwybvRmsgR7LoeXqPXFUYf5KI6bU-MvCw8KYbs5jkLE";

const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
};

export const productAPI = {
  async fetchProducts() {
    const response = await axios.get(`${SUPABASE_URL}/rest/v1/products?select=*`, {
      headers,
    });
    return response.data;
  },

  async createProduct(data) {
    const response = await axios.post(`${SUPABASE_URL}/rest/v1/products`, data, {
      headers,
    });
    return response.data;
  },

  async updateProduct(id, data) {
    const response = await axios.patch(
      `${SUPABASE_URL}/rest/v1/products?id=eq.${id}`,
      data,
      {
        headers,
      }
    );
    return response.data;
  },

  async deleteProduct(id) {
    const response = await axios.delete(`${SUPABASE_URL}/rest/v1/products?id=eq.${id}`, {
      headers,
    });
    return response.data;
  },

  async uploadImage(file) {
    const fileName = `${Date.now()}-${file.name}`;
    const formData = new FormData();
    formData.append("file", file);

    const uploadHeaders = {
      apikey: API_KEY,
      Authorization: `Bearer ${API_KEY}`,
    };

    const response = await axios.post(
      `${SUPABASE_URL}/storage/v1/object/product-images/${fileName}`,
      formData,
      {
        headers: {
          ...uploadHeaders,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return `${SUPABASE_URL}/storage/v1/object/public/product-images/${fileName}`;
  },

  async updateStock(id, delta) {
    const res = await axios.get(`${SUPABASE_URL}/rest/v1/products?id=eq.${id}&select=stok`, {
      headers,
    });
    const currentStock = res.data[0]?.stok;

    if (typeof currentStock !== "number") {
      throw new Error("Stok tidak ditemukan atau bukan angka.");
    }

    const newStock = currentStock + delta;

    const result = await axios.patch(
      `${SUPABASE_URL}/rest/v1/products?id=eq.${id}`,
      { stok: newStock },
      { headers }
    );

    return result.data;
  },
};
