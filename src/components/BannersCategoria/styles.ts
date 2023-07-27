import styled from 'styled-components'

export const BannersContainer = styled.div`

  @media (max-width: 617px) {
    margin-top: 50px;
  }

  @media (max-width: 606px) {
    margin-top: 20px;
  }
`

export const Container = styled.div`
  width: 100%;
  position: relative;

  @media (max-width: 750px) {
    display: grid;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`
