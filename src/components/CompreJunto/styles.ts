import styled, { css } from 'styled-components'

interface PropType {
  right: boolean
}

interface PropType2 {
  left: boolean
}

export const ContainerBuy = styled.div`
  display: flex;
  margin-top: 60px;

  @media (max-width: 1108px) {
    flex-direction: column-reverse;
  }

  @media (max-width: 900px) {
    align-items: center;
  }
`

export const TogheterTitulo = styled.div`
  width: 650px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 1108px) {
    margin-top: 50px;
  }

  @media (max-width: 665px) {
    width: 100px;
  }
`

export const Container = styled.div`
  width: 650px;
  position: relative;

  @media (max-width: 665px) {
    width: 300px;
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

export const BoxAdd = styled.div`
  display: flex;
  flex-direction: row-reverse;
  justify-content: flex-end;
  margin-top: 30px;
  margin-bottom: 50px;
`

export const EtiquetaInput = styled.label`
  font-weight: 600;
  color: ${props => props?.theme?.colors?.warning};
`

export const BoxRadios = styled.div`
  display: flex;
  flex-direction: row-reverse;
  justify-content: flex-end;
  margin-top: 30px;
  margin-bottom: 50px;
`

export const RadioBotton = styled.input`
  margin-right: 5px;
`

export const DatasProductTogheter = styled.div`
  display: flex;
  align-items: center;
  background-color: ${props => props?.theme?.colors?.white};
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

  @media (max-width: 1230px) {
    flex-direction: column;
  }
`

export const BoxImage = styled.div`
  margin-left: 30px;

  @media (max-width: 665px) {
    margin-left: unset;
  }
`

export const BoxDatas = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px;

  a {
    margin-bottom: 15px;
  }
`
