"use client";
import CardNoticiaDestaque from "../../../components/CardNoticias";
import NoticiasRssFeed from "../../../components/NoticiasRssFeed";
import { useEffect, useState } from "react";
import styled from "styled-components";

export default function Noticias() {
  const [noticias, setNoticias] = useState([]);

  useEffect(() => {
    async function fetchNoticias() {
      const url = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(
        "https://fogaodomeucoracao.com.br/feed/"
      )}`;
      const res = await fetch(url);
      const data = await res.json();
      // Ajuste conforme o seu mapeamento de campos!
      // Função utilitária para extrair a primeira imagem do conteúdo HTML (caso exista)
      function extractImageFromContent(content) {
        if (!content) return null;
        const match = content.match(/<img[^>]+src=["']([^"']+)["']/i);
        return match ? match[1] : null;
      }

      const noticiasArr = data.items.slice(0, 20).map((item) => {
        let img = item.thumbnail;
        if (
          !img &&
          item.enclosure &&
          (item.enclosure.link || item.enclosure.url)
        ) {
          img = item.enclosure.link || item.enclosure.url;
        }
        if (!img) {
          img = extractImageFromContent(item.content);
        }
        return {
          img,
          title: item.title,
          autor: item.author || "Redação",
          data: item.pubDate
            ? new Date(item.pubDate).toLocaleDateString("pt-BR")
            : "",
          leitura: "2 Minutos de leitura", // ajuste se tiver esse campo
          resumo: item.description || "",
        };
      });
      setNoticias(noticiasArr);
    }
    fetchNoticias();
  }, []);

  return (
    <Container>
      <Titulo>Últimas Notícias</Titulo>
      <Lista>
        {noticias.map((noticia, idx) => (
          <CardNoticiaDestaque key={idx} noticia={noticia} />
        ))}
      </Lista>
    </Container>
  );
}

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  padding: 2rem;
`;

const Titulo = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #fff;
`;
const Lista = styled.div`
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
`;
