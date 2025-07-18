import styled from "styled-components";

const BannerWrapper = styled.section`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 2.5rem 0 1.5rem 0;
  background: none;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;

  @media (max-width: 600px) {
    max-width: 90vw;
    width: 100%;
    padding: 1rem 0.5rem;
    margin: 0 auto;
  }
`;

const BannerImg = styled.img`
  width: 100%;
  max-width: 800px;
  max-height: 180px;
  border-radius: 18px;
  box-shadow: 0 4px 24px #0003;
  object-fit: contain;
  background: transparent;
  box-sizing: border-box;

  @media (max-width: 600px) {
    max-height: 90px;
    border-radius: 10px;
  }
`;

export default function BannerAnunciante() {
  return (
    <BannerWrapper>
      <BannerImg src="/image/bannerAnuncio.png" alt="Banner Anunciante" />
    </BannerWrapper>
  );
}
