import styled, { css } from 'styled-components'

interface PropType {
  right: boolean
}

interface PropType2 {
  left: boolean
}

export const ButtonClose = styled.button``

export const ContainerContent = styled.section`
  width: 50vw;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  @media (max-width: 970px) {
    width: 60vw;
  }

  @media (max-width: 740px) {
    width: 80vw;
  }

  @media (max-width: 518px) {
    width: 100vw;
  }

  img {
    object-fit: cover;
    width: 100%;
  }
`

export const SwiperButton = styled.button<PropType>`
  width: 35px;
  height: 35px;
  outline: none;
  border: none;
  background: none;
  cursor: pointer;
  padding: 0;
  position: absolute;
  top: 50%;
  border-radius: 50%;
  color: ${props => props?.theme?.colors?.black};
  box-shadow: 0px 4px 60px 20px rgba(3, 3, 3, 0.9),
    inset 0 -- 3em 3em rgba(3, 3, 3, 0.5);
  transform: translate(0, -50%);
  z-index: 2;
  ${props =>
    props.right === true
      ? css`
          right: 2%;
        `
      : css`
          left: 2%;
        `};
`
export const SwiperButtonLeft = styled.button<PropType2>`
  width: 35px;
  height: 35px;
  outline: none;
  border: none;
  background: none;
  cursor: pointer;
  padding: 0;
  position: absolute;
  top: 50%;
  border-radius: 50%;
  color: ${props => props?.theme?.colors?.black};
  box-shadow: 0px 4px 60px 20px rgba(3, 3, 3, 0.9),
    inset 0 -- 3em 3em rgba(3, 3, 3, 0.5);
  transform: translate(0, -50%);
  z-index: 2;
  ${props =>
    props.left === true
      ? css`
          left: 2%;
        `
      : css`
          right: 2%;
        `};
`

export const ContainerNameProduct = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

export const BoxName = styled.div`
  background-color: ${props => props?.theme?.colors?.black};
  padding: 10px;
  width: 500px;
`

export const ProductName = styled.span`
  font-weight: bold;
  color: ${props => props?.theme?.colors?.white};
`
