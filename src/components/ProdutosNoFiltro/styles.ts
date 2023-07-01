import styled from 'styled-components'

export const GridSectionProducts = styled.div`
  display: grid;
  justify-content: center;
  grid-template-columns: 320px 320px 320px;
  padding: 10px;
  grid-gap: 25px;

  @media (max-width: 1000px) {
    grid-template-columns: 320px 320px;
  }

  @media (max-width: 700px) {
    grid-template-columns: 320px;
  }
`

export const BoxProduct = styled.div`
  background-color: ${props => props?.theme?.colors?.white};
  margin: 10px;
  padding: 10px;
  width: 320px;
  flex: none;
  border: solid 1px ${props => props?.theme?.colors?.gray};
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

  a {
    display: contents;
  }
`

export const Images = styled.div`
  height: 300px;
  margin-bottom: 10px;
  opacity: 1;
  z-index: 1;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

export const Info = styled.div`
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  a {
    display: contents;
  }
`

export const Name = styled.span`
  color: ${props => props?.theme?.colors?.black};
  margin-bottom: 20px;
  position: relative;
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 95%;
`

export const BoxBuy = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  height: 40px;
  margin-top: 10px;
`

export const Quantidade = styled.div`
  display: flex;
  border: 1px solid;
  margin-right: 10px;
  width: calc(40% - 10px);
`

export const Min = styled.span`
  display: block;
  width: 33.33%;
  line-height: 40px;
  text-align: center;
  color: #838282;
  cursor: pointer;
`

export const ValueQuant = styled.span`
  display: block;
  width: 33.33%;
  line-height: 40px;
  text-align: center;
  color: #838282;
`

export const Max = styled.span`
  display: block;
  width: 33.33%;
  line-height: 40px;
  text-align: center;
  color: #838282;
  cursor: pointer;
`

export const Add = styled.button`
  letter-spacing: 1px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60%;
  text-align: center;
  background-color: ${props => props?.theme?.colors?.warning};
  color: ${props => props?.theme?.colors?.white};
  line-height: 40px;
  font-size: 15px;
  cursor: pointer;
  -webkit-transition: opacity 0.5s ease-in-out;
  -moz-transition: opacity 0.5s ease-in-out;
  -ms-transition: opacity 0.5s ease-in-out;
  -o-transition: opacity 0.5s ease-in-out;
  transition: opacity 0.5s ease-in-out;
  opacity: 1;

  :hover {
    opacity: 0.7;
  }
`

export const ImagesHover = styled.div`
  margin-top: -300px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  :hover {
    opacity: 0;
  }
`

export const ContainerPagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
  margin-bottom: 40px;
`

export const ContainerPage = styled.div`
  display: flex;
  align-items: center;
`

export const Previus = styled.div`
  margin: 0 20px;
`

export const BoxPages = styled.div`
  margin: 0 10px;
`

export const ButtonPage = styled.button`
  padding: 7px;
  padding: 7px;
  background-color: ${props => props?.theme?.colors?.info};
  border: solid 2px ${props => props?.theme?.colors?.black};
  border-radius: 10px;
  font-weight: 800;
`

export const TextPage = styled.button`
  padding: 5px;
  background-color: ${props => props?.theme?.colors?.gray};
  border: solid 2px ${props => props?.theme?.colors?.black};
  border-radius: 20%;
  font-weight: 800;
`

export const Next = styled.div`
  margin: 0 20px;
`
