import styled from 'styled-components'

export const ContainerHeader = styled.header`
  display: flex;
  justify-content: center;
  background-color: ${props => props?.theme?.colors?.black};
  width: 100%;
  padding: 15px 0;
`

export const ContentHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;

  @media (max-width: 542px) {
    flex-direction: column;
    padding: 20px 0;

    img {
      margin: 20px;
    }
  }
`

export const BlockBack = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`

export const TextVoltar = styled.span`
  color: ${props => props?.theme?.colors?.white};
  padding-left: 10px;
  font-weight: 600;
`

export const BlockSecurity = styled.div`
  display: flex;
  align-items: center;
`

export const TextSecurity = styled.span`
  color: ${props => props?.theme?.colors?.white};
  padding-left: 10px;
`
