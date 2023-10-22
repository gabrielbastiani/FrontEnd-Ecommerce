import styled from 'styled-components'

export const ContainerContent = styled.div`
  text-align: center;
  justify-content: center;
  align-items: center;
  border-radius: 3%;
  z-index: 9999999999;
`

export const ButtonClose = styled.button``

export const TextError = styled.h2`
  color: ${props => props?.theme?.colors?.white};
`
