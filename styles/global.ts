import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    overflow-x: hidden;
    background: ${props => props.theme.colors.white};
    color: ${props => props.theme.colors.black};
    font: 400 16px Roboto, sans-serif;
  }

  a {
    color: ${props => props.theme.colors.black};
    text-decoration: none;
  }

  button {
    cursor: pointer;
  }

  #nprogress {
    position: relative;
    z-index: 9999999;
  }

  #nprogress .bar {
    background: #f44336 !important;
    height: 3px;
  }
`