import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
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
`