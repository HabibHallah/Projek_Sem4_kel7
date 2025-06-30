import { useEffect, useState } from "react";
import { productAPI } from "../assets/services/productAPI";
import { orderAPI } from "../assets/services/orderAPI";
import { userAPI } from "../assets/services/userAPI";
import { testimoniAPI } from "../assets/services/testimoniAPI";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";


export default function Dashboard() {
  const [testimoni, setTestimoni] = useState([]);
  const [page, setPage] = useState(0);
  const perPage = 4;

  const [productsCount, setProductsCount] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0);
  const [usersCount, setUsersCount] = useState(0);
  const [testimoniCount, setTestimoniCount] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Fetch data testimoni
        const { data: testimoniData, total: totalTestimoni } = await testimoniAPI.fetchTestimoni(page * perPage, perPage);
        setTestimoni(testimoniData);
        setTestimoniCount(totalTestimoni);

        // Fetch total products
        const allProducts = await productAPI.fetchProducts();
        setProductsCount(allProducts.length);

        // Fetch total orders
        const { total: totalOrders } = await orderAPI.fetchOrders(0, 1);
        setOrdersCount(totalOrders);

        // Fetch total users
        const { total: totalUsers } = await userAPI.fetchUsers(0, 1);
        setUsersCount(totalUsers);

      } catch (error) {
        console.error("Gagal memuat data:", error);
      }
    };

    loadData();
  }, [page]);

  const totalPages = Math.ceil(testimoniCount / perPage);

  const stats = [
    { title: "Testimoni", value: testimoniCount, change: "+5%" },
    { title: "Products", value: productsCount, change: "+8%" },
    { title: "Users", value: usersCount, change: "+3%" },
    { title: "Orders", value: ordersCount, change: "-1%" },
  ];

  const [orderData, setOrderData] = useState([]);
  const [topProducts, setTopProducts] = useState([]);

  useEffect(() => {
    const loadTopProducts = async () => {
      try {
        const { data: orders } = await orderAPI.fetchOrders(0, 1000); // ambil banyak orders
        const products = await productAPI.fetchProducts();

        // hitung frekuensi produk_id
        const freq = {};
        orders.forEach(order => {
          freq[order.produk_id] = (freq[order.produk_id] || 0) + 1;
        });

        // ubah ke array
        let freqArray = Object.entries(freq).map(([produk_id, count]) => ({
          produk_id: parseInt(produk_id),
          count
        }));

        // sort desc dan ambil top 5
        freqArray = freqArray.sort((a,b) => b.count - a.count).slice(0,5);

        // total untuk persen
        const totalOrders = orders.length;

        // map ke nama produk & persen
        const chartData = freqArray.map(item => {
          const prod = products.find(p => p.id === item.produk_id);
          return {
            name: prod?.nama || `Produk ${item.produk_id}`,
            percent: ((item.count / totalOrders) * 100).toFixed(2)
          };
        });

        setTopProducts(chartData);
      } catch (err) {
        console.error("Gagal memuat data top products:", err);
      }
    };

    loadTopProducts();
  }, []);

  return (
    <div className="flex min-h-screen font-sans">
      <main className="flex-1 p-8">
        {/* Grafik Pesanan */}
        <section className="bg-white p-6 rounded-2xl shadow mb-6">
          <h3 className="text-lg font-semibold mb-4">Top 5 Produk Paling Sering Dibeli</h3>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <BarChart
                data={topProducts}
                margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
              >
                <defs>
                  <linearGradient id="gradientColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#E56AB3" />
                    <stop offset="100%" stopColor="#FFC3CB" />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis unit="%" />
                <Tooltip />
                <Bar dataKey="percent" fill="url(#gradientColor)" />
              </BarChart>

            </ResponsiveContainer>
          </div>
        </section>


        {/* Stats */}
        <section className="grid md:grid-cols-4 gap-4 mb-6">
          {stats.map((item, idx) => (
            <div key={idx} className="bg-white p-4 rounded-2xl shadow">
              <p className="text-gray-400 text-sm mb-1">{item.title}</p>
              <h4 className="text-2xl font-bold mb-1">
                {item.value.toLocaleString()}
              </h4>
              <p
                className={`text-sm ${
                  item.change.includes("-")
                    ? "text-red-400"
                    : "text-green-500"
                }`}
              >
                {item.change}
              </p>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}
