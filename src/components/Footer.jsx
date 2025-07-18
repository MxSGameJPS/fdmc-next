"use client";
import styled from "styled-components";
import { FaInstagram } from "react-icons/fa";

const FooterContainer = styled.footer`
  width: 100%;
  background: linear-gradient(90deg, #050505ff 0%, #414345 100%);
  color: #fff;
  padding: 2rem 0 1rem 0;
  text-align: center;
  margin-top: 3rem;
`;

const Social = styled.a`
  color: #fff;
  margin: 0 0.5rem;
  font-size: 1.5rem;
  transition: color 0.2s;
  &:hover {
    color: #ff512f;
  }
`;

export default function Footer() {
  return (
    <FooterContainer>
      <div>
        <Social
          href="https://instagram.com/fogaodomeucoracao"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram />
        </Social>
      </div>
      <div style={{ marginTop: "1rem", fontSize: "0.9rem" }}>
        © {new Date().getFullYear()} Fogão do Meu Coração. Todos os direitos
        reservados.
      </div>
    </FooterContainer>
  );
}
