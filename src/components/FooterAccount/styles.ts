import styled from 'styled-components'

export const FooterContainer = styled.footer`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  padding: 15px 0;
  background-color: ${props => props?.theme?.colors?.white};
  margin-bottom: 50px;
`

export const ContentFooter = styled.div`
  margin-top: 60px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;

  @media (max-width: 620px) {
    flex-direction: column;
  }
`
export const LinhaDivisoria = styled.hr`
  margin: 45px auto;
  width: 82%;
  height: 2px;
  background: ${props => props?.theme?.colors?.gray};
  color: ${props => props?.theme?.colors?.gray};
  font-size: 20px;
  margin-top: 46px;
  margin-bottom: 46px;
`

export const BlockPayments = styled.div`
  display: flex;

  @media (max-width: 1022px) {
    img {
      width: 300px;
    }
  }
`

export const BlockSecuryty = styled.div`
  display: flex;

  @media (max-width: 1022px) {
    img {
      width: 300px;
    }
  }
`

export const BlockDataContent = styled.div`
  display: flex;
`

export const BlockDateLoja = styled.div`
  display: flex;
  margin: auto 150px;

  @media (max-width: 510px) {
    margin: auto 40px;
  }
`

export const DateLoja = styled.span`
  
`