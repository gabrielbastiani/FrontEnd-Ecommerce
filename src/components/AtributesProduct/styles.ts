import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 60px;
`

export const BoxTitulo = styled.div`
  width: 1300px;
  display: flex;
  float: left;

  @media (max-width: 1335px) {
    width: 1000px;
  }

  @media (max-width: 1048px) {
    width: 800px;
  }

  @media (max-width: 850px) {
    width: 500px;
  }

  @media (max-width: 540px) {
    width: 300px;
  }
`

export const TableContainer = styled.table``

export const TheadContent = styled.thead``

export const TrContent = styled.tr``

export const ThContent = styled.th`
  border: 2px solid;
  padding: 10px;
`

export const TbodyContent = styled.tbody``

export const TdContent = styled.td`
  border: 2px solid;
  padding: 10px;
`
