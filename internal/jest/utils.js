import React from 'react';
import { mount, shallow } from 'enzyme';
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

// Workaround to mount a component as root, and provide it with a theme
// https://github.com/styled-components/jest-styled-components#theming

/**
 * Mounts shallowly the component in a themed context.
 *
 * See https://github.com/airbnb/enzyme/blob/master/docs/api/mount.md.
 *
 * @param {node} tree - The React tree to mount.
 *
 * @returns {ReactWrapper}
 */
export const shallowWithTheme = tree => {
  const context = shallow(<ThemeProvider theme={Theme} />)
    .instance()
    .getChildContext();

  return shallow(tree, { context });
};

/**
 * Mounts the component in a themed context.
 *
 * See https://github.com/airbnb/enzyme/blob/master/docs/api/mount.md.
 *
 * @param {node} tree - The React tree to mount.
 *
 * @returns {ReactWrapper}
 */
export const mountWithTheme = tree => {
  const context = shallow(<ThemeProvider theme={Theme} />)
    .instance()
    .getChildContext();

  return mount(tree, {
    context,
    childContextTypes: ThemeProvider.childContextTypes, // Needed so child components receive the theme prop
  });
};
