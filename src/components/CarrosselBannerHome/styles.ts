import styled, { css } from 'styled-components'

interface PropType {
  right: boolean
}

interface PropType2 {
  left: boolean
}

export const Container = styled.section`
  width: 100%;
  position: relative;
  z-index: -1;

  img {
    width: 100vw;
    height: 100%;
    object-fit: contain;
    margin-top: 120px;

    @media (max-width: 900px) {
      margin-top: 200px;
    }

    @media (max-width: 608px) {
      margin-top: 380px;
    }

    @media (max-width: 533px) {
      margin-top: 455px;
    }

    @media (max-width: 459px) {
      margin-top: 490px;
    }
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
  color: ${props => props?.theme?.colors?.white};
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

  @media (max-width: 900px) {
    top: 65%;
  }

  @media (max-width: 608px) {
    top: 78%;
  }

  @media (max-width: 533px) {
    top: 83%;
  }

  @media (max-width: 459px) {
    top: 87%;
  }
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
  color: ${props => props?.theme?.colors?.white};
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

  @media (max-width: 900px) {
    top: 65%;
  }

  @media (max-width: 608px) {
    top: 78%;
  }

  @media (max-width: 533px) {
    top: 83%;
  }

  @media (max-width: 459px) {
    top: 87%;
  }
`