import styled from 'styled-components'

export const FooterContainer = styled.footer`
  background-color: ${props => props?.theme?.colors?.black};
  padding-bottom: 75px;
  padding-top: 80px;
`

export const GridContainerUm = styled.div`
  display: grid;
  grid-template-columns: 10% 50% 40%;
  grid-gap: 100px;
  background-color: ${props => props?.theme?.colors?.black};
  margin: 0 200px;

  @media (max-width: 900px) {
    margin: 0 100px;
    grid-template-columns: 10% 80%;
  }

  @media (max-width: 555px) {
    margin: 0 50px;
    grid-template-columns: 100%;
  }
`

export const GridContainerDois = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  grid-gap: 130px;
  background-color: ${props => props?.theme?.colors?.black};
  margin: 0 200px;

  @media (max-width: 900px) {
    margin: 0 100px;
    grid-gap: 25px;
    grid-template-columns: auto auto auto;
  }

  @media (max-width: 555px) {
    margin: 0 100px;
    grid-gap: 25px;
    grid-template-columns: 100;
  }
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
  line-height: 20px;
`

export const Block2 = styled.div`
  background-color: ${props => props?.theme?.colors?.black};
  display: flex;
  align-items: center;

  @media (max-width: 555px) {
    margin-top: -50px;
  }
`

export const Block3 = styled.div`
  background-color: ${props => props?.theme?.colors?.black};
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 70%;

  @media (max-width: 900px) {
    flex-direction: row;
    align-items: center;
    width: fit-content;
  }

  @media (max-width: 555px) {
    display: flex;
    flex-direction: column;
    margin-top: -50px;
  }
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

  @media (max-width: 900px) {
    display: flex;
    margin-left: 20px;
  }
`

export const Block4 = styled.div`
  background-color: ${props => props?.theme?.colors?.black};
`

export const BlockMunus = styled.ul``

export const ItemMenu = styled.li`
  color: ${props => props?.theme?.colors?.white};
  list-style: none;
  padding-top: 15px;
  cursor: pointer;
  font-size: 14px;
  font-weight: lighter;
`

export const Block5 = styled.div`
  background-color: ${props => props?.theme?.colors?.black};
`

export const Block6 = styled.div`
  background-color: ${props => props?.theme?.colors?.black};
`

export const InfosStore = styled.span`
  color: ${props => props?.theme?.colors?.white};
  line-height: 20px;
  font-size: 14px;
  font-weight: lighter;
`