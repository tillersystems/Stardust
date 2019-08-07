import '@babel/polyfill';

import React from 'react';
import { configure, addDecorator, addParameters } from '@storybook/react';
import { create } from '@storybook/theming';
import { ThemeProvider } from 'styled-components';
import { addReadme } from 'storybook-readme';

import GlobalStyles from './styles';
import { Theme } from '../src';

// Option defaults:
addParameters({
  options: {
    isFullScreen: false,
    panelPosition: 'right',
    showNav: true,
    showPanel: true,
    sidebarAnimations: true,
    theme: create({
      base: 'light',
      brandTitle: 'Stardust',
      brandUrl: 'http://stardust.tillersystems.com',
    }),
  },
  readme: {
    /**
     * Prism code theme
     * Full list of theme https://github.com/PrismJS/prism-themes
     * To be used with storybook-readme, naming of the code theme should be used in one of these styles. https://github.com/tuchk4/storybook-readme/tree/master/packages/storybook-readme/src/styles/prismCodeThemes
     */
    codeTheme: 'xonokai',
  },
});

addDecorator(addReadme);

addDecorator(story => (
  <div style={{ padding: '5rem 5rem 0 5rem' }}>
    <GlobalStyles />
    <ThemeProvider theme={Theme}>{story()}</ThemeProvider>
  </div>
));

// automatically import all files ending in *.stories.js
const req = require.context('../src', true, /.stories.js$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
