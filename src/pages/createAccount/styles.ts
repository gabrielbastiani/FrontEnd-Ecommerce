import styled from 'styled-components'

export const ContainerCenter = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${props => props?.theme?.colors?.gray};
`

export const ContLogin = styled.div`
  margin-top: 2rem;
  margin-bottom: 50px;
  width: 80%;
  display: flex;
  align-items: center;
  padding: 2rem 1.5rem;
  background-color: ${props => props?.theme?.colors?.white};

  @media (max-width: 620px) {
    width: 90%;
  }
`

export const BoxTop = styled.div`
  width: 85%;

  @media (max-width: 580px) {
    width: 95%;
  }
`

export const RadioBotton = styled.input`
  margin-right: 5px;
`

export const TextCadastro = styled.span`
  ${props => props?.theme?.colors?.black};
`

export const CadastroPessoaFisica = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  align-items: center;
  margin-top: 30px;

  @media (max-width: 580px) {
    grid-template-columns: auto;
  }
`

export const BlockInputs = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 20px;
`

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

export const SelectGenero = styled.select`
  padding: 5px;
  border-radius: 10px;
`;

export const OpcoesGenero = styled.option`

`;

export const EtiquetaInput = styled.label`
  font-weight: 600;
  padding-bottom: 5px;
`;

export const BoxNews = styled.div`
  display: flex;
  flex-direction: row-reverse;
  justify-content: flex-end;
  margin-top: 30px;
  margin-bottom: 50px;
`

export const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  width: 100%;
`

export const DataAddress = styled.span`
  margin-bottom: 18px;
`