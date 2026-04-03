"use client";

import React, { useState } from "react";

interface LoginFormProps {
  onLogin: (pw: string) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [pw, setPw] = useState("");

  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-6">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onLogin(pw);
        }}
        className="w-full max-w-sm"
      >
        <h1 className="font-black text-3xl mb-6">Admin</h1>
        <input
          type="password"
          placeholder="Password"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          className="w-full px-3 py-2 bg-white border-2 border-black text-sm text-black placeholder:text-black/40 focus:outline-none focus:border-[#DC2626] mb-4"
          autoFocus
        />
        <button
          type="submit"
          className="w-full bg-black text-white font-bold py-3 hover:bg-[#1E3A8A] transition-colors cursor-pointer"
        >
          Log in
        </button>
      </form>
    </main>
  );
};
