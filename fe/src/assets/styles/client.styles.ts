import styled from "styled-components";

type Props = {
  backgroundColor: string;
};

export const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Button = styled.div<Props>`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 40px;
  color: white;
  font-size: 20px;
  font-weight: bold;
  margin: 20px;
  background-color: ${props => props.backgroundColor};
  border-radius: 5px;
`;
