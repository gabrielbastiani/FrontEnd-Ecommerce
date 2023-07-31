import styled from 'styled-components'

export const SectionCart = styled.section`
  display: flex;
  justify-content: center;
`

export const ContainerProduct = styled.div`
  width: 1000px;
`

export const ContainerData = styled.div`
  width: 400px;
  background-color: ${props => props?.theme?.colors?.white};
  margin: 30px;
  padding: 15px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  display: flex;
  flex-direction: column;
`

export const TextCep = styled.span`

`

export const InputCep = styled.input`

`

export const ButtonCep = styled.button`

`

export const BoxCep = styled.div`

`

export const BoxCupom = styled.div`

`

export const InputCupom = styled.input`

`

export const ButtonCupom = styled.button`

`

export const BoxFinalCart = styled.div`
    display: flex;
    flex-direction: column;
`

export const ButtonFinal = styled.button`

`

export const SubTotal = styled.strong`

`

export const Total = styled.strong`

`

export const BoxPricesFinal = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 10px 0;
`

export const BoxProductCart = styled.div`
  background-color: ${props => props?.theme?.colors?.white};
  margin: 30px;
  padding: 15px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  display: flex;
  align-items: center;
`

export const ImageProductCart = styled.div``

export const BoxDataProduct = styled.div`
  margin: 0 20px;
  width: 800px;
`

export const BoxDelete = styled.div``

export const BoxData = styled.div`
  display: flex;
  flex-direction: column;
`

export const BoxQuantidadeCart = styled.div``

export const BoxPriceProductCart = styled.div``

export const PriceProduct = styled.span``

export const BoxPricesTotalProduct = styled.div`
  display: flex;
  margin: 0 20px;
`

export const BoxPrices = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`

export const PriceProductData = styled.strong`
  margin-bottom: 5px;
`

export const ConditionPrices = styled.span`
  font-size: 13px;
`

export const NameProduct = styled.strong`
  margin-bottom: 8px;
`

export const AtributeProduct = styled.span`
  font-size: 13px;
`

export const QuantidadeProductCart = styled.div`
  display: flex;
  border: 1px solid;
  width: 80px;
  margin: 0 20px;
`

export const MinCart = styled.button`
  display: block;
  width: 33.33%;
  line-height: 40px;
  text-align: center;
  color: #838282;
  cursor: pointer;
`

export const ValueQuantCart = styled.span`
  display: block;
  width: 33.33%;
  line-height: 40px;
  text-align: center;
  color: #838282;
`

export const MaxCart = styled.button`
  display: block;
  width: 33.33%;
  line-height: 40px;
  text-align: center;
  color: #838282;
  cursor: pointer;
`
