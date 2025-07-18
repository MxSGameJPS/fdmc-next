import React from "react";
import styled from "styled-components";

export default function CardsAdmin({
  onNovaNoticia,
  onEditarNoticias,
  onExcluirNoticias,
  customCards = [],
}) {
  if (customCards.length > 0) {
    return (
      <CardsContainer>
        {customCards.map((card, idx) => (
          <CardAcao key={idx} onClick={card.onClick}>
            {card.label}
          </CardAcao>
        ))}
      </CardsContainer>
    );
  }
  return (
    <CardsContainer>
      <CardAcao onClick={onEditarNoticias}>Editar Notícias Postadas</CardAcao>
      <CardAcao onClick={onExcluirNoticias}>Excluir Notícias Postadas</CardAcao>
      <CardAcao onClick={onNovaNoticia}>Escrever Nova Notícia</CardAcao>
    </CardsContainer>
  );
}

const CardsContainer = styled.div`
  display: flex;
  gap: 2rem;
  margin-top: 2rem;
  flex-wrap: wrap;
`;
const CardAcao = styled.div`
  background: linear-gradient(90deg, #050505ff 0%, #414345 100%);
  border-radius: 10px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.07);
  padding: 2rem 2.5rem;
  min-width: 220px;
  min-height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  font-weight: 600;
  color: #d8d8d8ff;
  cursor: pointer;
  transition: box-shadow 0.2s, transform 0.2s;
  &:hover {
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.13);
    transform: translateY(-2px) scale(1.03);
  }
`;
