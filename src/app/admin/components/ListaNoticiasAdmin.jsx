'use client';

import React, { useState } from "react";
import styled from "styled-components";

const categorias = [
  "Todas",
  "Botafogo",
  "Futebol Feminino",
  "Categoria de Base",
];

export default function ListaNoticiasAdmin({ noticias = [] }) {
  const [filtroCategoria, setFiltroCategoria] = useState("Todas");
  const [filtroTitulo, setFiltroTitulo] = useState("");
  const [filtroData, setFiltroData] = useState("");

  const noticiasFiltradas = noticias.filter((noticia) => {
    const matchCategoria =
      filtroCategoria === "Todas" || noticia.categoria === filtroCategoria;
    const matchTitulo = noticia.titulo
      .toLowerCase()
      .includes(filtroTitulo.toLowerCase());
    const matchData = !filtroData || noticia.data === filtroData;
    return matchCategoria && matchTitulo && matchData;
  });

  return (
    <Container>
      <Filtros>
        <label>
          Categoria:
          <select
            value={filtroCategoria}
            onChange={(e) => setFiltroCategoria(e.target.value)}
          >
            {categorias.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </label>
        <label>
          Data:
          <input
            type="date"
            value={filtroData}
            onChange={(e) => setFiltroData(e.target.value)}
          />
        </label>
        <label>
          Título:
          <input
            type="text"
            placeholder="Buscar por título..."
            value={filtroTitulo}
            onChange={(e) => setFiltroTitulo(e.target.value)}
          />
        </label>
      </Filtros>
      {noticiasFiltradas.length === 0 ? (
        <MsgNenhuma> Nenhuma notícia postada no novo site. </MsgNenhuma>
      ) : (
        <Lista>
          {noticiasFiltradas.map((noticia) => (
            <Item key={noticia.id}>
              <strong>{noticia.titulo}</strong>
              <span>
                {noticia.categoria} | {noticia.data}
              </span>
            </Item>
          ))}
        </Lista>
      )}
    </Container>
  );
}

const Container = styled.div`
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.07);
  padding: 2rem;
  margin-top: 2rem;
`;
const Filtros = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
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
`;
const Lista = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;
const Item = styled.li`
  padding: 1rem 0;
  border-bottom: 1px solid #eee;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  strong {
    font-size: 1.1rem;
  }
  span {
    color: #666;
    font-size: 0.97rem;
  }
`;
const MsgNenhuma = styled.div`
  color: #c00;
  font-size: 1.1rem;
  margin-top: 2rem;
  text-align: center;
`;
