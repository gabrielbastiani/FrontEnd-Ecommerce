import styled from 'styled-components'

export const CardBox = styled.div`
    width: 280px;
    display: flex;
    flex-direction: column;
    gap: 10px:
`

export const ImageBox = styled.div`
  width: 100%;
  height: 400px;
  overflow: hidden;
  position: relative;
  border: 1px solid ${props => props?.theme?.colors?.black};

  img {
    &:first-child {
      width: 100%;
      height: 100%;
      object-fit: cover;
      position: absolute;
      z-index: 1;
    }

    &:last-child {
      :hover {
        z-index: 2;
      }
    }
  }
`

export const TextDestaque = styled.span`
  color: ${props => props?.theme?.colors?.white};
  position: absolute;
  top: 3px;
  left: 3px;
  background-color: ${props => props?.theme?.colors?.warning};
  padding: 3px 5px;
  z-index: 3;
  font-weight: 500;
  font-size: 12px;
`

export const TitleProduct = styled.h2`
  color: ${props => props?.theme?.colors?.black};
  padding-bottom: 10px;
`

export const PriceOld = styled.h2`
  color: ${props => props?.theme?.colors?.warning};
  font-size: 16px;
  font-weight: 400;
  text-decoration: line-through;
`

export const PriceNew = styled.h3`
  color: ${props => props?.theme?.colors?.black};
  font-size: 18px;
  font-weight: 500;
`

export const PriceBox = styled.div`
  display: flex;
  gap: 20px;
`
