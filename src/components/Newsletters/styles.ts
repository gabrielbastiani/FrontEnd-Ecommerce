import styled from 'styled-components'

export const SectionContato = styled.section`
  background-color: ${props => props?.theme?.colors?.black};
  display: flex;
  justify-content: center;
  padding: 30px 0;

  @media (max-width: 720px) {
    flex-direction: column;
    align-items: center;
  }
`

export const BlockContato = styled.div`
  display: flex;
  align-items: center;
  padding-right: 30px;

  @media (max-width: 720px) {
    flex-direction: column;
  }
`

export const TextNews = styled.span`
    color: ${props => props?.theme?.colors?.white};
    margin: 0 20px 10px;
`