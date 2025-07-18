"use client";
import { useState } from "react";
import Hero from "../components/Hero";
import BannerAnunciante from "../components/BannerAnunciante";
import SessaoNoticiasClassificacao from "../components/SessaoNoticiasClassificacao";
import styled from "styled-components";

export default function Home() {
  const [noticias, setNoticias] = useState([]);
  return (
    <Container>
      <Hero setNoticias={setNoticias} />
      <BannerAnunciante />
      <SessaoNoticiasClassificacao noticias={noticias} />
    </Container>
  );
}

const Container = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
`;
