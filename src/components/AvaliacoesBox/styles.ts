import styled from 'styled-components'

export const ContainerAvaliacoes = styled.section`
  margin: 0 200px;
`

export const BoxContainerAvalietion = styled.div`
  align-items: center;
  justify-content: center;
  display: grid;
  grid-template-columns: 650px 650px;
  gap: 20px;
  padding: 10px;

  @media (max-width: 1355px) {
    grid-template-columns: 500px 500px;
  }

  @media (max-width: 1083px) {
    grid-template-columns: 350px 350px;
  }

  @media (max-width: 765px) {
    grid-template-columns: 250px 250px;
  }

  @media (max-width: 580px) {
    grid-template-columns: 300px;
  }
`

export const BoxAvaliacoes = styled.div`
  background-color: #d3d3d3;
  border: 1px solid ${props => props?.theme?.colors?.black};
  padding: 13px;
  display: flex;
  flex-direction: column;
  height: 100%;
`

export const NameClient = styled.span`
  color: ${props => props?.theme?.colors?.black};
  font-size: 20px;
  font-weight: 600;
  padding-bottom: 15px;
`

export const Box = styled.div`
  width: 80px;
  padding: 5px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
  border-radius: 5px;
`

export const PointPessimo = styled.span`
  color: red;
`

export const PointRuim = styled.span`
  color: purple;
`

export const PointBom = styled.span`
  color: orange;
`

export const PointOtimo = styled.span`
  color: blue;
`

export const PointExcelente = styled.span`
  color: green;
`

export const Description = styled.span`

`

export const DateAvaliacao = styled.span`
  margin-top: 15px;
  font-size: 12px;
`

export const ContainerPagination = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  justify-content: center;

  @media (max-width: 615px) {
    flex-direction: column;
  }
`

export const TotalBoxItems = styled.div`
  margin: 15px 5px;
`

export const TextTotal = styled.span`
  font-size: 12px;
  letter-spacing: 1px;
`

export const ContainerPage = styled.div`
  display: flex;
  justify-content: space-between;
`

export const Previus = styled.div`
  align-self: center;
`

export const ButtonPage = styled.button`
  margin: 0 15px;
  padding: 5px 10px;
  height: 30px;
  border: 0;
  background-color: ${props => props.theme.colors.info};
  font-weight: bold;
  font-size: 0.9rem;
  border-radius: 0.3rem;
  color: ${props => props.theme.colors.white};
  cursor: pointer;
`

export const TextPage = styled.span`
  margin: 0 10px;
  padding: 12px 10px;
  cursor: pointer;
  align-items: center;

  &:hover {
    background-color: ${props => props.theme.colors.info};
    border-radius: 0.3rem;
  }

  &:active {
    background-color: ${props => props.theme.colors.info};
    border-radius: 0.3rem;
  }
`

export const Next = styled.div`
  align-self: center;
`
