import styled from 'styled-components'

export const SectionCategorysHome = styled.section``

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  grid-gap: 30px;
  justify-content: center;
  margin-bottom: 120px;

  img {
    object-fit: cover;
    border-radius: 5px;
    opacity: 1;
    position: absolute;
    opacity: 0.3;
    box-shadow: 10px 10px 8px #888888;
  }

  @media (max-width: 787px) {
    grid-template-columns: auto;
  }
`

export const BoxCategory = styled.button`
  background: transparent;
  width: 330px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props?.theme?.colors?.black};
  font-size: 1.5rem;
  font-weight: 600;
  border: none;
  border-radius: 5px;
  padding-bottom: 25px;
  padding-top: 25px;
  position: relative;
  z-index: 2;
  left: 0;
  top: 0;

  -webkit-transition: opacity 0.5s ease-in-out;
  -moz-transition: opacity 0.5s ease-in-out;
  -ms-transition: opacity 0.5s ease-in-out;
  -o-transition: opacity 0.5s ease-in-out;
  transition: opacity 0.5s ease-in-out;
  opacity: 1;

  svg {
    margin-right: 15px;
  }

  :hover {
    opacity: 0.7;
  }
`