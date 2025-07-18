"use client";
import React, { useState } from "react";
import styled from "styled-components";

const locaisBanner = [
  {
    label: "Banners horizontais 1920x400",
    options: [
      "Home Destaque",
      "Home Lista",
      "Home Rodapé",
      "Notícias Rodapé",
      "Destaques Rodapé",
      "Destaques Topo",
    ],
  },
  {
    label: "Banners quadrados 400x400",
    options: ["Home Jogos", "Notícias Lado"],
  },
  { label: "PopUp 700x450", options: ["PopUp"] },
];

export default function FormPatrocinador({ onSubmit }) {
  const [form, setForm] = useState({
    nome: "",
    cpfCnpj: "",
    localBanner: "",
    imagem: null,
    link: "",
    tempo: "",
    tipo: "pago",
  });
  const [erro, setErro] = useState("");

  function handleChange(e) {
    const { name, value, files, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (
      !form.nome ||
      !form.cpfCnpj ||
      !form.localBanner ||
      !form.imagem ||
      !form.tempo
    ) {
      setErro("Preencha todos os campos obrigatórios.");
      return;
    }
    setErro("");
    if (onSubmit) onSubmit(form);
  }

  return (
    <Container>
      <h2>Cadastrar Patrocinador</h2>
      <Form onSubmit={handleSubmit}>
        <label>
          Nome do Patrocinador*
          <input
            name="nome"
            value={form.nome}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          CPF/CNPJ*
          <input
            name="cpfCnpj"
            value={form.cpfCnpj}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Local do banner de patrocínio*
          <select
            name="localBanner"
            value={form.localBanner}
            onChange={handleChange}
            required
          >
            <option value="">Selecione...</option>
            {locaisBanner.map((grupo) => (
              <optgroup key={grupo.label} label={grupo.label}>
                {grupo.options.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </label>
        <label>
          Imagem (banner de Patrocínio)*
          <input
            name="imagem"
            type="file"
            accept="image/*"
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Link do site do Patrocinador
          <input
            name="link"
            value={form.link}
            onChange={handleChange}
            placeholder="https://"
          />
        </label>
        <label>
          Tempo de patrocínio (em meses)*
          <input
            name="tempo"
            type="number"
            min="1"
            value={form.tempo}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Patrocínio
          <select name="tipo" value={form.tipo} onChange={handleChange}>
            <option value="pago">Pago</option>
            <option value="permuta">Permuta</option>
          </select>
        </label>
        {erro && <ErroMsg>{erro}</ErroMsg>}
        <button type="submit">Cadastrar</button>
      </Form>
    </Container>
  );
}

const Container = styled.div`
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.07);
  padding: 2rem;
  margin-top: 2rem;
  max-width: 1400px;
  h2 {
    margin-bottom: 1.5rem;
    color: #333;
  }
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  label {
    display: flex;
    flex-direction: column;
    font-weight: 500;
    gap: 0.3rem;
    color: #333;
  }
  input,
  select {
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
