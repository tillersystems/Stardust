import styled, { injectGlobal } from 'styled-components';
import Theme from '../src/Theme';

const globalStyles = () => injectGlobal`
  * {
    border: 0;
    box-sizing: inherit;
    -webkit-font-smoothing: antialiased;
    font-weight: inherit;
    margin: 0;
    outline: 0;
    padding: 0;
    text-decoration: none;
    text-rendering: optimizeLegibility;
    -webkit-appearance: none;
    -moz-appearance: none;
  }

  html {
    display: flex;
    height: 100%;
    width: 100%;
    max-height: 100%;
    max-width: 100%;
    box-sizing: border-box;
    font-size: 62.5%;
    font-size: calc(1em * .625);
    line-height: 1.5;
    background: ${Theme.palette.bodyBackground};
    color: #16171a;
    padding: 0;
    margin: 0;
    -webkit-font-smoothing: antialiased;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial,
      sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
  }

  body {
    display: flex;
    flex: auto;
    align-self: stretch;
    max-width: 100%;
    max-height: 100%;
    font-size: 1.4em;
    font-style: normal;
    font-weight: 400;
    line-height: 1.4;
  }

  a {
    color: currentColor;
    text-decoration: none;
    line-height: inherit;
    tap-highlight-color: transparent;

    &:hover,
    &:focus {
      text-decoration: none;
      cursor: pointer;
    }

    img { border: 0; }
  }

  img {
    /* Get rid of gap under images by making them display: inline-block; by default */
    display: inline-block;
    vertical-align: middle;
    max-width: 100%;
  }

  /* Remove Svg outline */
  svg {
    outline: 0;
  }

  ul,
  ol,
  dl,
  p,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
    padding: 0;
  }

  pre,
  code {
    font-family: Consolas, Monaco, "Lucida Console", monospace;
  }

  #root {
    width: 100%;
  }
`;

export default globalStyles;
