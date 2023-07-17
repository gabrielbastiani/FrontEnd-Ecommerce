import styled from 'styled-components';

export const ContainerContentProduct = styled.section`
  display: flex;
  justify-content: center;

  @media (max-width: 1118px) {
    flex-direction: column;
  }
`

export const ContainerContentProductExtra = styled.section`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`

export const ImagesProductContainer = styled.div`
  @media (max-width: 1290px) {
    margin-left: 50px;
  }
`

export const ProductContainer = styled.div`
  margin-top: 40px;

  @media (max-width: 1290px) {
    margin-right: 50px;
  }

  @media (max-width: 1118px) {
    margin-left: 50px;
  }

  @media (max-width: 281px) {
    margin-left: 10px;
    margin-right: 10px;
  }
`
