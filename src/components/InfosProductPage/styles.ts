import styled from 'styled-components'

export const ContatinerInfosProduct = styled.div`
  background-color: ${props => props?.theme?.colors?.white};
  margin: 4px;
  padding: 45px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`

export const BoxContentproduct = styled.div`
  display: flex;
  flex-direction: column;
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
  font-weight: 500;
`

export const TextCredit = styled.span``

export const ButtonContraProposta = styled.button``

export const BoxAddCart = styled.div``

export const BoxCart = styled.div``

export const TextMin = styled.span``

export const TextQuantidade = styled.span``

export const TextMax = styled.span``

export const ButtonAddCArtProduct = styled.button``

export const TextFrete = styled.span``

export const InputCalculoFrete = styled.input``
