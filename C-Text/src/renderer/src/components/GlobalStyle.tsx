import { createGlobalStyle } from 'styled-components'
import { Settings } from '@renderer/types/Settings.d'

// Define the global style
const GlobalStyle = createGlobalStyle<{ settings: Settings }>`
  body {
    font-family: Arial, sans-serif;
    font-size: ${(props) => props.settings?.appearance.fontSize || 16}px;
    background-color: ${(props) =>
      props.settings?.appearance.theme === 'dark' ? '#333' : '#fff'};
    color: ${(props) =>
      props.settings?.appearance.theme === 'dark' ? '#fff' : '#000'};
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  // You can define other elements like headings
  h1, h2, h3, h4, h5, h6 {
    font-size: ${(props) => (props.settings?.appearance.fontSize || 16) + 2}px;
  }
`

export default GlobalStyle
