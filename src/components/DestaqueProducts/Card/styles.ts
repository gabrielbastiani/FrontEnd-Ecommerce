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

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;

    &:last-child {
      z-index: 1;

      &:hover {
        z-index: 2;
      }
    }
  }
`

export const TitleProduct = styled.h2`
  color: ${props => props?.theme?.colors?.black};
`

export const PriceBox = styled.div``
