import styled from 'styled-components'

export const Container = styled.div`
  max-height: 28vw;
  display: flex;
`

export const Carousel = styled.div`
  overflow-y: auto;
  scroll-behavior: smooth;

  ::-webkit-scrollbar {
    display: none;
  }
`

export const Item = styled.div`
  background-color: ${props => props?.theme?.colors?.white};
  margin: 4px;
  padding: 3px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

  a {
    display: contents;
  }
`

export const Images = styled.div`
  cursor: pointer;

  img {
    object-fit: cover;
  }
`

export const Button = styled.button`
  border: none;
  cursor: pointer;
  background-color: ${props => props?.theme?.colors?.black};
  padding: 5px;
  border-radius: 50%;
`

export const Buttons = styled.div`
  margin: 0 22px;
  position: relative;
`

export const BoxPhotoProduct = styled.div`
  background-color: ${props => props?.theme?.colors?.white};
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  margin: 0 30px;
  height: 500px;
  width: 500px;
`

export const BoxImages = styled.div``

export const ImageZoomBox = styled.div``