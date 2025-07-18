import styled from "styled-components";

const CardGrid = styled.div`
  display: grid;
  grid-template-areas:
    "main side1"
    "main side2";
  grid-template-columns: 2.2fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 1.5rem;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  @media (max-width: 900px) {
    grid-template-areas:
      "main"
      "side1"
      "side2";
    grid-template-columns: 1fr;
    grid-template-rows: repeat(3, 1fr);
    gap: 1rem;
  }
`;

const MainCard = styled.a`
  grid-area: main;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background: #111;
  border-radius: 14px;
  overflow: hidden;
  min-height: 140px;
  position: relative;
  text-decoration: none;
  color: #fff;
  background-size: cover;
  background-position: center;
  box-shadow: 0 4px 24px #0004;
  transition: transform 0.2s;
  &:hover {
    transform: scale(1.02);
    box-shadow: 0 8px 32px #0006;
  }
`;

const SideCard = styled.a`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background: #111;
  border-radius: 12px;
  overflow: hidden;
  min-height: 240px;
  position: relative;
  text-decoration: none;
  color: #fff;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  box-shadow: 0 2px 12px #0003;
  transition: transform 0.18s;
  &:hover {
    transform: scale(1.03);
    box-shadow: 0 4px 18px #0005;
  }
`;

const CardOverlay = styled.div`
  background: linear-gradient(0deg, #000e 20%, #0000 100%);
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  z-index: 1;
`;

const CardContent = styled.div`
  position: relative;
  z-index: 2;
  padding: 2rem 1.5rem 1.2rem 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 100%;
`;

const CardTitle = styled.h2`
  font-size: 1.3rem;
  font-weight: bold;
  margin: 0 0 0.5rem 0;
  text-shadow: 0 2px 8px #000a;
`;

const CardDesc = styled.p`
  font-size: 1rem;
  margin: 0;
  color: #eee;
  text-shadow: 0 1px 4px #000a;
`;

export default function CardNovasNoticias({ news }) {
  if (!news || news.length === 0) {
    return (
      <CardGrid>
        <MainCard
          as="div"
          style={{
            minHeight: 340,
            background: "#222",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 14,
            boxShadow: "0 4px 24px #0004",
          }}
        >
          <CardContent>
            <CardTitle style={{ textAlign: "center" }}>
              Carregando notícias...
            </CardTitle>
          </CardContent>
        </MainCard>
      </CardGrid>
    );
  }
  return (
    <CardGrid>
      <MainCard
        href={news[0].link}
        target="_blank"
        rel="noopener noreferrer"
        style={
          news[0].img
            ? { backgroundImage: `url(${news[0].img})`, gridArea: "main" }
            : { background: "#222", gridArea: "main" }
        }
      >
        <CardOverlay />
        <CardContent>
          <CardTitle>{news[0].title}</CardTitle>
        </CardContent>
      </MainCard>
      {news.slice(1, 3).map((item, idx) => (
        <SideCard
          key={idx}
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            ...(item.img
              ? { backgroundImage: `url(${item.img})` }
              : { background: "#222" }),
            gridArea: `side${idx + 1}`,
          }}
        >
          <CardOverlay />
          <CardContent>
            <CardTitle
              as="h3"
              style={{ fontSize: "1.05rem", lineHeight: 1.18 }}
            >
              {item.title}
            </CardTitle>
          </CardContent>
        </SideCard>
      ))}
    </CardGrid>
  );
}
