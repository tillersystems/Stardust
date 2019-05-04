import React from 'react';
import { render } from 'react-testing-library';
import { ThemeProvider } from 'styled-components';

import Theme from '../../src/Theme';

// Workaround to render a component and provide it with a theme
const customRender = (node, options) => {
  const rendered = render(<ThemeProvider theme={Theme}>{node}</ThemeProvider>, options);
  return {
    ...rendered,
    rerender: newUi =>
      customRender(newUi, {
        container: rendered.container,
        baseElement: rendered.baseElement,
      }),
  };
};

// override render method
export { customRender as render };
