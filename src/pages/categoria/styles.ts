import styled from 'styled-components'

export const Filtros = styled.div`
  margin-bottom: 20px;
`

export const TextFilter = styled.span`
  font-size: 20px;
`

export const ButtonFilter = styled.button`
  background-color: ${props => props?.theme?.colors?.black};
  border: none;
  color: ${props => props?.theme?.colors?.white};
  width: 60%;
  padding: 10px;
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 1px;
  border-radius: 5px;
`
