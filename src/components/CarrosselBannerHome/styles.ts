import styled, { css } from 'styled-components'

interface PropType {
  right: boolean
}

interface PropType2 {
  left: boolean
}

type PropTypeKey = {
  key: string
  active: boolean
}

export const Container = styled.section`
  width: 100vw;
  position: relative;

  img {
    width: 100vw;
    height: 100%;
    object-fit: contain;
    margin-top: 128px;

    @media (max-width: 900px) {
      margin-top: 200px;
    }

    @media (max-width: 600px) {
      margin-top: 331px;
    }

    @media (max-width: 544px) {
      margin-top: 411px;
    }

    @media (max-width: 455px) {
      margin-top: 448px;
    }
  }
`

export const NavButton = styled.button<PropType>`
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

  @media (max-width: 600px) {
    top: 78%;
  }

  @media (max-width: 455px) {
    top: 83%;
  }
`

export const NavButtonLeft = styled.button<PropType2>`
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

  @media (max-width: 600px) {
    top: 78%;
  }

  @media (max-width: 455px) {
    top: 83%;
  }
`

export const DotContainer = styled.div`
  display: flex;
  gap: 5px;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 3%;
  left: 50%;
  transform: translate(-50%, 0);

  a {
    cursor: pointer;
  }
`

export const Dot = styled.div.attrs((props: PropTypeKey) => ({
  key: props.key
}))<PropTypeKey>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  ${props =>
    props.active === true
      ? css`
          background-color: white;
        `
      : css`
          background-color: grey;
        `};
`