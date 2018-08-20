import React from 'react';
import { mount, shallow } from 'enzyme';
import { ThemeProvider } from 'styled-components';

import Theme from '../../src/Theme';

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
