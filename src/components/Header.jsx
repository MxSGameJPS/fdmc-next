"use client";
import styled from "styled-components";
import Image from "next/image";
import {
  FaInstagram,
  FaNewspaper,
  FaHome,
  FaStar,
  FaUserFriends,
  FaLock,
} from "react-icons/fa";
import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <HeaderContainer>
      <HeaderBg />
      <HeaderContent>
        <LogoWrapper>
          <Image
            src="/image/logoBranca.png"
            alt="Fogão do Meu Coração"
            fill
            style={{
              objectFit: "contain",
              filter: "drop-shadow(0 2px 8px #0008)",
            }}
            priority
          />
        </LogoWrapper>
        <Hamburger
          aria-label="Abrir menu"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <svg width="32" height="32" viewBox="0 0 32 32">
            <rect y="6" width="32" height="4" rx="2" fill="currentColor" />
            <rect y="14" width="32" height="4" rx="2" fill="currentColor" />
            <rect y="22" width="32" height="4" rx="2" fill="currentColor" />
          </svg>
        </Hamburger>
        <Nav
          className={menuOpen ? "open" : ""}
          onClick={() => setMenuOpen(false)}
        >
          <NavLink href="/">
            <FaHome /> Início
          </NavLink>
          <NavLink href="/noticias">
            <FaNewspaper /> Notícias
          </NavLink>
          <NavLink href="#destaques">
            <FaStar /> Destaques
          </NavLink>
          <NavLink href="#torcida">
            <FaUserFriends /> Patrocinadores
          </NavLink>
          <NavLink href="#instagram">
            <FaInstagram /> Instagram
          </NavLink>
          <NavLink href="/admin">
            <FaLock /> Admin
          </NavLink>
        </Nav>
      </HeaderContent>
    </HeaderContainer>
  );
}

const HeaderBg = styled.div`
  background: linear-gradient(90deg, #050505ff 0%, #414345 100%);
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  z-index: 0;
`;

const HeaderContainer = styled.header`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0;
  margin: 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  z-index: 10;
`;

const HeaderContent = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.5rem 1rem 1rem 1rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  position: relative;
  z-index: 2;

  @media (max-width: 768px) {
    padding: 1rem 0.5rem 0.5rem 0.5rem;
    width: 100%;
    max-width: 400px;
  }

  @media (max-width: 600px) {
    width: 100%;
    max-width: 200px;
  }
`;

const LogoWrapper = styled.div`
  position: relative;
  width: 140px;
  height: 50px;
  margin-bottom: 0;
  @media (max-width: 768px) {
    width: 110px;
    height: 40px;
  }
  @media (max-width: 600px) {
    width: 90px;
    height: 32px;
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 2rem;
  align-items: center;

  @media (max-width: 768px) {
    position: absolute;
    top: 64px;
    right: 0;
    background: #181818ee;
    flex-direction: column;
    gap: 0.5rem;
    width: 180px;
    border-radius: 0 0 0 12px;
    box-shadow: 0 4px 16px #0005;
    padding: 1rem 0.5rem;
    z-index: 100;
    transition: transform 0.2s;
    transform: translateY(-200%);
    pointer-events: none;
    opacity: 0;
    &.open {
      transform: translateY(0);
      pointer-events: all;
      opacity: 1;
    }
  }
`;

const NavLink = styled(Link)`
  color: #fff;
  font-size: 1.08rem;
  text-decoration: none;
  font-weight: 500;
  letter-spacing: 0.5px;
  transition: color 0.2s, transform 0.2s;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.3rem 0.8rem;
  border-radius: 6px;
  position: relative;
  &:hover {
    color: #ffd700;
    background: rgba(0, 0, 0, 0.07);
    transform: translateY(-2px) scale(1.05);
  }
  @media (max-width: 768px) {
    font-size: 1rem;
    width: 100%;
    justify-content: flex-start;
    padding: 0.5rem 0.5rem;
  }
`;

const Hamburger = styled.button`
  display: none;
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
  z-index: 200;
  @media (max-width: 768px) {
    display: block;
    margin-left: 1rem;
    font-size: 2rem;
    color: #fff;
  }
`;
