import axios from "axios";

const API_URL = "https://hkkkmtwjeqkyeicsalgd.supabase.co/rest/v1/users";
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhra2ttdHdqZXFreWVpY3NhbGdkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAwODM1NDAsImV4cCI6MjA2NTY1OTU0MH0.MwybvRmsgR7LoeXqPXFUYf5KI6bU-MvCw8KYbs5jkLE"; 

const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
};

export const userAPI = {
  async fetchUser(email, password) {
    const url = `${API_URL}?email=eq.${email}&password=eq.${password}&select=id,nama,email,role`;
    const response = await axios.get(url, { headers });
    return response.data;
  },

  async createUser(data) {
    const response = await axios.post(API_URL, data, { headers });
    return response.data;
  },

  async fetchUsers(offset = 0, limit = 10) {
    const response = await axios.get(
      `${API_URL}?offset=${offset}&limit=${limit}`,
      {
        headers: {
          ...headers,
          Prefer: "count=exact", // diperlukan untuk mendapatkan total baris via header :contentReference[oaicite:1]{index=1}
        },
      }
    );
    const total =
      parseInt(response.headers["content-range"]?.split("/")[1] || "0", 10);
    return { data: response.data, total };
  },
};
