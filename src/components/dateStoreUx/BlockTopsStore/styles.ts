import styled from "styled-components";

export const BlockTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  @media (max-width: 440px) {
    flex-direction: column;
  }
`;