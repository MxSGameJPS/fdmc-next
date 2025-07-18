import styled from "styled-components";
import NoticiasRssFeed from "./NoticiasRssFeed";

const SectionGrid = styled.section`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 2fr 1.2fr;
  gap: 2.5rem;
  padding: 0 1.5rem 2.5rem 1.5rem;
  align-items: stretch;
  min-height: 100vh;
  box-sizing: border-box;
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 2rem;
    min-height: unset;
  }
`;

const NoticiasCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const ClassificacaoCol = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 100%;
  margin-top: -1.5rem;
  gap: 1.5rem;

  @media (max-width: 900px) {
    margin-top: 0;
    gap: 1rem;
    justify-content: center;
  }
`;

export default function SessaoNoticiasClassificacao() {
  return (
    <SectionGrid>
      <NoticiasCol>
        <NoticiasRssFeed
          feedUrl="https://fogaodomeucoracao.com.br/feed"
          maxNoticias={7}
        />
      </NoticiasCol>
      <ClassificacaoCol>
        {/* Embed Canva Presentation */}
        <iframe
          src="https://www.canva.com/design/DAF-205ymd0/psLBlz8k5bTOOafnJQ9jNA/view?embed"
          style={{
            width: "100%",
            minHeight: "480px",
            border: 0,
            borderRadius: "12px",
            marginTop: 24,
            boxShadow: "0 2px 12px #0002",
          }}
          allowFullScreen
          loading="lazy"
          title="Canva Apresentação FDMC"
        ></iframe>
        <iframe
          id="sofa-standings-embed-83-72034"
          src="https://widgets.sofascore.com/pt-BR/embed/tournament/83/season/72034/standings/Brasileiro%20Serie%20A%202025?widgetTitle=Brasileiro%20Serie%20A%202025&showCompetitionLogo=true"
          style={{
            height: "1123px",
            maxWidth: "768px",
            width: "100%",
            border: 0,
            borderRadius: "18px",
            boxShadow: "0 4px 24px #0003",
            background: "#fff",
          }}
          frameBorder="0"
          scrolling="no"
          title="Classificação Brasileiro 2025"
        ></iframe>
        <div
          style={{
            fontSize: 12,
            fontFamily: "Arial,sans-serif",
            textAlign: "left",
            marginTop: 8,
          }}
        >
          Classificação fornecida por{" "}
          <a
            target="_blank"
            href="https://www.sofascore.com/pt/torneio/futebol/brazil/brasileirao-serie-a/325#id:72034"
          >
            Sofascore
          </a>
        </div>
      </ClassificacaoCol>
    </SectionGrid>
  );
}
