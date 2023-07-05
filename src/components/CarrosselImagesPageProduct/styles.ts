import styled, { css } from 'styled-components'

interface PropType {
  right: boolean
}

interface PropType2 {
  left: boolean
}

export const Container = styled.div`
  max-height: 510px;
  display: flex;

  @media (max-width: 710px) {
    display: none;
  }
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

  @media (max-width: 710px) {
    display: none;
  }
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

export const ContainerMobile = styled.div`
  max-width: 510px;
  display: none;

  @media (max-width: 710px) {
    display: block;
  }

  @media (max-width: 555px) {
    width: 360px;
  }

  @media (max-width: 394px) {
    width: 270px;
  }

  @media (max-width: 281px) {
    width: 150px;
  }
`

export const CarouselMobile = styled.div`
  display: flex;
  overflow-x: auto;
  scroll-behavior: smooth;

  ::-webkit-scrollbar {
    display: none;
  }
`

export const ItemMobile = styled.div`
  background-color: ${props => props?.theme?.colors?.white};
  margin: 4px;
  padding: 3px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

  a {
    display: contents;
  }
`

export const ImagesMobile = styled.div`
  cursor: pointer;

  img {
    object-fit: cover;
  }
`

export const ButtonsMobileRight = styled.button<PropType>`
  width: 35px;
  height: 35px;
  outline: none;
  border: none;
  background: none;
  cursor: pointer;
  padding: 0;
  position: absolute;
  top: 30%;
  border-radius: 50%;
  color: ${props => props?.theme?.colors?.black};
  background-color: ${props => props?.theme?.colors?.black};
  ${props =>
    props.right === true
      ? css`
          right: 2%;
        `
      : css`
          left: 2%;
        `};

  @media (max-width: 710px) {
    display: block;
  }

  @media (max-width: 605px) {
    top: 50%;
  }

  @media (max-width: 544px) {
    top: 60%;
  }

  @media (max-width: 541px) {
    top: 75%;
  }

  @media (max-width: 457px) {
    top: 63%;
  }

  @media (max-width: 376px) {
    top: 88%;
  }

  @media (max-width: 394px) {
    top: 68%;
  }

  @media (max-width: 361px) {
    top: 78%;
  }

  @media (max-width: 281px) {
    top: 88%;
  }
`

export const ButtonsMobileLeft = styled.button<PropType2>`
  width: 35px;
  height: 35px;
  outline: none;
  border: none;
  cursor: pointer;
  padding: 0;
  position: absolute;
  top: 30%;
  border-radius: 50%;
  color: ${props => props?.theme?.colors?.black};
  background-color: ${props => props?.theme?.colors?.black};
  ${props =>
    props.left === true
      ? css`
          left: 2%;
        `
      : css`
          right: 2%;
        `};

  @media (max-width: 710px) {
    display: block;
  }

  @media (max-width: 605px) {
    top: 50%;
  }

  @media (max-width: 544px) {
    top: 60%;
  }

  @media (max-width: 541px) {
    top: 75%;
  }

  @media (max-width: 457px) {
    top: 63%;
  }

  @media (max-width: 376px) {
    top: 88%;
  }

  @media (max-width: 394px) {
    top: 68%;
  }

  @media (max-width: 361px) {
    top: 78%;
  }

  @media (max-width: 281px) {
    top: 88%;
  }
`

export const BoxPhotoProductMobile = styled.div`
  background-color: ${props => props?.theme?.colors?.white};
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  margin: 0 30px;
  height: 500px;
  width: 500px;

  @media (max-width: 555px) {
    width: 320px;
    height: 320px;
  }

  @media (max-width: 420px) {
    margin: 0 3px;
  }

  @media (max-width: 390px) {
    margin: 0 -19px;
  }

  @media (max-width: 281px) {
    width: 210px;
    height: 210px;
  }
`

export const BoxImagesMobile = styled.div``

export const ImageZoomBoxMobile = styled.div`
  img {
    @media (max-width: 555px) {
      width: 300px;
      height: 300px;
    }

    @media (max-width: 281px) {
      width: 200px;
      height: 200px;
  }
  }
`
