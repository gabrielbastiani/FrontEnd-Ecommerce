import styled from 'styled-components';

export const ContainerOrder = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 40px 0;

  @media (max-width: 782px) {
    margin-left: 30px;
    margin-right: 30px;
  }

  @media (max-width: 510px) {
    flex-direction: column;
  }
`

export const BoxOrder = styled.div``

export const SelectOrder = styled.select`
  margin-right: 15px;
  padding: 10px;
`

export const OpcoesOrders = styled.option``

export const ButtonOrder = styled.button`
  padding: 10px;
  background-color: ${props => props?.theme?.colors?.info};
  font-weight: 700;
  border: solid 2px ${props => props?.theme?.colors?.gray};
`

export const TotalBox = styled.div`

  @media (max-width: 510px) {
    margin-bottom: 10px;
  }
`

export const TextTotal = styled.span``
