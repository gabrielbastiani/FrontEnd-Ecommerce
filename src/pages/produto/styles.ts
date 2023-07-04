import styled from 'styled-components'

export const ContainerContentProduct = styled.section`
  display: flex;
  justify-content: center;

  @media (max-width: 1118px) {
    flex-direction: column;
  }
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
`