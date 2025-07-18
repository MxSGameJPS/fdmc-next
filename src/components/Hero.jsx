import styled from "styled-components";
import { useEffect, useState } from "react";
import CardNovasNoticias from "./CardNovasNoticias";

const HeroBg = styled.div`
  background: linear-gradient(90deg, #050505 0%, #292a2b 100%);
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  z-index: 0;
`;

const HeroSection = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
  min-height: 480px;
  padding: 0;
  margin: 0;
  z-index: 5;

  @media (max-width: 600px) {
    min-height: 320px;
  }
`;

const HeroContent = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2.5rem 1rem 2rem 1rem;
  display: flex;
  flex-direction: row;
  gap: 1.5rem;
  position: relative;
  z-index: 2;

  @media (max-width: 900px) {
    flex-direction: column;
    gap: 1rem;
  }
  @media (max-width: 600px) {
    padding: 1.2rem 0.3rem 1rem 0.3rem;
    gap: 0.7rem;
    min-height: 280px;
    width: 100%;
    max-width: 350px;
  }
`;

const MainNews = styled.a`
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background: #111;
  border-radius: 12px;
  overflow: hidden;
  min-height: 350px;
  position: relative;
  text-decoration: none;
  color: #fff;
  box-shadow: 0 4px 24px #0004;
  background-size: cover;
  background-position: center;
  transition: transform 0.2s;
  &:hover {
    transform: scale(1.02);
    box-shadow: 0 8px 32px #0006;
  }
  @media (max-width: 600px) {
    min-height: 200px;
    border-radius: 8px;
  }
`;

const MainNewsOverlay = styled.div`
  background: linear-gradient(0deg, #000c 60%, #0000 100%);
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  z-index: 1;
`;

const MainNewsContent = styled.div`
  position: relative;
  z-index: 2;
  padding: 2.5rem 2rem 1.5rem 2rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 100%;
  @media (max-width: 600px) {
    padding: 1.2rem 0.7rem 0.7rem 0.7rem;
  }
`;

const MainNewsTitle = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  margin: 0 0 0.5rem 0;
  text-shadow: 0 2px 8px #000a;
  @media (max-width: 600px) {
    font-size: 1.2rem;
  }
`;

const MainNewsDesc = styled.p`
  font-size: 1.1rem;
  margin: 0;
  color: #eee;
  text-shadow: 0 1px 4px #000a;
  @media (max-width: 600px) {
    font-size: 0.95rem;
  }
`;

const SideNewsList = styled.div`
  flex: 1.2;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  @media (max-width: 900px) {
    flex-direction: row;
    gap: 0.7rem;
  }
  @media (max-width: 600px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const SideNews = styled.a`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background: #111;
  border-radius: 12px;
  overflow: hidden;
  min-height: 110px;
  position: relative;
  text-decoration: none;
  color: #fff;
  background-size: cover;
  background-position: center;
  box-shadow: 0 2px 12px #0003;
  transition: transform 0.18s;
  &:hover {
    transform: scale(1.03);
    box-shadow: 0 4px 18px #0005;
  }
  @media (max-width: 600px) {
    min-height: 70px;
    border-radius: 8px;
  }
`;

const SideNewsOverlay = styled.div`
  background: linear-gradient(0deg, #000b 70%, #0000 100%);
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  z-index: 1;
`;

const SideNewsContent = styled.div`
  position: relative;
  z-index: 2;
  padding: 1.2rem 1rem 0.8rem 1rem;
  @media (max-width: 600px) {
    padding: 0.7rem 0.5rem 0.5rem 0.5rem;
  }
`;

const SideNewsTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: bold;
  margin: 0 0 0.3rem 0;
  text-shadow: 0 1px 4px #000a;
  @media (max-width: 600px) {
    font-size: 0.95rem;
  }
`;

const SideNewsDesc = styled.p`
  font-size: 0.95rem;
  margin: 0;
  color: #eee;
  text-shadow: 0 1px 4px #000a;
  @media (max-width: 600px) {
    font-size: 0.85rem;
  }
`;

function parseImageFromContent(content) {
  // Busca a primeira imagem do conteúdo do RSS
  const match = content.match(/<img[^>]+src=["']([^"'>]+)["']/i);
  return match ? match[1] : null;
}

export default function Hero() {
  const [news, setNews] = useState([]);
  const [rssError, setRssError] = useState(null);
  useEffect(() => {
    async function fetchRSS() {
      try {
        const res = await fetch(
          `https://api.allorigins.win/get?url=${encodeURIComponent(
            "https://fogaodomeucoracao.com.br/feed/"
          )}`
        );
        const data = await res.json();
        console.log("[FDMC] RSS data.contents:", data.contents);
        // Detecta e decodifica base64 se necessário
        let xmlString = data.contents;
        if (xmlString.startsWith("data:application/rss+xml")) {
          const base64 = xmlString.split(",")[1];
          try {
            xmlString = atob(base64);
          } catch (err) {
            console.error("[FDMC] Erro ao decodificar base64:", err);
            setRssError("Erro ao decodificar o RSS em base64.");
            setNews([]);
            return;
          }
        }
        const parser = new window.DOMParser();
        const xml = parser.parseFromString(xmlString, "text/xml");
        const items = Array.from(xml.querySelectorAll("item"));
        console.log("[FDMC] Quantidade de <item>:", items.length);
        const sliced = items.slice(0, 4);
        const newsArr = sliced.map((item, idx) => {
          const title = item.querySelector("title")?.textContent || "";
          const link = item.querySelector("link")?.textContent || "";
          const description =
            item.querySelector("description")?.textContent || "";
          let img = null;
          const mediaContent = item.getElementsByTagName("media:content")[0];
          if (mediaContent && mediaContent.getAttribute("url")) {
            img = mediaContent.getAttribute("url");
          }
          if (!img) {
            let contentEncoded = "";
            const contentNode = Array.from(item.childNodes).find(
              (n) =>
                n.nodeName === "content:encoded" ||
                n.nodeName.endsWith(":encoded")
            );
            if (contentNode && contentNode.textContent) {
              contentEncoded = contentNode.textContent;
              img = parseImageFromContent(contentEncoded);
            }
          }
          if (!img) {
            img = parseImageFromContent(description);
          }
          console.log(`[FDMC] Notícia ${idx}:`, { title, link, img });
          return {
            title,
            link,
            description:
              description.replace(/<[^>]+>/g, "").slice(0, 120) + "...",
            img,
          };
        });
        console.log("[FDMC] newsArr:", newsArr);
        setNews(newsArr);
        setRssError(null);
      } catch (e) {
        console.error("[FDMC] Erro ao buscar RSS:", e);
        setNews([]);
        setRssError(e?.message || "Erro desconhecido ao buscar notícias.");
      }
    }
    fetchRSS();
  }, []);

  return (
    <HeroSection>
      <HeroBg />
      <HeroContent>
        {rssError ? (
          <div
            style={{
              width: "100%",
              minHeight: 350,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#a00",
              borderRadius: 12,
            }}
          >
            <span
              style={{ color: "#fff", fontSize: "1.3rem", textAlign: "center" }}
            >
              Erro ao carregar notícias:
              <br />
              {rssError}
            </span>
          </div>
        ) : news.length === 0 ? (
          <div
            style={{
              width: "100%",
              minHeight: 350,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#222",
              borderRadius: 12,
            }}
          >
            <span style={{ color: "#fff", fontSize: "1.3rem" }}>
              Carregando notícias...
            </span>
          </div>
        ) : (
          <CardNovasNoticias news={news} />
        )}
      </HeroContent>
    </HeroSection>
  );
}
