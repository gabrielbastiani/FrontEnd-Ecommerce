import styled from 'styled-components'

export const Container = styled.div`
  margin-top: 40px;
  display: grid;
  grid-template-columns: auto auto auto auto auto auto;
  padding: 10px;
  justify-items: center;
  justify-content: center;
  align-items: center;

  @media (max-width: 1085px) {
    grid-template-columns: auto auto auto auto;
  }

  @media (max-width: 865px) {
    grid-template-columns: auto auto auto;
  }

  @media (max-width: 645px) {
    grid-template-columns: auto auto;
  }

  @media (max-width: 465px) {
    grid-template-columns: auto;
  }
`

export const TagsName = styled.span`
  margin: 0 5px;
  padding: 8px;
  font-size: 18px;
  font-weight: bold;
  font-style: italic;
`
