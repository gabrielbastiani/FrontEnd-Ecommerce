import styled from 'styled-components'

export const ContainerCenterThanks = styled.div`
  height: 130vh;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${props => props?.theme?.colors?.gray};
`

export const NumberOrder = styled.h1`
  font-size: 45px;
`

export const TextThanks = styled.span``

export const StrongThanks = styled.strong``

export const ButtonThanks = styled.button`
  margin: 18px;
  padding: 10px;
  background-color: ${props => props?.theme?.colors?.warning};
  color: ${props => props?.theme?.colors?.white};
  font-weight: 700;
  border: none;
`

export const BoxPix = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  margin-top: 10px;
`

export const InputPix = styled.input`
  padding: 8px;
  margin-right: 5px;
  width: 60%;
`

export const ButtonPix = styled.button`
  background: none;
  border: none;
`

export const BoxInstructions = styled.div`
  display: flex;
  flex-direction: column;
`

export const TextInstruction = styled.span`
  margin-bottom: 10px;
`
