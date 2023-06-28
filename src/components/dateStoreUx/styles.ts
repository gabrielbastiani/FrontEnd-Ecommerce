import styled from 'styled-components'

export const PageSection = styled.main`
  padding-top: 170px;

  @media (max-width: 900px) {
    padding-top: 220px;
  }
`

export const Bread = styled.section`
  display: flex;
  justify-content: center;
  margin-bottom: 90px;

  @media (max-width: 680px) {
    display: none;
  }
`

export const Boxbreadcrumbs = styled.div`
  width: 1400px;
  display: flex;
  flex-direction: column;
`

export const ContainerContent = styled.section`
  display: flex;
  justify-content: center;
`

export const AsideConteiner = styled.aside`
  width: 400px;
  display: flex;
  flex-direction: column;
  position: sticky;
  height: 100%;
  top: 160px;

  @media (max-width: 1078px) {
    display: none;
  }
`

export const ContentPage = styled.article`
  width: 1000px;
`