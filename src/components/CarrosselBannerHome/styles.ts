import styled from 'styled-components'

export const SectionCarrossel = styled.section`
  height: calc(100vh -80px);
  width: 100vw;
  position: relative;
`

export const ContainerBanner = styled.div`
  width: 300vw;
  height: 100%;
  display: flex;
  transition: all 2s ease;

  img {
    width: 100vw;
    height: 100%;
    object-fit: cover;
  }
`

export const Icons = styled.div`
  width: fit-content;
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  bottom: 35px;
  display: flex;
  gap: 15px;
`

export const Icon = styled.div`
  width: 50px;
  height: 50px;
  border: 2px solid ${props => props?.theme?.colors?.white};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`