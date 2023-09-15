import styled from 'styled-components'

export const SectionPayment = styled.section`
  margin-top: 45px;
`

export const ContainerFechamento = styled.div`
  display: grid;
  grid-template-columns: 30% 30% 30%;
  justify-content: center;
`

export const BoxPayment = styled.div`
  padding: 18px;
  margin: 8px 15px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`

export const BoxTitle = styled.h3`
  color: ${props => props?.theme?.colors?.black};
  margin-bottom: 10px;
`

export const Datas = styled.span`
  color: ${props => props?.theme?.colors?.black};
  padding-left: 10px;
`

export const BoxData = styled.div`
  display: flex;
  align-items: center;
  margin: 7px 0;
`

export const BoxButtonsData = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 25px;
`

export const ButtonsData = styled.button`
  background-color: ${props => props?.theme?.colors?.info};
  color: ${props => props?.theme?.colors?.black};
  padding: 7px;
  font-weight: 600;
  border: none;
`

export const BoxDelivery = styled.div`
  display: flex;
  flex-direction: column;
`

export const EditDelivery = styled.button`
  border: none;
  background: transparent;
  margin-top: 20px;

  svg {
    margin: 0 5px;
  }
`

export const BoxButtons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const DestinyName = styled.span`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 10px;
`

export const AddressTextIcon = styled.span`
  display: flex;
  align-items: center;
  margin-bottom: 5px;

  svg {
    margin-right: 8px;
  }
`

export const TextCurrent = styled.span`
  margin-bottom: 5px;
`

export const TextCurrentBold = styled.strong``

export const BoxButtonsFunctions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const TextCurrentInput = styled.span`
  display: flex;
  align-items: center;
  margin-bottom: 5px;

  svg {
    margin-right: 8px;
  }
`

export const ButtonDelivery = styled.button`
  border: none;
  width: 60%;
  background-color: ${props => props?.theme?.colors?.info};
  color: ${props => props?.theme?.colors?.black};
  padding: 7px;
  font-weight: 600;
  margin: 7px 0;
`
export const BoxInputs = styled.div`
  display: flex;
  align-items: center;
`

export const InputDelivery = styled.input`
  padding: 5px;
`

export const BackButton = styled.button`
  background: transparent;
  border: none;
  display: flex;
  align-items: center;
  color: ${props => props?.theme?.colors?.black};
  font-weight: 600;
  margin-bottom: 20px;

  svg {
    margin-right: 8px;
  }
`

export const BoxDeliverySelected = styled.div`
  display: flex;
  flex-direction: column;
  border: 2px solid ${props => props?.theme?.colors?.gray};
  margin-bottom: 14px;
  padding: 15px;
`

export const BoxProductPayment = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const BoxDataProductPayment = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 8px;
  width: 50%;
  margin-bottom: 35px;
`

export const AmountProduct = styled.small`
  font-size: 12px;
  padding-bottom: 5px;
`

export const BoxPricesPayment = styled.div`
  display: flex;
  flex-direction: column;
`

export const ImageProductPayment = styled.div``

export const BoxCupomPayment = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #e8e8e8;
  padding: 15px;
  border-radius: 15px;
  box-shadow: 0 4px 8px 0 rgba(255, 215, 0), 0 6px 20px 0 rgba(255, 215, 0);
`

export const TextCupom = styled.span`
  margin-bottom: 8px;
  font-size: 12px;
`

export const TextCupomStrong = styled.strong`
  font-size: 13px;
`

export const BoxCupom = styled.div`
  display: flex;
  flex-direction: column;
`

export const ButtonRemove = styled.button`
  background-color: ${props => props?.theme?.colors?.warning};
  color: ${props => props?.theme?.colors?.white};
  border: none;
  font-weight: 600;
  padding: 4px;
`

export const DeliverySpan = styled.span`
  color: ${props => props?.theme?.colors?.black};
`

export const Days = styled.strong`
  color: ${props => props?.theme?.colors?.warning};
`

export const BoxIconsPayment = styled.div`
  display: flex;
  justify-content: space-around;
`

export const PayIcon = styled.button`
  background: none;
  border: none;
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  font-size: 17px;
  font-weight: 700;
  padding: 10px;
  border-radius: 20%;

  img {
    cursor: pointer;
  }
`

export const FormPayment = styled.form`
  
`

export const LabelForm = styled.label`
  font-weight: bold;
`

export const SelectFormPay = styled.select`
  padding: 5px;
`