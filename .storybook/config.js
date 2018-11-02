import '@babel/polyfill';

import React from 'react';
import styled from 'styled-components';
import { configure, addDecorator } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import { withDocs } from 'storybook-readme';
import { withOptions } from '@storybook/addon-options';

import styles from './styles';
import { Theme } from '../src';

// Option defaults:
addDecorator(
  withOptions({
    name: 'Stardust',
    addonPanelInRight: true,
  }),
);

addDecorator((story, context) => {
  const componentPath = context.kind.replace(' - ', '/');
  const readme = require(`../src/${componentPath}/README.md`);
  return withDocs({
    PreviewComponent: styled.div`
      text-align: center;
      padding: 2.5rem;
      box-shadow: 0 0 4rem hsla(0, 0%, 0%, 0.1);
      background: hsl(218, 29%, 95%);
      margin: 5rem 0;
    `,
  })(readme)(story, context);
});

addDecorator(story => (
  <div style={{ padding: '5rem 5rem 0 5rem' }}>
    <ThemeProvider theme={Theme}>{story()}</ThemeProvider>
  </div>
));

// automatically import all files ending in *.stories.js
const req = require.context('../src', true, /.stories.js$/);
function loadStories() {
  styles();
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
