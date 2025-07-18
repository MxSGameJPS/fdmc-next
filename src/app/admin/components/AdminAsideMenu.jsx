import React from "react";
import styled from "styled-components";

export default function AdminAsideMenu({
  menuSelecionado,
  setMenuSelecionado,
}) {
  return (
    <AsideMenu>
      <MenuTitle>Painel</MenuTitle>
      <AsideMenuList>
        <AsideMenuItem
          onClick={() => setMenuSelecionado("noticias")}
          $selected={menuSelecionado === "noticias"}
        >
          Gerenciar Notícias
        </AsideMenuItem>
        <AsideMenuItem
          onClick={() => setMenuSelecionado("destaques")}
          $selected={menuSelecionado === "destaques"}
        >
          Gerenciar Destaques
        </AsideMenuItem>
        <AsideMenuItem
          onClick={() => setMenuSelecionado("patrocinadores")}
          $selected={menuSelecionado === "patrocinadores"}
        >
          Gerenciar Patrocinadores
        </AsideMenuItem>
        {/* Itens removidos: Futebol Feminino e Categoria de Base */}
        <AsideMenuItem onClick={() => setMenuSelecionado("colunistas")}>
          Colunistas
        </AsideMenuItem>
      </AsideMenuList>
    </AsideMenu>
  );
}

const AsideMenu = styled.aside`
  width: 260px;
  background: #fff;
  border-right: 1px solid #eee;
  min-height: 100vh;
  padding: 2rem 0 2rem 2rem;
`;

const MenuTitle = styled.h2`
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 2rem;
  color: #222;
`;

const AsideMenuList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const AsideMenuItem = styled.li`
  padding: 0.9rem 1.2rem;
  border-radius: 6px;
  margin-bottom: 0.5rem;
  font-weight: 500;
  font-size: 1rem;
  cursor: pointer;
  background: ${({ $selected }) => ($selected ? "#e5e5e5" : "none")};
  color: ${({ $selected }) => ($selected ? "#111" : "#444")};
  transition: background 0.2s, color 0.2s;
  &:hover {
    background: #f0f0f0;
  }
`;
