import React, { useEffect, useState } from "react";
import ListaNoticias from "./ListaNoticias";

// Função utilitária para extrair a primeira imagem do conteúdo HTML (caso exista)
function extractImageFromContent(content) {
  if (!content) return null;
  const match = content.match(/<img[^>]+src=["']([^"']+)["']/i);
  return match ? match[1] : null;
}

export default function NoticiasRssFeed({ feedUrl, maxNoticias = 7 }) {
  const [noticias, setNoticias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    async function fetchRss() {
      setLoading(true);
      setErro(null);
      try {
        // Usando o api.rss2json.com para evitar CORS
        const url = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(
          feedUrl
        )}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error("Erro ao buscar o feed");
        const data = await res.json();
        if (!data.items) throw new Error("Feed sem itens");
        const noticiasArr = data.items.slice(0, maxNoticias).map((item) => {
          // Tenta pegar imagem de várias fontes possíveis
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
          if (!img) {
            img = "/public/image/bannerAnuncio.png";
          }
          return {
            title: item.title,
            link: item.link,
            img,
            meta: item.pubDate
              ? new Date(item.pubDate).toLocaleDateString("pt-BR")
              : "",
          };
        });
        setNoticias(noticiasArr);
      } catch (e) {
        setErro(e.message);
      } finally {
        setLoading(false);
      }
    }
    fetchRss();
  }, [feedUrl, maxNoticias]);

  if (loading) return <div>Carregando notícias...</div>;
  if (erro) return <div>Erro ao carregar notícias: {erro}</div>;
  return <ListaNoticias noticias={noticias} />;
}
