import React from "react";
import styled from "styled-components";
export default function Notfound() {
  return <PageStyle>404 Page not Found !</PageStyle>;
}

const PageStyle = styled.div`
  text-align: center;
  font-size: 30px;
  min-height: 100vh;
  background: transparent;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
`;
