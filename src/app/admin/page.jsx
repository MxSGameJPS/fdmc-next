
"use client"
import React, { useState } from "react";
import EscreverNovaNoticia from "./components/EscreverNovaNoticia";
import AdminLogin from "./components/AdminLogin";
import AdminAsideMenu from "./components/AdminAsideMenu";
import AdminWelcome from "./components/AdminWelcome";
import CardsAdmin from "./components/CardsAdmin";
import ListaNoticiasAdmin from "./components/ListaNoticiasAdmin";
import FormPatrocinador from "./components/FormPatrocinador";
import FormColunista from "./components/FormColunista";
import { AdminLayout, MainContent } from "./components/AdminLayout";
import styled from "styled-components";
// import { useAdminAuth } from "./components/useAdminAuth"; // Não utilizado diretamente

export default function AdminPage() {
  // Estados para fluxo de edição de colunista
  const [mostrarListaEditarColunista, setMostrarListaEditarColunista] =
    useState(false);

  // Função para logout
  function handleLogout() {
    setIsLogged(false);
    localStorage.removeItem("adminLogged");
  }

  // Função para cadastrar novo colunista
  function handleNovoColunista(novo) {
    const atualizados = [...colunistas, novo];
    setColunistas(atualizados);
    localStorage.setItem("colunistas", JSON.stringify(atualizados));
    setMsgSucesso("Colunista cadastrado com sucesso!");
    setTimeout(() => setMsgSucesso(""), 2500);
    setMostrarFormColunista(false);
  }
  // Autenticação
  const [isLogged, setIsLogged] = useState(false);
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setIsLogged(localStorage.getItem("adminLogged") === "true");
    }
  }, []);
  function handleLoginSuccess() {
    setIsLogged(true);
    localStorage.setItem("adminLogged", "true");
  }

  // Colunistas
  const [colunistas, setColunistas] = useState([]);
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem("colunistas");
      setColunistas(data ? JSON.parse(data) : []);
    }
  }, []);
  const [colunistaEditando, setColunistaEditando] = useState(null);
  const [mostrarFormColunista, setMostrarFormColunista] = useState(false);
  const [msgSucesso, setMsgSucesso] = useState("");
  const [menuSelecionado, setMenuSelecionado] = useState(null);
  // Estados para Gerenciar Notícias
  const [acaoNoticia, setAcaoNoticia] = useState(null);
  const [mostrarListaEditar, setMostrarListaEditar] = useState(false);
  const [mostrarListaExcluir, setMostrarListaExcluir] = useState(false);
  const [mostrarListaDestaques, setMostrarListaDestaques] = useState(false);
  const [mostrarListaExcluirPatro, setMostrarListaExcluirPatro] =
    useState(false);
  const [mostrarFormPatro, setMostrarFormPatro] = useState(false);
  const [mostrarListaEditarPatro, setMostrarListaEditarPatro] = useState(false);
  const [patrocinadorEditando, setPatrocinadorEditando] = useState(null);

  if (!isLogged) {
    return <AdminLogin onLogin={handleLoginSuccess} />;
  }

  function renderContent() {
    if (menuSelecionado === "noticias") {
      if (acaoNoticia === "nova") {
        return <EscreverNovaNoticia onVoltar={() => setAcaoNoticia(null)} />;
      }
      if (mostrarListaEditar) {
        return (
          <>
            <button
              onClick={() => setMostrarListaEditar(false)}
              style={{
                marginBottom: 16,
                background: "#000",
                border: "none",
                borderRadius: 6,
                padding: "0.6rem 1.2rem",
                fontWeight: "bold",
                fontSize: "1rem",
                cursor: "pointer",
              }}
            >
              Voltar
            </button>
            <ListaNoticiasAdmin
              modo="editar"
              onVoltar={() => setMostrarListaEditar(false)}
            />
          </>
        );
      }
      if (mostrarListaExcluir) {
        return (
          <>
            <button
              onClick={() => setMostrarListaExcluir(false)}
              style={{
                marginBottom: 16,
                background: "#000",
                border: "none",
                borderRadius: 6,
                padding: "0.6rem 1.2rem",
                fontWeight: "bold",
                fontSize: "1rem",
                cursor: "pointer",
              }}
            >
              Voltar
            </button>
            <ListaNoticiasAdmin
              modo="excluir"
              onVoltar={() => setMostrarListaExcluir(false)}
            />
          </>
        );
      }
      return (
        <div style={{ marginTop: 32 }}>
          <CardsAdmin
            onNovaNoticia={() => setAcaoNoticia("nova")}
            onEditarNoticias={() => setMostrarListaEditar(true)}
            onExcluirNoticias={() => setMostrarListaExcluir(true)}
          />
        </div>
      );
    }

    // COLUNISTAS: fluxo separado
    if (menuSelecionado === "colunistas") {
      function handleExcluirColunista(id) {
        const atualizados = colunistas.filter((c) => c.id !== id);
        setColunistas(atualizados);
        localStorage.setItem("colunistas", JSON.stringify(atualizados));
        setMsgSucesso("Colunista excluído com sucesso!");
        setTimeout(() => setMsgSucesso(""), 2500);
      }

      if (colunistaEditando) {
        return (
          <>
            <VoltarButton onClick={() => setColunistaEditando(null)}>
              Voltar
            </VoltarButton>
            <FormColunista
              colunista={colunistaEditando}
              onSubmit={(editado) => {
                const atualizados = colunistas.map((c) =>
                  c.id === editado.id ? editado : c
                );
                setColunistas(atualizados);
                localStorage.setItem("colunistas", JSON.stringify(atualizados));
                setMsgSucesso("Colunista editado com sucesso!");
                setTimeout(() => setMsgSucesso(""), 2500);
                setColunistaEditando(null);
              }}
            />
            {msgSucesso && <MsgSucesso>{msgSucesso}</MsgSucesso>}
          </>
        );
      }

      if (mostrarFormColunista) {
        return (
          <>
            <VoltarButton onClick={() => setMostrarFormColunista(false)}>
              Voltar
            </VoltarButton>
            <FormColunista onSubmit={handleNovoColunista} />
            {msgSucesso && <MsgSucesso>{msgSucesso}</MsgSucesso>}
          </>
        );
      }

      return (
        <ColunistasContainer>
          <CardsAdmin
            customCards={[
              {
                label: "Cadastrar Colunista",
                onClick: () => setMostrarFormColunista(true),
              },
            ]}
          />
          <ColunistasBox>
            <ColunistasTitulo>Colunistas cadastrados</ColunistasTitulo>
            {colunistas.length === 0 ? (
              <NenhumColunistaMsg>
                Nenhum colunista cadastrado.
              </NenhumColunistaMsg>
            ) : (
              <ColunistasLista>
                {colunistas.map((col) => (
                  <ColunistaItem key={col.id}>
                    <span>
                      <b>{col.nome}</b>{" "}
                      <CodNomeSpan>({col.codNome})</CodNomeSpan>
                      <CategoriasSpan>
                        {col.categorias && col.categorias.join(", ")}
                      </CategoriasSpan>
                    </span>
                    <AcoesColunista>
                      <BotaoAcao
                        title="Editar"
                        $color="#222"
                        onClick={() => setColunistaEditando(col)}
                      >
                        <span role="img" aria-label="Editar">
                          ✏️
                        </span>
                      </BotaoAcao>
                      <BotaoAcao
                        title="Excluir"
                        $color="#c00"
                        onClick={() => handleExcluirColunista(col.id)}
                      >
                        <span role="img" aria-label="Excluir">
                          🗑️
                        </span>
                      </BotaoAcao>
                    </AcoesColunista>
                  </ColunistaItem>
                ))}
              </ColunistasLista>
            )}
            {msgSucesso && <MsgSucesso>{msgSucesso}</MsgSucesso>}
          </ColunistasBox>
        </ColunistasContainer>
      );
      // ...styled-components removidos de dentro da função...
    }
    if (menuSelecionado === "destaques") {
      if (mostrarListaDestaques) {
        return (
          <>
            <button
              onClick={() => setMostrarListaDestaques(false)}
              style={{
                marginBottom: 16,
                background: "#000",
                border: "none",
                borderRadius: 6,
                padding: "0.6rem 1.2rem",
                fontWeight: "bold",
                fontSize: "1rem",
                cursor: "pointer",
              }}
            >
              Voltar
            </button>
            <ListaNoticiasAdmin noticias={[]} />
          </>
        );
      }
      return (
        <div style={{ marginTop: 32 }}>
          <CardsAdmin
            onNovaNoticia={() => {}}
            onEditarNoticias={() => setMostrarListaDestaques(true)}
            onExcluirNoticias={() => {}}
            customCards={[
              {
                label: "Selecionar destaques",
                onClick: () => setMostrarListaDestaques(true),
              },
            ]}
          />
        </div>
      );
    }
    if (menuSelecionado === "patrocinadores") {
      if (mostrarFormPatro) {
        return (
          <>
            <button
              onClick={() => setMostrarFormPatro(false)}
              style={{
                marginBottom: 16,
                background: "#000",
                border: "none",
                borderRadius: 6,
                padding: "0.6rem 1.2rem",
                fontWeight: "bold",
                fontSize: "1rem",
                cursor: "pointer",
              }}
            >
              Voltar
            </button>
            <FormPatrocinador />
          </>
        );
      }
      if (mostrarListaEditarPatro) {
        return (
          <>
            <button
              onClick={() => setMostrarListaEditarPatro(false)}
              style={{
                marginBottom: 16,
                background: "#000",
                border: "none",
                borderRadius: 6,
                padding: "0.6rem 1.2rem",
                fontWeight: "bold",
                fontSize: "1rem",
                cursor: "pointer",
              }}
            >
              Voltar
            </button>
            <ListaNoticiasAdmin
              modo="editar"
              onVoltar={() => setMostrarListaEditarPatro(false)}
            />
          </>
        );
      }
      if (mostrarListaExcluirPatro) {
        return (
          <>
            <button
              onClick={() => setMostrarListaExcluirPatro(false)}
              style={{
                marginBottom: 16,
                background: "#000",
                border: "none",
                borderRadius: 6,
                padding: "0.6rem 1.2rem",
                fontWeight: "bold",
                fontSize: "1rem",
                cursor: "pointer",
              }}
            >
              Voltar
            </button>
            <ListaNoticiasAdmin
              modo="excluir"
              onVoltar={() => setMostrarListaExcluirPatro(false)}
            />
          </>
        );
      }
      return (
        <div style={{ marginTop: 32 }}>
          <CardsAdmin
            customCards={[
              {
                label: "Cadastrar Patrocinadores",
                onClick: () => setMostrarFormPatro(true),
              },
              {
                label: "Excluir Patrocinadores",
                onClick: () => setMostrarListaExcluirPatro(true),
              },
              {
                label: "Editar Patrocinadores",
                onClick: () => setMostrarListaEditarPatro(true),
              },
            ]}
          />
        </div>
      );
    }
    return <AdminWelcome />;
  }

  return (
    <AdminLayout>
      <AdminAsideMenu
        menuSelecionado={menuSelecionado}
        setMenuSelecionado={setMenuSelecionado}
      />
      <MainContent>
        <HeaderBar>
          <TituloPainel>Painel Administrativo</TituloPainel>
          <BotaoSair onClick={handleLogout}>Sair</BotaoSair>
        </HeaderBar>
        {renderContent()}
      </MainContent>
    </AdminLayout>
  );
}

