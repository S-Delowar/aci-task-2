"use client";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export default function Topbar() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  // load username and email from cookies
  useEffect(() => {
    setUsername(Cookies.get("username"));
    setEmail(Cookies.get("email"));
  }, []);

  // logout the user
  const logout = () => {
    Cookies.remove("access");
    Cookies.remove("refresh");
    window.location.href = "/signin";
  };

  return (
    <div className="w-full bg-gray-100 shadow-sm px-10 py-4 flex justify-between items-center">
      {/* LOGO + TITLE */}
      <div className="flex items-center gap-3">
        <h1 className="text-xl font-semibold text-gray-900">
          CHIMERA Mission
        </h1>
      </div>
      {/* User info + Logout */}
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full flex items-center justify-center font-semibold text-white bg-gradient-to-br from-pink-500 to-rose-600">
          {username?.slice(0, 2).toUpperCase()}
        </div>
        <div className="text-right">
          <div className="font-semibold">{username}</div>
          <div className="text-gray-500 text-sm">{email}</div>
        </div>
        <button
          className="bg-gray-200 px-4 py-2 rounded hover:bg-white cursor-pointer"
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
