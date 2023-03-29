import styled from 'styled-components'

export const SectionDestaqueProducts = styled.section`
  width: 100%;
  margin-bottom: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const BoxTitle = styled.div`
  display: flex;
  width: 100%;
  margin-top: 100px;
  margin-bottom: 40px;
`

export const Container = styled.div`
  max-width: 75vw;
`

export const Title = styled.h1`
  color: ${props => props?.theme?.colors?.black};
  padding-left: 0;
  margin-left: 10vw;
`

export const Carousel = styled.div`
  display: flex;
  overflow-x: auto;
  scroll-behavior: smooth;

  ::-webkit-scrollbar {
    display: none;
  }
`

export const Item = styled.div`
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
  z-index:1;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
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
    opacity:0;
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

export const OldPrice = styled.span`
  font-size: 0.8rem;
  text-decoration: line-through;
  color: ${props => props?.theme?.colors?.gray};
`

export const Price = styled.span`
  padding-top: 2px;
  font-size: 1.3rem;
  font-weight: bold;
`

export const Buttons = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  position: relative;
  bottom: 250px;
`

export const Button = styled.button`
  border: none;
  cursor: pointer;
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
