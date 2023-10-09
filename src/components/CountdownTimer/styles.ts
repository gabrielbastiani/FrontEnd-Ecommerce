import styled from 'styled-components'

export const SectionTimeDown = styled.section`
  background-color: ${props => props?.theme?.colors?.black};
  padding-top: 50px;
  padding-bottom: 50px;
  margin-bottom: -100px;
`

export const BoxInfosPromotion = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

export const Titulo = styled.h1`
  color: ${props => props?.theme?.colors?.white};
  font-style: oblique;
  font-size: 35px;

  @media (max-width: 755px) {
    font-size: 25px;
  }

  @media (max-width: 585px) {
    font-size: 18px;
  }
`

export const ContainerTimeDown = styled.div`
  display: flex;
  justify-content: center;
  box-shadow: inset 0px -32px 33px -20px #ababab;
  border-radius: 0px 0px 80px 80px;

  @media (max-width: 585px) {
    flex-direction: column;
  }
`

export const ContainerCountDown = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 15px;
`

export const TextTimer = styled.span`
  color: ${props => props?.theme?.colors?.white};
  font-size: 25px;
  font-weight: 600;

  @media (max-width: 755px) {
    font-size: 19px;
  }
`

export const DataText = styled.span`
  color: ${props => props?.theme?.colors?.white};
  margin-top: 10px;
  font-size: 33px;
  font-weight: 800;

  @media (max-width: 755px) {
    font-size: 19px;
  }
`

export const BoxArrow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 20px;

  @media (max-width: 585px) {
    display: none;
  }
`

export const ButtonPromo = styled.button`
  background-color: red;
  color: ${props => props?.theme?.colors?.white};
  padding: 19px;
  font-size: 20px;
  font-weight: 700;
  border-radius: 10px;
  margin-top: 50px;
  border: none;
`
