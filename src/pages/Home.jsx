import React, { useEffect, useState } from "react";

export default function Home() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const tg = window.Telegram?.WebApp;

    if (tg?.initDataUnsafe?.user) {
      const u = tg.initDataUnsafe.user;
      console.log("Telegram foydalanuvchi:", u);
      loginOrRegister(u);
    } else {
      alert("⚠️ Iltimos, WebApp’ni Telegram ichidan oching!");
      setLoading(false);
    }
  }, []);

  const loginOrRegister = async (tgUser) => {
    try {
      const res = await fetch("https://your-backend.onrender.com/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tgId: tgUser.id,
          username: tgUser.username,
          first_name: tgUser.first_name,
          last_name: tgUser.last_name,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
      } else {
        alert("Login xatosi: " + data.message);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="flex items-center justify-center h-screen">Yuklanmoqda...</div>;

  return (
    <main className="p-6 text-center">
      {user ? (
        <>
          <h1 className="text-xl font-bold">Salom, {user.username || user.first_name} 👋</h1>
          <p>ID: {user.telegramId}</p>
        </>
      ) : (
        <p>Foydalanuvchi topilmadi</p>
      )}
    </main>
  );
}
