import styled from 'styled-components'

export const BannersContainer = styled.div`

  @media (max-width: 617px) {
    margin-top: 50px;
  }

  @media (max-width: 606px) {
    margin-top: 200px;
  }

  @media (max-width: 539px) {
    margin-top: 280px;
  }

  @media (max-width: 454px) {
    margin-top: 320px;
  }
`

export const Container = styled.div`
  width: 100%;
  position: relative;
  z-index: -1;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`
