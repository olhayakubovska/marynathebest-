import styled from "styled-components";
import { H2 } from "../h2/h2";

const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Content = ({ children, error }) => {
  return error ? (
    <Div>
      <H2>Ошибка</H2>
      <div>{error}</div>
    </Div>
  ) : (
    children
  );
};

export default Content;
