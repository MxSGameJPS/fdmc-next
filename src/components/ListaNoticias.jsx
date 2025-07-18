import styled from "styled-components";
import BannerAnunciante from "./BannerAnunciante";
import InstagramFeedRSS from "./InstagramFeedRSS";

export default function ListaNoticias({ noticias }) {
  if (!noticias || noticias.length === 0) return null;
  return (
    <Lista>
      {noticias.map((noticia, idx) => (
        <NoticiaItem
          href={noticia.link}
          key={idx}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Imagem src={noticia.img} alt={noticia.title} />
          <Info>
            <Titulo>{noticia.title}</Titulo>
            {noticia.meta && <Meta>{noticia.meta}</Meta>}
          </Info>
        </NoticiaItem>
      ))}
      <BannerAnunciante />
      {/* Últimos posts do Instagram */}
      <InstagramFeedRSS />
    </Lista>
  );
}

const Lista = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
  max-width: 100vw;
  box-sizing: border-box;
  padding: 0 8px;

  @media (max-width: 600px) {
    gap: 0.7rem;
    max-width: 90vw;
    align-items: center;
    justify-content: center;
  }
`;

const NoticiaItem = styled.a`
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
  text-decoration: none;
  color: #d3d3d3ff;
  background: none;
  border-radius: 0;
  border: none;
  padding: 0;
  border-bottom: 1px solid #d6d6d6;
  transition: background 0.2s;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  &:hover {
    background: #f5f5f5;
  }
  @media (max-width: 600px) {
    flex-direction: column;
    gap: 0.5rem;
    padding-bottom: 0.7rem;
    align-items: center;
  }
`;

const Imagem = styled.img`
  width: 160px;
  height: 110px;
  object-fit: cover;
  border-radius: 4px;
  background: #eee;
  flex-shrink: 0;
  max-width: 100%;

  @media (max-width: 600px) {
    width: 100%;
    height: 90px;
    border-radius: 3px;
    max-width: 90vw;
  }
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 0;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 600px) {
    padding: 0 1rem;
    align-items: center;
    text-align: center;
  }
`;

const Titulo = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
  color: #dadadaff;

  @media (max-width: 600px) {
    font-size: 1rem;
    margin-bottom: 0.3rem;
    text-align: center;
  }
`;

const Meta = styled.div`
  font-size: 0.95rem;
  color: #888;

  @media (max-width: 600px) {
    font-size: 0.85rem;
    text-align: center;
  }
`;
