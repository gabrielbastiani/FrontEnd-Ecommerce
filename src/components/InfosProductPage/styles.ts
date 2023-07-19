import styled from 'styled-components'

export const ContatinerInfosProduct = styled.div`
  background-color: ${props => props?.theme?.colors?.white};
  margin: 4px;
  padding: 45px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

  a {
    color: ${props => props?.theme?.colors?.black};
    font-size: 13px;
  }
`

export const BlockProductNames = styled.div`
  width: 550px;

  @media (max-width: 636px) {
    width: 350px;
  }

  @media (max-width: 490px) {
    width: 250px;
  }

  @media (max-width: 410px) {
    width: 150px;
  }
`

export const BoxContentproduct = styled.div`
  display: flex;
  flex-direction: column;
`

export const BoxHeartFavorite = styled.div`
  display: flex;
  justify-content: flex-end;
`

export const TextSku = styled.span`
  color: ${props => props?.theme?.colors?.gray};
  font-size: 13px;
`

export const TextNameProduct = styled.h1`
  margin: 15px 0;
`

export const ButtonAvalieProduct = styled.button`
  background: transparent;
  border: none;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  margin-bottom: 20px;
`

export const TextAvalie = styled.span`
  margin: 0 5px;
`

export const ContainerAttributes = styled.div`
  margin-bottom: 40px;
`

export const Attribute = styled.button`
  cursor: pointer;
  border: none;
  background-color: ${props => props?.theme?.colors?.black};
  color: ${props => props?.theme?.colors?.white};
  padding: 5px;
  margin-right: 16px;
`

export const AttributeNoProduct = styled.span`
  border: none;
  background-color: ${props => props?.theme?.colors?.black};
  color: ${props => props?.theme?.colors?.white};
  padding: 3px;
  margin-right: 16px;
`

export const TextPrice = styled.span`
  text-decoration: line-through;
  font-size: 13px;
  font-size: 0.8125rem;
  line-height: 30px;
  margin: 0;
  height: inherit;
`

export const TextPromotion = styled.span`
  font-size: 22px;
  font-size: 1.375rem;
  line-height: 30px;
  font-weight: bold;
`

export const TextCredit = styled.span`
  font-size: 12px;
`

export const ButtonContraProposta = styled.button`
  border: none;
  background-color: ${props => props?.theme?.colors?.black};
  color: ${props => props?.theme?.colors?.white};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px;
  width: 350px;
  margin: 13px 0;

  svg {
    margin-right: 10px;
  }

  @media (max-width: 470px) {
    width: 238px;
  }

  @media (max-width: 394px) {
    width: 200px;
  }
`

export const BoxAddCart = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  height: 40px;
  margin-top: 10px;
`

export const BoxCart = styled.div`
  display: flex;
  border: 1px solid;
  margin-right: 10px;
  width: calc(40% - 10px);
`

export const TextMin = styled.span`
  display: block;
  width: 33.33%;
  line-height: 40px;
  text-align: center;
  color: #838282;
  cursor: pointer;
`

export const TextQuantidade = styled.span`
  display: block;
  width: 33.33%;
  line-height: 40px;
  text-align: center;
  color: #838282;
`

export const TextMax = styled.span`
  display: block;
  width: 33.33%;
  line-height: 40px;
  text-align: center;
  color: #838282;
  cursor: pointer;
`

export const ButtonAddCArtProduct = styled.button`
  letter-spacing: 1px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60%;
  text-align: center;
  background-color: ${props => props?.theme?.colors?.warning};
  color: ${props => props?.theme?.colors?.white};
  line-height: 40px;
  font-size: 15px;
  cursor: pointer;
  -webkit-transition: opacity 0.5s ease-in-out;
  -moz-transition: opacity 0.5s ease-in-out;
  -ms-transition: opacity 0.5s ease-in-out;
  -o-transition: opacity 0.5s ease-in-out;
  transition: opacity 0.5s ease-in-out;
  opacity: 1;

  :hover {
    opacity: 0.7;
  }

  @media (max-width: 1133px) {
    font-size: 10px;
  }

  @media (max-width: 419px) {
    line-height: 12px;
  }
`

export const BoxContentFrete = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0;
  width: 100%;

  svg {
    cursor: pointer;

    @media (max-width: 460px) {
      margin-top: 17px;
    }
  }

  @media (max-width: 460px) {
    flex-direction: column;
  }
`

export const TextStock = styled.span`
  color: ${props => props?.theme?.colors?.warning};
`

export const TextFrete = styled.span``

export const InputCalculoFrete = styled.input`
  padding: 10px;
  margin-left: 10px;
`
