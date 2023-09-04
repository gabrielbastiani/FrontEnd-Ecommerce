import styled from 'styled-components'

export const ButtonClose = styled.button``

export const ContainerContent = styled.section`
  width: 50vw;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  @media (max-width: 970px) {
    width: 60vw;
  }

  @media (max-width: 740px) {
    width: 80vw;
  }
`

export const ContainerNameProduct = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

export const BoxName = styled.div`
  background-color: ${props => props?.theme?.colors?.black};
  padding: 10px;
  width: 500px;
`

export const ProductName = styled.span`
  font-weight: bold;
  color: ${props => props?.theme?.colors?.white};
`

export const ContAvaliacao = styled.div`
  width: 100%;
`

export const SelectAvaliacao = styled.select`
  padding: 10px;
  border: 2px solid ${props => props?.theme?.colors?.info};
  border-radius: 5px;
  width: 100%;
  margin: 10px 0;
`

export const OpcoesAvaliacao = styled.option``

export const TextAreaAvaliacao = styled.textarea`
  resize: none;
  padding: 10px;
  height: 150px;
  border: 2px solid ${props => props?.theme?.colors?.info};
  border-radius: 5px;
  margin: 10px 0;
`
