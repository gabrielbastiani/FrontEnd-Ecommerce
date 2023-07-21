import styled from 'styled-components'

export const BoxFavorite = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 55px;
`

export const DeleteFavorite = styled.button`
  color: ${props => props?.theme?.colors?.black};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  font-weight: 700;

  svg {
    margin-right: 5px;
  }
`
