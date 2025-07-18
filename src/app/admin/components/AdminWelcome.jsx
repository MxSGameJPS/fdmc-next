import React from "react";
import styled from "styled-components";

export default function AdminWelcome() {
  return (
    <WelcomeContainer>
      <p>
        Selecione uma opção no menu para começar a gerenciar o conteúdo do site.
      </p>
    </WelcomeContainer>
  );
}

const WelcomeContainer = styled.div`
  background: #0c0c0cff;
  padding: 2rem;
  border-radius: 8px;
  margin-top: 1.5rem;
`;
