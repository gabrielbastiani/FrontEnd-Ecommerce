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