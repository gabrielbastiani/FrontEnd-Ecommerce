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

export const DataDelivery = styled.span``

export const EditDelivery = styled.button`
  border: none;
  background: transparent;
  margin-top: 20px;

  svg {
    margin: 0 5px;
  }
`