import styled from 'styled-components';

export const PageSection = styled.main`
  padding-top: 150px;

  @media (max-width: 900px) {
    padding-top: 50px;
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

  @media (max-width: 1078px) {
    padding: 0 55px;
  }
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

  @media (max-width: 1158px) {
    display: none;
  }
`

export const ContentPage = styled.article`
  width: 1000px;

  @media (max-width: 984px) {
    width: 760px;
  }
`