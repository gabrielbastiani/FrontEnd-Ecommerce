import styled from 'styled-components'

export const SectionCart = styled.section`
  display: flex;
  justify-content: center;

  @media (max-width: 1108px) {
    flex-direction: column;
    align-items: center;
  }
`

export const ContainerProduct = styled.div`
  width: 1000px;

  @media (max-width: 1333px) {
    width: 800px;
  }

  @media (max-width: 816px) {
    display: contents;
  }
`

export const ContainerData = styled.div`
  width: 400px;
  background-color: ${props => props?.theme?.colors?.white};
  margin: 30px;
  padding: 25px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  display: flex;
  flex-direction: column;

  @media (max-width: 438px) {
    width: 300px;
  }
`

export const TextCep = styled.span``

export const InputCep = styled.input`
  padding: 10px;
  margin: 15px 0;
`

export const ButtonCep = styled.button`
  background-color: ${props => props?.theme?.colors?.warning};
  padding: 10px;
  margin: 10px;
  color: ${props => props?.theme?.colors?.white};
  border: none;
`

export const BoxCep = styled.div``

export const BoxCupom = styled.div`
  display: flex;
  align-items: center;
`

export const InputCupom = styled.input`
  padding: 10px;
  margin: 15px 0;
`

export const ButtonCupom = styled.button`
  background-color: ${props => props?.theme?.colors?.warning};
  padding: 10px;
  margin: 10px;
  color: ${props => props?.theme?.colors?.white};
  border: none;
`

export const BoxFinalCart = styled.div`
  display: flex;
  flex-direction: column;
`

export const ButtonFinal = styled.button`
  background: none;
  border: none;
`

export const SubTotal = styled.strong``

export const Total = styled.strong``

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

  @media (max-width: 816px) {
    width: 500px;
    flex-direction: column;
  }

  @media (max-width: 545px) {
    width: 300px;
  }
`

export const ImageProductCart = styled.div``

export const BoxDataProduct = styled.div`
  margin: 0 20px;
  width: 800px;

  @media (max-width: 1333px) {
    width: 500px;
  }

  @media (max-width: 545px) {
    width: 200px;
    display: flex;
  }
`

export const BoxDelete = styled.div`
  @media (max-width: 816px) {
    margin: 10px;
  }
`

export const BoxData = styled.div`
  display: flex;
  flex-direction: column;

  @media (max-width: 816px) {
    align-items: center;
  }
`

export const BoxQuantidadeCart = styled.div`
  @media (max-width: 816px) {
    margin: 10px;
  }
`

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

  @media (max-width: 816px) {
    margin: 10px;
    align-items: center;
  }
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

export const ContainerFrete = styled.div`
  margin-bottom: 15px;
  border: 2px solid gray;
  padding: 8px;
`

export const BoxFrete = styled.div`
  display: flex;
  flex-direction: column;
`

export const ErrorText = styled.span`
  color: red;
`

export const TextFrete = styled.span`
  padding: 5px;
`

export const TextStrong = styled.strong``

export const ValuesMore = styled.span`
  font-size: 13px;
  color: red;
`

export const More = styled.strong`
  color: red;
`

export const TextSemFrete = styled.span`
  font-size: 11px;
  color: red;
`

export const LabelCancelar = styled.label`
  display: contents;
  font-size: 12px;
  cursor: pointer;
`