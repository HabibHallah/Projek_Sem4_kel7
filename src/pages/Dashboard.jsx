import { HiBell } from "react-icons/hi";
import { RiDashboardFill } from "react-icons/ri";
import { AiFillHeart } from "react-icons/ai";
import { MdSubscriptions } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [membersCount, setMembersCount] = useState(0);
  const [productsCount, setProductsCount] = useState(0);
  const [usersCount, setUsersCount] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0);
  const [members, setMembers] = useState([]);
  const [page, setPage] = useState(0);
  const perPage = 4;

  useEffect(() => {
    fetch("/data/members.json")
      .then((res) => res.json())
      .then((data) => {
        setMembers(data);
        setMembersCount(data.length);
      })
      .catch(console.error);

    fetch("/data/Product.json")
      .then((res) => res.json())
      .then((data) => setProductsCount(data.length))
      .catch(console.error);

    fetch("https://dummyjson.com/users")
      .then((res) => res.json())
      .then((data) => setUsersCount(data.users.length))
      .catch(console.error);

    fetch("/data/orders.json")
      .then((res) => res.json())
      .then((data) => setOrdersCount(data.length))
      .catch(console.error);
  }, []);

  const totalPages = Math.ceil(members.length / perPage);
  const slice = members.slice(page * perPage, page * perPage + perPage);

  const tierColor = (tier) => {
    if (tier === "Gold") return "text-orange-500";
    if (tier === "Silver") return "text-blue-500";
    return "text-gray-500";
  };

  const stats = [
    { title: "Members", value: membersCount, change: "+5%" },
    { title: "Product", value: productsCount, change: "+8%" },
    { title: "Users", value: usersCount, change: "+3%" },
    { title: "Orders", value: ordersCount, change: "-1%" },
  ];

  return (
    <div className="flex min-h-screen font-sans">
      <main className="flex-1 p-8">
        {/* Top Members */}
        <section className="bg-white p-6 rounded-2xl shadow mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Top Members</h3>
            <div className="flex space-x-2">
              <button
                onClick={() => setPage((p) => Math.max(p - 1, 0))}
                disabled={page === 0}
                className="px-2 py-1 rounded hover:bg-gray-100 disabled:opacity-50"
              >
                ‹
              </button>
              <span className="text-sm text-gray-600">
                {page + 1} / {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(p + 1, totalPages - 1))}
                disabled={page === totalPages - 1}
                className="px-2 py-1 rounded hover:bg-gray-100 disabled:opacity-50"
              >
                ›
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {slice.map((m) => (
              <div
                key={m["Member ID"]}
                className="grid grid-cols-1 sm:grid-cols-6 items-center gap-4"
              >
                <div className="col-span-1 sm:col-span-2 flex items-center space-x-4">
                  <div>
                    <p className="font-semibold">{m["Member Name"]}</p>
                    <p className="text-xs text-gray-500">{m.Email}</p>
                  </div>
                </div>
                <p className="col-span-1 sm:col-span-1 text-center">
                  {m["Member ID"]}
                </p>
                <p className="col-span-1 sm:col-span-1 text-center">
                  {m.Phone}
                </p>
                <p
                  className={`col-span-1 sm:col-span-1 text-center font-semibold ${tierColor(
                    m.Loyalty
                  )}`}
                >
                  {m.Loyalty}
                </p>
                <BsThreeDotsVertical className="col-span-1 justify-self-end text-gray-400 cursor-pointer" />
              </div>
            ))}
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
