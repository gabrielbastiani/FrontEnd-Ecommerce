import styled from "styled-components";

export const InputText = styled.input`
  margin-bottom: 1rem;
  height: 30px;
  border-radius: 0.5rem;
  background-color: transparent;
  color: ${(props) => props?.theme?.colors?.black};
  padding: 0.5rem;
  border: 1px solid #ff6700;
  font-weight: bold;
  font-size: 1rem;
  display: flex;
`;

export const ButtonUpdate = styled.button`
  background-color: transparent;
  display: flex;
  margin: 0 15px;
  border: none;

  svg {
    background-color: yellow;
    padding: 4px;
    font-size: 25px;
    border-radius: 25%;
    cursor: pointer;
  }
`;

export const ButtonExit = styled.button`
  background-color: transparent;
  display: flex;
  margin: 0 2px 13px;
  border: none;

  svg {
    background-color: red;
    padding: 4px;
    font-size: 25px;
    border-radius: 25%;
    cursor: pointer;
  }
`;

export const ButtonConfirm = styled.button`
  background-color: transparent;
  display: flex;
  margin: 0 12px 13px;
  border: none;

  svg {
    background-color: #00ff00;
    padding: 4px;
    font-size: 25px;
    border-radius: 25%;
    cursor: pointer;
  }
`;

export const EditBox = styled.div`
  display: flex;
  align-items: center;
`;

export const ValueText = styled.span`
  color: ${(props) => props?.theme?.colors?.black};
`;