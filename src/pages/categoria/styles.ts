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

export const ButtonFilterMobile = styled.button`
  display: none;
  background-color: ${props => props?.theme?.colors?.black};
  color: ${props => props?.theme?.colors?.white};
  position: fixed;
  left: 50%;
  bottom: 3vh;
  width: 95vw;
  height: 50px;
  z-index: 999;
  transform: translateX(-50%);
  letter-spacing: 1px;

  svg {
    background: ${props => props?.theme?.colors?.black};
  }

  @media (max-width: 1158px) {
    display: block;
  }
`