import styled from 'styled-components'

export const ContainerCenter = styled.div`
  height: 100vh;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${props => props?.theme?.colors?.gray};
`

export const ContLogin = styled.div`
  margin-top: 2rem;
  width: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 2rem 1.5rem;
  background-color: ${props => props?.theme?.colors?.white};

  @media (max-width: 620px) {
    width: 90%;
  }
`

export const ExitDelivery = styled.button`
  background-color: ${props => props?.theme?.colors?.warning};
  color: ${props => props?.theme?.colors?.white};
  padding: 10px;
  border: none;
  margin-top: 10px;
`
