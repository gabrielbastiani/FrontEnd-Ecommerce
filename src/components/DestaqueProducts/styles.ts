import styled from 'styled-components'

export const SectionDestaqueProducts = styled.section`
  width: 100%;
  margin-top: 100px;
  margin-bottom: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const Container = styled.div`
  max-width: 75vw;
`

export const Title = styled.h2`
  color: ${props => props?.theme?.colors?.black};
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
  width: 280px;
  border-radius: 16px;
  flex: none;
`

export const Images = styled.div`
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

export const Info = styled.div`
  height: 140px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

export const Name = styled.span`
  display: block;
  text-align: center;
  color: #1e1e1e;
  padding: 5px;
  border-radius: 10px;

  display: block;
  text-align: center;
  color: #1e1e1e;
  padding: 5px;
  border-radius: 10px;
`

export const OldPrice = styled.span`
  font-size: 0.8rem;
  text-decoration: line-through;
  flex-grow: 1;
  color: #e81a5d;

  display: block;
  text-align: center;
  color: #1e1e1e;
  padding: 5px;
  border-radius: 10px;
`

export const Price = styled.span`
  margin-top: 10px;
  font-size: 1.2rem;
  font-weight: bold;
  background-color: #ff7e3b;

  display: block;
  text-align: center;
  color: #1e1e1e;
  padding: 5px;
  border-radius: 10px;
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
