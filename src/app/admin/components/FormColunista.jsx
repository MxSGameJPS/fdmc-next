"use client";
import React, { useState } from "react";
import styled from "styled-components";

const categorias = [
  "Setorista Botafogo Profissional",
  "Setorista Botafogo Feminino",
  "Setorista Botafogo base",
  "Analise Tática",
];

export default function FormColunista({ onSubmit, colunista }) {
  const [form, setForm] = useState({
    nome: colunista?.nome || "",
    codNome: colunista?.codNome || "",
    categorias: colunista?.categorias || [],
    senha: "",
  });
  const [erro, setErro] = useState("");

  function handleChange(e) {
    const { name, value, options, type } = e.target;
    if (name === "categorias") {
      // múltipla seleção
      const values = Array.from(options)
        .filter((o) => o.selected)
        .map((o) => o.value);
      setForm((prev) => ({ ...prev, categorias: values }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.nome || !form.codNome || !form.categorias.length || !form.senha) {
      setErro("Preencha todos os campos obrigatórios.");
      return;
    }
    setErro("");
    const colunistas = JSON.parse(localStorage.getItem("colunistas") || "[]");
    if (!colunista) {
      // Cadastro novo
      const novo = { ...form, id: Date.now() };
      localStorage.setItem("colunistas", JSON.stringify([...colunistas, novo]));
      if (onSubmit) onSubmit(novo);
      setForm({ nome: "", codNome: "", categorias: [], senha: "" });
    } else {
      // Edição
      const editado = { ...form, id: colunista.id };
      const atualizados = colunistas.map((c) =>
        c.id === colunista.id ? editado : c
      );
      localStorage.setItem("colunistas", JSON.stringify(atualizados));
      if (onSubmit) onSubmit(editado);
    }
  }

  return (
    <Container>
      <h2>{colunista ? "Editar Colunista" : "Cadastrar Colunista"}</h2>
      <Form onSubmit={handleSubmit}>
        <label>
          Nome Completo*
          <input
            name="nome"
            value={form.nome}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          CodNome*
          <input
            name="codNome"
            value={form.codNome}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Categoria(s)*
          <SelectCategorias
            name="categorias"
            multiple
            value={form.categorias}
            onChange={handleChange}
            required
            size={categorias.length}
          >
            {categorias.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </SelectCategorias>
          <InstrucaoSelecao>
            Segure Ctrl (Windows) ou Command (Mac) para selecionar mais de uma.
          </InstrucaoSelecao>
        </label>
        <label>
          Senha*
          <input
            name="senha"
            type="password"
            value={form.senha}
            onChange={handleChange}
            required
          />
        </label>
        {erro && <ErroMsg>{erro}</ErroMsg>}
        <button type="submit">{colunista ? "Salvar" : "Cadastrar"}</button>
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
    font-size: 1.4rem;
    color: #000;
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

const SelectCategorias = styled.select`
  min-height: 90px;
`;

const InstrucaoSelecao = styled.span`
  font-size: 13px;
  color: #888;
`;

const ErroMsg = styled.div`
  color: #c00;
  font-size: 0.95rem;
  margin-bottom: -0.5rem;
`;
