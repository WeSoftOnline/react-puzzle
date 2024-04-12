import { styled } from "styled-components";
import Piece from "../piece/index.styled.js";

export const Container = styled.div`
  width: 100%;

  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-wrap: wrap;
`;

export const ButtonShuffle = styled.button`
  margin: 16px 0 0 0;
`;

const Root = styled.div`
  width: 100%;
  overflow-x: auto;
  margin: 32px auto 64px auto;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  ${Piece} {
    margin: 8px;
  }
`;

export default Root;
