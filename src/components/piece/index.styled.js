import { styled } from "styled-components";

export const Image = styled.div`
  width: 100%;
  height: 100%;
  background-image: ${({ background_image }) => background_image};
  background-size: ${({ background_size }) => background_size};
  background-position: ${({ background_position }) => background_position};
  background-origin: border-box;
  background-repeat: no-repeat;
`;

const Root = styled.div`
  width: ${({ size }) => size.width}px;
  height: ${({ size }) => size.height}px;
  background-color: #0003;
  margin: 1px;
`;

export default Root;
