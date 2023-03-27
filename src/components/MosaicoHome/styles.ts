import styled from 'styled-components'

export const MosaicoHomeSection = styled.section`
  width: 1300px;
  margin: auto;

  @media (max-width: 1360px) {
    width: 1000px;
    margin: 0 50px;
  }
`

export const GridContatinerTop = styled.div`
  display: grid;
  grid-template-columns: 650px 650px;
  gap: 10px;

  @media (max-width: 1360px) {
    grid-template-columns: 550px 550px;
  }

  @media (max-width: 1182px) {
    grid-template-columns: 450px 450px;
  }

  @media (max-width: 1049px) {
    grid-template-columns: 758px;
  }
`

export const MosaicoHome1 = styled.div`
  text-align: center;
  padding: 20px 0;

  img {
    @media (max-width: 1360px) {
      width: 550px;
    }

    @media (max-width: 1182px) {
      width: 450px;
    }
  }
`

export const MosaicoHome2 = styled.div`
  text-align: center;
  padding: 20px 0;

  img {
    @media (max-width: 1360px) {
      width: 550px;
    }

    @media (max-width: 1182px) {
      width: 450px;
    }
  }
`

export const GridContatinerBotton = styled.div`
  display: grid;
  grid-template-columns: 858px 340px;
  gap: 10px;

  @media (max-width: 1360px) {
    grid-template-columns: 758px 240px;
  }

  @media (max-width: 1182px) {
    grid-template-columns: 658px 140px;
  }

  @media (max-width: 1049px) {
    grid-template-columns: 758px;
  }
`

export const MosaicoHome3 = styled.div`
  text-align: center;

  img {
    @media (max-width: 1360px) {
      width: 758px;
    }

    @media (max-width: 1182px) {
      width: 658px;
    }
  }
`

export const MosaicoHome4 = styled.div`
  text-align: center;

  img {
    @media (max-width: 1360px) {
      width: 340px;
    }

    @media (max-width: 1182px) {
      width: 240px;
    }
  }
`
