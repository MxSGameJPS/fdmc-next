import styled from "styled-components";

// Função utilitária para extrair a primeira imagem do conteúdo HTML (caso exista)
function extractImageFromContent(content) {
  if (!content) return null;
  const match = content.match(/<img[^>]+src=["']([^"']+)["']/i);
  return match ? match[1] : null;
}

export default function CardNoticiaDestaque({ noticia }) {
  // Lógica para garantir a melhor imagem possível
  let img = noticia.img;
  if (
    !img &&
    noticia.enclosure &&
    (noticia.enclosure.link || noticia.enclosure.url)
  ) {
    img = noticia.enclosure.link || noticia.enclosure.url;
  }
  if (!img && noticia.content) {
    img = extractImageFromContent(noticia.content);
  }
  if (!img) {
    img = "/public/image/bannerAnuncio.png";
  }

  return (
    <Card>
      <Imagem src={img} alt={noticia.title} />
      {noticia.tag && <Tag>{noticia.tag}</Tag>}
      <Conteudo>
        <Titulo>{noticia.title}</Titulo>
        <LinhaInfo>
          {noticia.autor && (
            <Autor>
              Por <b>{noticia.autor}</b>
            </Autor>
          )}
          {noticia.data && <Data>{noticia.data}</Data>}
          {noticia.leitura && <Leitura>{noticia.leitura}</Leitura>}
        </LinhaInfo>
        <Resumo>{noticia.resumo}</Resumo>
      </Conteudo>
    </Card>
  );
}

const Card = styled.div`
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 12px #0001;
  margin-bottom: 1.5rem;
  max-width: 300px;
  width: 100%;
  height: 500px;
`;

const Imagem = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  display: block;
`;

const Tag = styled.div`
  position: absolute;
  top: 14px;
  left: 14px;
  background: #222;
  color: #fff;
  font-size: 0.85rem;
  font-weight: 700;
  padding: 0.2rem 0.7rem;
  border-radius: 4px;
  letter-spacing: 1px;
  z-index: 2;
`;

const Conteudo = styled.div`
  padding: 1.1rem 1.2rem 1.2rem 1.2rem;
`;

const Titulo = styled.h2`
  font-size: 1rem;
  font-weight: 700;
  margin: 0 0 0.7rem 0;
  color: #111;
`;

const LinhaInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.2rem;
  font-size: 0.77rem;
  color: #444;
  margin-bottom: 0.7rem;
  flex-wrap: wrap;
`;

const Autor = styled.span`
  color: #111;
`;

const Data = styled.span`
  color: #888;
  font-style: italic;
  font-size: 0.55rem;
`;

const Leitura = styled.span`
  color: #888;
  font-style: italic;
  font-size: 0.55rem;
`;

const Resumo = styled.p`
  font-size: 0.85rem;
  color: #222;
  margin: 0;
`;
