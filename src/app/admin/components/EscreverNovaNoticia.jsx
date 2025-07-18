"use client";
import React, { useState } from "react";
import styled from "styled-components";

export default function EscreverNovaNoticia({ onVoltar }) {
  const [titulo, setTitulo] = useState("");
  const [foto, setFoto] = useState("");
  const [categoria, setCategoria] = useState("");
  const [resumo, setResumo] = useState("");
  const [corpo, setCorpo] = useState("");
  const [assinatura, setAssinatura] = useState("");
  const [fotoPreview, setFotoPreview] = useState("");

  function handleFotoChange(e) {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setFotoPreview(reader.result);
      reader.readAsDataURL(file);
      setFoto(file);
    } else {
      setFoto("");
      setFotoPreview("");
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Aqui você pode enviar os dados para o backend ou salvar localmente
    alert("Notícia cadastrada! (simulação)");
    onVoltar();
  }

  return (
    <FormContainer>
      <h2>Escrever Nova Notícia</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Título da Notícia:
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
          />
        </label>
        <label>
          Foto da Notícia:
          <input type="file" accept="image/*" onChange={handleFotoChange} />
          {fotoPreview && <ImgPreview src={fotoPreview} alt="Prévia da foto" />}
        </label>
        <label>
          Categoria da Notícia:
          <select
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            required
          >
            <option value="">Selecione...</option>
            <option value="noticias">Notícias Botafogo</option>
            <option value="feminino">Futebol Feminino</option>
            <option value="base">Categoria de Base</option>
          </select>
        </label>
        <label>
          Resumo da Notícia:
          <textarea
            value={resumo}
            onChange={(e) => setResumo(e.target.value)}
            rows={3}
            required
          />
        </label>
        <label>
          Corpo da Notícia:
          <textarea
            value={corpo}
            onChange={(e) => setCorpo(e.target.value)}
            rows={8}
            required
          />
        </label>
        <label>
          Assinatura (colunista):
          <input
            type="text"
            value={assinatura}
            onChange={(e) => setAssinatura(e.target.value)}
            required
          />
        </label>
        <FormActions>
          <button type="button" onClick={onVoltar} className="voltar">
            Voltar
          </button>
          <button type="submit">Salvar Notícia</button>
        </FormActions>
      </form>
    </FormContainer>
  );
}

const FormContainer = styled.div`
  background: #000;
  border-radius: 10px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.07);
  padding: 2.5rem 2.5rem 2rem 2.5rem;
  max-width: 1400px;
  margin: 2rem auto 0 auto;
  h2 {
    margin-bottom: 2rem;
    font-size: 1.4rem;
    color: #fff;
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 1.3rem;
  }
  label {
    display: flex;
    flex-direction: column;
    font-weight: 500;
    gap: 0.3rem;
    color: #fff;
  }
  input,
  select,
  textarea {
    padding: 0.6rem;
    border-radius: 5px;
    border: 1px solid #ccc;
    font-size: 1rem;
    margin-top: 0.2rem;
  }
  textarea {
    resize: vertical;
  }
`;
const ImgPreview = styled.img`
  max-width: 180px;
  max-height: 120px;
  margin-top: 0.7rem;
  border-radius: 6px;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.08);
`;
const FormActions = styled.div`
  display: flex;
  gap: 1.2rem;
  margin-top: 1.2rem;
  justify-content: flex-end;
  button {
    background: #ffffffff;
    color: #000;
    border: none;
    border-radius: 5px;
    padding: 0.7rem 1.3rem;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
    transition: background 0.2s;
    &.voltar {
      background: #ff550e;
      color: #fff;
    }
    &:hover {
      background: #414345;
      color: #fff;
    }
  }
`;
