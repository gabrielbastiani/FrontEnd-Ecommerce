import styled from 'styled-components'

export const FooterContainer = styled.footer`
    background-color: ${props => props?.theme?.colors?.black};
`

export const GridContainerUm = styled.div`
  display: grid;
  grid-template-columns: 10% 50% 40%;
  grid-gap: 100px;
  background-color: ${props => props?.theme?.colors?.black};
  padding: 0 200px;
`

export const GridContainerDois = styled.div`
  display: grid;
  grid-template-columns: auto auto auto auto;
  grid-gap: 130px;
  background-color: ${props => props?.theme?.colors?.black};
  padding: 0 200px;
`

export const Block1 = styled.div`
  background-color: ${props => props?.theme?.colors?.black};
  display: flex;
  align-items: center;
  justify-content: center;
`

export const BoxLogo = styled.figure``

export const TextInstitucional = styled.span`
  color: ${props => props?.theme?.colors?.white};
  font-size: 13px;
`

export const Block2 = styled.div`
  background-color: ${props => props?.theme?.colors?.black};
  display: flex;
  align-items: center;
  
`

export const Block3 = styled.div`
  background-color: ${props => props?.theme?.colors?.black};
  display: flex;
  justify-content: center;
  flex-direction: column;
`

export const SubTitulo = styled.h3`
  color: ${props => props?.theme?.colors?.white};
`

export const BlockRedes = styled.div`
  padding-top: 15px;

  svg {
    padding: 15px;
    border: solid 2px ${props => props?.theme?.colors?.white};
    cursor: pointer;
  }
`

export const Block4 = styled.div`
  background-color: ${props => props?.theme?.colors?.black};
`

export const BlockMunus = styled.ul`

`

export const ItemMenu = styled.li`
    color: ${props => props?.theme?.colors?.white};
    list-style: none;
    padding-top: 15px;
`

export const Block5 = styled.div`
  background-color: ${props => props?.theme?.colors?.black};
`

export const Block6 = styled.div`
  background-color: ${props => props?.theme?.colors?.black};
`

export const Block7 = styled.div`
  background-color: ${props => props?.theme?.colors?.black};
`