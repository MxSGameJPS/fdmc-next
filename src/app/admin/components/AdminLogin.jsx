"use client";
import React, { useState } from "react";
import styled from "styled-components";

export default function AdminLogin({ onLogin }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  function handleLogin(e) {
    e.preventDefault();
    if (email === "admin@admin.com" && senha === "admin") {
      setErro("");
      onLogin();
    } else {
      setErro("E-mail ou senha incorretos.");
    }
  }

  return (
    <LoginContainer>
      <LoginBox>
        <h2>Login Administrativo</h2>
        <form onSubmit={handleLogin}>
          <label>
            E-mail:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="username"
            />
          </label>
          <label>
            Senha:
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              autoComplete="current-password"
            />
          </label>
          {erro && <ErroMsg>{erro}</ErroMsg>}
          <button type="submit">Entrar</button>
        </form>
      </LoginBox>
    </LoginContainer>
  );
}

const LoginContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
`;
const LoginBox = styled.div`
  background: #000;
  padding: 2rem 2.5rem;
  border-radius: 10px;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.08);
  min-width: 320px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  label {
    display: flex;
    flex-direction: column;
    font-weight: 500;
    gap: 0.3rem;
  }
  input {
    padding: 0.5rem;
    border-radius: 5px;
    border: 1px solid #ccc;
    font-size: 1rem;
  }
  button {
    background: #222;
    color: #fff;
    border: none;
    border-radius: 5px;
    padding: 0.7rem;
    font-size: 1rem;
    cursor: pointer;
    font-weight: bold;
    margin-top: 0.5rem;
    transition: background 0.2s;
    &:hover {
      background: #444;
    }
  }
`;
const ErroMsg = styled.div`
  color: #c00;
  font-size: 0.95rem;
  margin-bottom: -0.5rem;
`;
