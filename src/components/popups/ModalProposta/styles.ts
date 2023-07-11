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

export const ContatinerProposal = styled.div`
  width: 100%;
`

export const TextAreaAvaliacao = styled.textarea`
  resize: none;
  padding: 10px;
  height: 50px;
  border: 2px solid ${props => props?.theme?.colors?.info};
  border-radius: 5px;
  margin: 10px 0;
`
