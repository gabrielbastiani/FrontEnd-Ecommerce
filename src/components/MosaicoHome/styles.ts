import styled from 'styled-components'

export const ContainerGaleria = styled.section`
  justify-content: center;
  align-items: center;
  display: flex;
  width: 100%;

  @media (max-width: 932px) {
    flex-direction: column;
  }

  @media (max-width: 475px) {
    margin-top: -110px;
  }
`

export const ItemGaleria1 = styled.div`
  max-width: 539px;
  margin: 2px;

  @media (max-width: 1265px) {
    max-width: 450px;
  }

  @media (max-width: 932px) {
    flex-direction: column;
    margin-bottom: -70px;
  }

  @media (max-width: 485px) {
    max-width: 320px;
    margin-bottom: -2px;
  }

  img {
    object-fit: fill;
    width: 100%;
  }
`

export const ItemGaleria2 = styled.div`
  max-width: 539px;
  margin: 2px;

  @media (max-width: 1265px) {
    max-width: 450px;
  }

  @media (max-width: 485px) {
    max-width: 320px;
  }

  img {
    object-fit: fill;
    width: 100%;
  }
`

export const ContainerGaleriaBotton = styled.section`
  justify-content: center;
  align-items: center;
  display: flex;
  width: 100%;

  @media (max-width: 932px) {
    flex-direction: column;
  }

  @media (max-width: 475px) {
    margin-top: -2px;
  }
`

export const ItemGaleriaBotton1 = styled.div`
  max-width: 858px;
  margin: 2px;

  @media (max-width: 1265px) {
    max-width: 605px;
  }

  @media (max-width: 932px) {
    flex-direction: column;
    max-width: 450px;
  }

  @media (max-width: 485px) {
    max-width: 330px;
  }

  img {
    object-fit: fill;
    width: 100%;
  }
`

export const ItemGaleriaBotton2 = styled.div`
  max-width: 440px;
  margin: 2px;

  @media (max-width: 1265px) {
    max-width: 300px;
  }

  @media (max-width: 932px) {
    max-width: 450px;
  }

  @media (max-width: 485px) {
    max-width: 330px;
  }

  img {
    object-fit: fill;
    width: 100%;
  }
`