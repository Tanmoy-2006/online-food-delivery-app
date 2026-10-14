import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import FoodDetails from "./pages/FoodDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About";
import Contact from "./pages/Contact";
import { foods } from "./data/foodData";
import Admin from "./pages/Admin";
import AccountDashboard from "./pages/AccountDashboard";
import { getCurrentUser } from "./services/auth";

export default function App() {
  const [session, setSession] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("foodrush-session")) || null;
    } catch {
      return null;
    }
  });
  const [authLoading, setAuthLoading] = useState(() => Boolean(session?.token));
  const [cart, setCart] = useState(() => {
    try { return JSON.parse(localStorage.getItem("foodrush-cart")) || []; } catch { return []; }
  });

  useEffect(() => localStorage.setItem("foodrush-cart", JSON.stringify(cart)), [cart]);
  useEffect(() => {
    if (session) {
      localStorage.setItem("foodrush-session", JSON.stringify(session));
    } else {
      localStorage.removeItem("foodrush-session");
    }
  }, [session]);

  useEffect(() => {
    if (!session?.token) {
      setAuthLoading(false);
      return undefined;
    }

    let active = true;
    setAuthLoading(true);
    getCurrentUser(session.token)
      .then(({ user }) => {
        if (active) setSession((current) => current ? { ...current, user } : current);
      })
      .catch(() => {
        if (active) setSession(null);
      })
      .finally(() => {
        if (active) setAuthLoading(false);
      });
    return () => { active = false; };
  }, []);

  const addToCart = food => setCart(prev => {
    const found = prev.find(x => x.id === food.id);
    return found ? prev.map(x => x.id === food.id ? {...x, qty:x.qty+1} : x) : [...prev, {...food, qty:1}];
  });
  const addOrderToCart = order => setCart(prev => order.items.reduce((items, orderItem) => {
    const food = foods.find(item => String(item.id) === orderItem.productId);
    const id = food?.id ?? orderItem.productId;
    const existingItem = items.find(item => String(item.id) === String(id));
    if (existingItem) {
      return items.map(item => String(item.id) === String(id)
        ? { ...item, qty: item.qty + orderItem.quantity }
        : item);
    }
    return [...items, {
      ...(food || {}),
      id,
      name: food?.name || orderItem.name,
      price: food?.price ?? orderItem.price,
      qty: orderItem.quantity,
    }];
  }, prev));
  const removeFromCart = id => setCart(prev => prev.filter(x => x.id !== id));
  const changeQty = (id, qty) => setCart(prev => qty < 1 ? prev.filter(x=>x.id!==id) : prev.map(x=>x.id===id?{...x,qty}:x));
  const clearCart = () => setCart([]);

  return <>
    <Header
      cartCount={cart.reduce((s,i)=>s+i.qty,0)}
      user={session?.user}
      onLogout={() => setSession(null)}
    />
    <main>
      <Routes>
        <Route path="/" element={<Home onAdd={addToCart} />} />
        <Route path="/menu" element={<Menu onAdd={addToCart} />} />
        <Route path="/food/:id" element={<FoodDetails onAdd={addToCart} />} />
        <Route path="/cart" element={<Cart cart={cart} onRemove={removeFromCart} onChangeQty={changeQty} />} />
        <Route path="/checkout" element={<Checkout cart={cart} session={session} onOrderPlaced={clearCart} />} />
        <Route path="/login" element={<Login onLogin={setSession} />} />
        <Route path="/register" element={<Register onRegister={setSession} />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/account" element={<AccountDashboard session={session} authLoading={authLoading} cartCount={cart.reduce((sum, item) => sum + item.qty, 0)} onOrderAgain={addOrderToCart} onLogout={() => setSession(null)} />} />
        <Route path="/admin" element={<Admin session={session} authLoading={authLoading} onLogout={() => setSession(null)} />} />
      </Routes>
    </main>
    <Footer />
  </>;
}