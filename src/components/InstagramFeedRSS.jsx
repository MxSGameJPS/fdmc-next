import React, { useEffect, useState } from "react";
import styled from "styled-components";

export default function InstagramFeedRSS() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    async function fetchRss() {
      setLoading(true);
      setErro(null);
      try {
        const url = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(
          "https://rss.app/feeds/YpLRvnez80QZoeKK.xml"
        )}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error("Erro ao buscar o feed do Instagram");
        const data = await res.json();
        if (!data.items) throw new Error("Feed sem itens");
        // Usa thumbnail, mas tenta enclosure.link como fallback
        const postsArr = data.items.slice(0, 3).map((item) => {
          let thumb = item.thumbnail;
          if (typeof thumb === "string") {
            thumb = thumb.replace(/&amp;/g, "&");
          }
          // fallback para enclosure.link se thumbnail não existir ou for vazio
          if (
            (!thumb || thumb === "") &&
            item.enclosure &&
            item.enclosure.link
          ) {
            thumb = item.enclosure.link.replace(/&amp;/g, "&");
          }
          // log para depuração
          if (!thumb || thumb === "") {
            // eslint-disable-next-line no-console
            console.log("Post sem imagem:", item);
          }
          return {
            ...item,
            thumbnail: thumb,
          };
        });
        setPosts(postsArr);
      } catch (e) {
        setErro(e.message);
      } finally {
        setLoading(false);
      }
    }
    fetchRss();
  }, []);
  return (
    <Container>
      <Titulo>Últimos posts do Insta</Titulo>
      {loading ? (
        <Status cor="#dadadaff">Carregando posts do Instagram...</Status>
      ) : erro ? (
        <Status cor="red">Erro ao carregar posts do Instagram: {erro}</Status>
      ) : (
        <Lista>
          {posts.map((post, idx) => (
            <Card
              key={idx}
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              {post.thumbnail && post.thumbnail !== "" ? (
                <Imagem
                  src={`https://images.weserv.nl/?url=${encodeURIComponent(
                    post.thumbnail.replace(/^https?:\/\//, "")
                  )}`}
                  alt={post.title}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/image/icon-square.png";
                  }}
                />
              ) : (
                <SemImagem>Sem imagem</SemImagem>
              )}
              <Conteudo>
                <TituloCard>{post.title}</TituloCard>
                <Data>
                  {post.pubDate
                    ? new Date(post.pubDate).toLocaleDateString("pt-BR")
                    : ""}
                </Data>
              </Conteudo>
            </Card>
          ))}
        </Lista>
      )}
    </Container>
  );
}

// Styled Components
const Container = styled.div`
  width: 100%;
  max-width: 900px;
  height: 380px;
  min-height: 180px;
  margin-top: 16px;
  border-radius: 12px;
  box-shadow: 0 2px 12px #0002;
  background: #181818;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0;

  @media (max-width: 600px) {
    height: 280px;
    max-width: 400px;
  }
`;

const Titulo = styled.div`
  font-weight: 700;
  font-size: 20px;
  color: #dadadaff;
  padding: 16px 24px 0 24px;
  letter-spacing: 0.5px;

  @media (max-width: 600px) {
    font-size: 18px;
    text-align: center;
    align-self: center;
  }
`;

const Lista = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
  width: 100%;
  padding: 16px 8px;
  box-sizing: border-box;
  justify-content: center;
  align-items: stretch;
  overflow-x: auto;
`;

const Card = styled.a`
  background: #222;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px #0002;
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: #dadadaff;
  min-width: 190px;
  max-width: 190px;
  width: 190px;
  flex: 0 1 190px;
  transition: box-shadow 0.2s;
  padding: 18px;

  @media (max-width: 600px) {
    min-width: 150px;
    max-width: 150px;
    width: 150px;
    height: 180px;
    flex: 0 1 120px;
    padding: 7px;
  }
`;

const Imagem = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  background: #222;
  border-radius: 8px;
  box-shadow: 0 2px 8px #000;
  @media (max-width: 600px) {
    height: 120px;
  }
`;

const SemImagem = styled.div`
  width: 100%;
  height: 120px;
  background: #222;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #888;
  @media (max-width: 600px) {
    height: 90px;
  }
`;

const Conteudo = styled.div`
  padding: 12px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media (max-width: 600px) {
    padding: 6px;
  }
`;

const TituloCard = styled.div`
  font-weight: 700;
  font-size: 14px;
  margin-bottom: 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  @media (max-width: 600px) {
    font-size: 11px;
    margin-bottom: 4px;
  }
`;

const Data = styled.div`
  font-size: 12px;
  color: #888;
  @media (max-width: 600px) {
    font-size: 10px;
  }
`;

const Status = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.cor || "#dadadaff"};
`;
