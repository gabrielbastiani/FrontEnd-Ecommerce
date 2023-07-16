import styled from 'styled-components';

export const BoxVideoContatiner = styled.div`
  display: flex;
  align-items: center;
  margin-top: 75px;

  @media (max-width: 1108px) {
    flex-direction: column;
  }
`

export const VideoProductBox = styled.div`
  width: 620px;

  @media (max-width: 1108px) {
    margin-bottom: 30px;
  }

  @media (max-width: 665px) {
    display: flex;
    justify-content: center;

    iframe {
      width: 450px;
      height: 250px;
    }
  }

  @media (max-width: 462px) {
    width: 50px;
  }
`

export const BoxVideo = styled.div`
  width: 650px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 665px) {
    width: 450px;
  }
`
