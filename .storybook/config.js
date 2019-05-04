import '@babel/polyfill';

import React from 'react';
import styled from 'styled-components';
import { configure, addDecorator, addParameters } from '@storybook/react';
import { create } from '@storybook/theming';
import { ThemeProvider } from 'styled-components';
import { withDocs } from 'storybook-readme';

import GlobalStyles from './styles';
import { Theme } from '../src';

// Option defaults:
addParameters({
  options: {
    theme: create({
      base: 'light',
      brandTitle: 'Stardust',
      brandUrl: 'http://stardust.tillersystems.com',
    }),
    isFullscreen: false,
    panelPosition: 'right',
    showNav: true,
    showPanel: true,
  },
});

addDecorator((story, context) => {
  const componentPath = context.kind.replace(' - ', '/');
  const readme = require(`../src/${componentPath}/README.md`);
  return withDocs({
    PreviewComponent: styled.div`
      text-align: center;
      padding: 2.5rem;
      box-shadow: 0 0 0.2rem hsla(0, 0%, 0%, 0.1);
      background: hsl(220, 19%, 96%);
      margin: 5rem 0;
    `,
  })(readme)(story, context);
});

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
