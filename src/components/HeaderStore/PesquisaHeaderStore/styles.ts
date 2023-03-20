import styled from "styled-components";

export const InputSearch = styled.input`
  height: 38px;
  background: transparent;
  padding: 8px 15px;
  border: 1px solid ${props => props?.theme?.colors?.info};
  font-size: 1rem;
  border-radius: 5px;
  width: 100%;
`;