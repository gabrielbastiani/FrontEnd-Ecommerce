import styled from 'styled-components'

export const LoadingScreen = styled.div`
  background: rgba(0, 0, 0, 0.8);
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 99999;
`

export const Load = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: 29%;

  @media (max-width: 1390px) {
    margin: 40%;
  }

  @media (max-width: 820px) {
    margin: 70% 0;
  }

  @media (max-width: 610px) {
    margin: 110% 0;
  }

  position: relative;
  -webkit-animation: spin 2s infinite;
  animation: spin 2s infinite;

  &:before,
  &:after {
    position: absolute;
  }

  &:before {
    top: 0.063rem;
  }

  &:after {
    bottom: 0.063rem;
  }

  @keyframes spin {
    100% {
      transform: rotate(360deg);
    }
  }
`

export const LoadText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

export const TextLoad = styled.h1`
  color: white;
  margin-top: -55%;
  font-size: 24px;

  @media (max-width: 610px) {
    margin-bottom: 50%;
  }
`
