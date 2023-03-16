import styled from 'styled-components'

export const ContainerCenter = styled.div`
  height: 100vh;
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${props => props?.theme?.colors?.gray};
`

export const ContLogin = styled.div`
  margin-top: 2rem;
  width: 1300px;
  display: flex;
  align-items: center;
  padding: 2rem 1.5rem;
  background-color: ${props => props?.theme?.colors?.white};

  @media (max-width: 620px) {
    width: 90%;
  }
`

export const BoxTop = styled.div``

export const RadioBotton = styled.input`
  margin-right: 5px;
`

export const TextCadastro = styled.span`
  ${props => props?.theme?.colors?.black};
`

export const FormularioCadastro = styled.form``

export const Etiqueta = styled.label`
  margin-right: 11px;
`

export const BoxRadios = styled.div`
  display: flex;
  flex-direction: row-reverse;
  justify-content: flex-end;
  margin-top: 30px;
  margin-bottom: 50px;
`