import styled from 'styled-components'

export const ContainerHeaderStore = styled.header`
  display: flex;
  justify-content: center;
  background-color: ${props => props?.theme?.colors?.black};
  width: 100%;
  padding: 15px 0;
`

export const ContentHeaderStore = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;

  @media (max-width: 542px) {
    flex-direction: column;
    padding: 20px 0;

    img {
      margin: 20px;
    }
  }
`
export const StyledUl = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
`

export const StyledLi = styled.li`
  float: left;
`

export const SmallText = styled.small`

`

export const Dropbtn = styled.div`
  display: inline-block;
  color: ${props => props?.theme?.colors?.white};
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
`

export const DropDownContent = styled.div`
  padding: 20px;
  display: none;
  position: absolute;
  background-color: ${props => props?.theme?.colors?.white};
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
`

export const BlockContact = styled.div`
  a {
    color: ${props => props?.theme?.colors?.black};
    font-size: 16px;
  }
`

export const FontStrong = styled.strong``

export const ButtonAtentimento = styled.button`
  background-color: ${props => props?.theme?.colors?.warning};
  color: ${props => props?.theme?.colors?.white};
  padding: 10px;
  border-radius: 10px;
  font-weight: 800;
  width: 100%;
  margin-bottom: 20px;
`

export const ButtonContact = styled.button`
  background: transparent;
  border: solid 2px ${props => props?.theme?.colors?.black};
  padding: 10px;
  border-radius: 10px;
  font-weight: 800;
  width: 100%;
`

export const TitleContac = styled.span`
  color: ${props => props?.theme?.colors?.black};
  font-weight: 900;
`

export const TextContent = styled.span`
  color: ${props => props?.theme?.colors?.black};
  display: block;
  text-align: left;
  margin-top: 15px;
  display: flex;
`

export const DropDownLi = styled(StyledLi)`
  display: inline-block;

  &:hover ${DropDownContent} {
    display: block;
  }
`

export const StyledA = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  color: ${props => props?.theme?.colors?.white};
  text-align: center;
  margin: auto 50px;

  svg {
    margin: auto 5px;
  }
`

export const BlockLogo = styled.div`
  display: flex;
  width: 35%;
  align-items: center;

  input {
    margin-left: 50px;
  }
`

export const BlockItems = styled.div`
  display: flex;

  a {
    color: ${props => props?.theme?.colors?.white};
    display: flex;
    align-items: center;
    font-size: 13px;
  }
`

export const CategorysHeader = styled.div``