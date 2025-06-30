import "./assets/tailwind.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import Loading from "./components/Loading";
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const Orders = React.lazy(() => import("./pages/Orders"));
const Members = React.lazy(() => import("./pages/Members"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
const Error400 = React.lazy(() => import("./pages/error400"));
const Error401 = React.lazy(() => import("./pages/error401"));
const Error403 = React.lazy(() => import("./pages/error403"));
const MainLayout2 = React.lazy(() => import("./layouts/MainLayout2"));
const AdminLayout = React.lazy(() => import("./layouts/AdminLayout"));
const Login = React.lazy(() => import("./pages/Auth/Login"));
const Register = React.lazy(() => import("./pages/Auth/Register"));
const Forgot = React.lazy(() => import("./pages/Auth/Forgot"));
const AuthLayout = React.lazy(() => import("./layouts/AuthLayout"));
const Users = React.lazy(() => import("./pages/Users"));
const About = React.lazy(() => import("./pages/About"));
const Topproduct = React.lazy(() => import("./pages/Topproduct"));
const Testimoni = React.lazy(() => import("./pages/Testimoni"));
const LandingPage = React.lazy(() => import("./pages/LandingPage"));
const Product = React.lazy(() => import("./pages/Product"));
const TestimoniMan = React.lazy(() => import("./pages/TestimoniMan"));
const Artikel = React.lazy(() => import('./pages/Artikel'));
const ArtikelHome = React.lazy(() => import('./pages/ArtikelHome'));
const FaqAdmin = React.lazy(() => import('./pages/FaqAdmin'));
const Faq = React.lazy(() => import('./pages/Faq'));
const Katalog = React.lazy(() => import('./pages/Katalog'));
const Wishlist = React.lazy(() => import('./pages/Wishlist'));

function App() {
  return (
    <Suspense fallback={<Loading />}>
        <Routes>
          <Route element={<MainLayout2 />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/error400" element={<Error400 />} />
            <Route path="/error401" element={<Error401 />} />
            <Route path="/error403" element={<Error403 />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/about" element={<About />} />
            <Route path="/Topproduct" element={<Topproduct />} />
            <Route path="/Testimoni" element={<Testimoni />} />
            <Route path="/artikel-home" element={<ArtikelHome />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/katalog" element={<Katalog />} />
            <Route path="/wishlist" element={<Wishlist />} />

          </Route>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot" element={<Forgot />} />
          </Route>
          <Route element={<AdminLayout />}>
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/TestimoniMan" element={<TestimoniMan />} />
            <Route path="/product" element={<Product />} />
            <Route path="/users" element={<Users />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/artikel" element={<Artikel />} />
            <Route path="/faq-admin" element={<FaqAdmin />} />
          </Route>
        </Routes>
    </Suspense>
  );
}

export default App;
