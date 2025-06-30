import axios from "axios";

const API_URL = "https://hkkkmtwjeqkyeicsalgd.supabase.co/rest/v1/orders";
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhra2ttdHdqZXFreWVpY3NhbGdkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAwODM1NDAsImV4cCI6MjA2NTY1OTU0MH0.MwybvRmsgR7LoeXqPXFUYf5KI6bU-MvCw8KYbs5jkLE";

const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
};

export const orderAPI = {
  // Fetch semua order (dengan pagination)
  async fetchOrders(offset = 0, limit = 10) {
    const response = await axios.get(
      `${API_URL}?offset=${offset}&limit=${limit}&select=id,user_id,produk_id,jumlah,total`,
      {
        headers: {
          ...headers,
          Prefer: "count=exact",
        },
      }
    );
    const total =
      parseInt(response.headers["content-range"]?.split("/")[1] || "0", 10);
    return { data: response.data, total };
  },

  // Membuat order baru
  async createOrder(data) {
    const response = await axios.post(API_URL, data, { headers });
    return response.data;
  },

  // Mengambil order berdasarkan user_id
  async fetchOrdersByUser(user_id) {
    const url = `${API_URL}?user_id=eq.${user_id}&select=id,produk_id,jumlah,total`;
    const response = await axios.get(url, { headers });
    return response.data;
  },
};