// Styled Components para o layout do painel administrativo
const HeaderBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
`;

const TituloPainel = styled.h1`
  margin: 0;
  color: #000;
`;

const BotaoSair = styled.button`
  background: #c00;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 0.7rem 1.3rem;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #a00;
  }
`;

const Container = styled.div`
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.07);
  padding: 2rem;
  margin-top: 2rem;
`;
const Filtros = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  label {
    display: flex;
    flex-direction: column;
    font-weight: 500;
    gap: 0.3rem;
  }
  input,
  select {
    padding: 0.5rem;
    border-radius: 5px;
    border: 1px solid #ccc;
    font-size: 1rem;
  }
`;
const Lista = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;
// Styled Components para Colunistas
const VoltarButton = styled.button`
  margin-bottom: 16px;
  background: #000;
  border: none;
  border-radius: 6px;
  padding: 0.6rem 1.2rem;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  color: #fff;
`;

const ColunistasContainer = styled.div`
  margin-top: 32px;
`;

const ColunistasBox = styled.div`
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.07);
  padding: 2rem;
  margin-top: 32px;
`;

const ColunistasTitulo = styled.h2`
  color: #000;
`;

const NenhumColunistaMsg = styled.div`
  margin-top: 24px;
  color: #000;
  font-size: 1.1rem;
`;

const ColunistasLista = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ColunistaItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.7rem 0;
  border-bottom: 1px solid #eee;
`;

const CodNomeSpan = styled.span`
  color: #888;
  font-size: 14px;
`;

const CategoriasSpan = styled.span`
  color: #666;
  font-size: 13px;
  margin-left: 8px;
`;

const AcoesColunista = styled.span`
  display: flex;
  gap: 12px;
`;

const BotaoAcao = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${(props) => props.$color || "#222"};
  font-size: 20px;
`;

const MsgSucesso = styled.div`
  color: #080;
  margin-top: 16px;
  font-weight: bold;
`;