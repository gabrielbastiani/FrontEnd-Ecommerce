import styled, { css } from 'styled-components'

export const Container = styled.section`
  height: calc(100vh - 80px);
  width: 100vw;
  position: relative;

  img {
    width: 100vw;
    height: 100%;
    object-fit: cover;
  }
`

export const NavButton = styled.button`
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
  /* @ts-ignore */
  ${(props) => props.right === true ? css`right: 2%;` : css` left: 2%;`};
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
`

export const Dot = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  ${(props) => props.active === true ? css`background-color: white` : css`background-color: grey`};
`