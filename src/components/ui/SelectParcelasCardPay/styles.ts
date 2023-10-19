import styled from "styled-components";

export const SelectItem = styled.select`
  height: 25px;
  margin-bottom: 30px;
  border: none;
  padding: 0 0.5rem;
  text-align: center;
  font-size: 17px;

  @media (max-width: 800px) {
    width: 100px;
  }
`;

export const Options = styled.option`
  font-size: 16px;
  background-color: ${(props) => props.theme.colors.white};
  color: ${(props) => props.theme.colors.black};
`;