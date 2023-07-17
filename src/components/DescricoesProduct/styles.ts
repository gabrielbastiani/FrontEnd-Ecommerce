import styled from 'styled-components';

export const Container = styled.div`
  max-width: 75vw;
  margin-top: 60px;
`

export const Buttons = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  position: relative;
  bottom: 75px;
`

export const Button = styled.button`
  border: none;
  cursor: pointer;
  z-index: 0;
`

export const Carousel = styled.div`
  display: flex;
  overflow-x: auto;
  scroll-behavior: smooth;

  ::-webkit-scrollbar {
    display: none;
  }
`

export const Item = styled.button`
  background-color: ${props => props?.theme?.colors?.white};
  margin: 10px;
  padding: 35px;
  text-align: center;
  font-weight: 600;
  flex: none;
  border: solid 1px ${props => props?.theme?.colors?.gray};
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  cursor: pointer;
`

export const BoxDescription = styled.div`
  background-color: ${props => props?.theme?.colors?.white};
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  padding: 50px;
`
