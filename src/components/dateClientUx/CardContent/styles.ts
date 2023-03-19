import styled from "styled-components";


export const Card = styled.section`
  margin: 40px 20px;
  padding: 30px;
  border-radius: 10px;
  border: 0;
  box-shadow: 0 0 5px ${(props) => props.theme.colors.black};
  background-color: ${(props) => props?.theme?.colors?.white};
`;