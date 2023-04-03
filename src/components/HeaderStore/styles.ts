import styled from 'styled-components'

export const ContainerHeaderStore = styled.header`
  display: flex;
  justify-content: center;
  background-color: ${props => props?.theme?.colors?.black};
  width: 100%;
  padding: 15px 0;
  flex-direction: column;
  z-index: 99;
  position: fixed;
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

  @media (max-width: 900px) {
    flex-direction: column;
  }
`
export const StyledUl = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;

  @media (max-width: 607px) {
    display: flex;
    flex-direction: column;
  }
`

export const StyledLi = styled.li`
  float: left;

  @media (max-width: 607px) {
    padding: 15px;
  }
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

  @media (max-width: 440px) {
    left: 20px;
  }

  @media (max-width: 350px) {
    width: 300px;
  }
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
  margin: auto 30px;

  svg {
    margin: auto 5px;
  }
`

export const BlockLogo = styled.div`
  display: flex;
  width: 35%;
  align-items: center;
  justify-content: center;

  input {
    margin-left: 50px;
  }

  @media (max-width: 900px) {
    width: 85%;
    margin-bottom: 20px;
  }

  @media (max-width: 460px) {
    flex-direction: column;

    input {
      width: 80%;
    }
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

export const CategorysHeader = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin-top: 25px;

  @media (max-width: 900px) {
    display: none;
  }
`

export const TextNameCategory = styled.span`
  color: ${props => props?.theme?.colors?.white};

  :hover {
    color: ${props => props?.theme?.colors?.info};
  }
`

export const DataResult = styled.div`
  z-index: 999;
  top: 70px;
  width: 250px;
  height: auto;
  background-color: ${props => props?.theme?.colors?.white};
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  overflow: hidden;
  position: absolute;

  a {
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    color: ${props => props?.theme?.colors?.black};
  }
`

export const ListItems = styled.span`
  padding: 10px;
  cursor: pointer;

  :hover {
    color: ${props => props?.theme?.colors?.info};
  }
`

export const CategorysHeaderMobile = styled.div`
  display: none;
  margin-top: 25px;

  svg {
    margin-bottom: 20px;
  }

  @media (max-width: 900px) {
    display: block;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
`

export const BoxItemsMobile = styled.ul`
  display: flex;
  position: absolute;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  z-index: 999;
  background-color: ${props => props?.theme?.colors?.black};
  top: 190px;

  @media (max-width: 607px) {
    top: 320px;
  }

  @media (max-width: 540px) {
    top: 400px;
  }

  @media (max-width: 460px) {
    top: 430px;
  }
`

export const TextNameCategoryMobile = styled.li`
  color: ${props => props?.theme?.colors?.white};
  list-style: none;
  cursor: pointer;
  padding: 10px;
  text-align: center;
  z-index: 999;
`
