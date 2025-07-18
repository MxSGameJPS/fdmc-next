import React from "react";
import styled from "styled-components";

export function AdminLayout({ children }) {
  return <LayoutContainer>{children}</LayoutContainer>;
}

export function MainContent({ children }) {
  return <MainArea>{children}</MainArea>;
}

const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
`;

const MainArea = styled.main`
  flex: 1;
  padding: 2.5rem 3rem;
  background: #f7f7f7;
  min-height: 100vh;
`;
