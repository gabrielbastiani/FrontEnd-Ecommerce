import styled from 'styled-components'

export const SectionPage = styled.section`
  margin: 0 150px;

  @media (max-width: 600px) {
    margin: 0 50px;
  }
`

export const EtiquetaContato = styled.label``

export const InputContact = styled.input`
  width: 550px;
  height: 40px;
  border: 0;
  border-radius: 0.5rem;
  background-color: ${props => props?.theme?.colors?.white};
  color: ${props => props?.theme?.colors?.black};
  border: 1px solid #ff6700;
  padding: 1rem;

  @media (max-width: 725px) {
    width: 350px;
  }

  @media (max-width: 430px) {
    width: 250px;
  }
`

export const SelectSector = styled.select`
  width: 550px;
  height: 40px;
  border: 0;
  border-radius: 0.5rem;
  background-color: ${props => props?.theme?.colors?.white};
  color: ${props => props?.theme?.colors?.black};
  border: 1px solid #ff6700;

  @media (max-width: 725px) {
    width: 350px;
  }

  @media (max-width: 430px) {
    width: 250px;
  }
`

export const OpcoesSector = styled.option``

export const MessageArea = styled.textarea`
  resize: none;
  padding: 10px;
  height: 200px;
  border: 2px solid ${props => props?.theme?.colors?.info};
  border-radius: 5px;
  margin: 10px 0;
  width: 550px;

  @media (max-width: 725px) {
    width: 350px;
  }

  @media (max-width: 430px) {
    width: 250px;
  }
`

export const ContentBox = styled.div``
