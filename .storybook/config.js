import '@babel/polyfill';

import React from 'react';
import styled from 'styled-components';
import { configure, addDecorator } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import { setDefaults } from '@storybook/addon-info';
import { withDocs } from 'storybook-readme';

import styles from './styles';
import { Theme } from '../src';

setDefaults({
  name: 'Tiller rigging',
  header: false,
  inline: true,
  source: true,
  maxPropObjectKeys: 10000,
  maxPropArrayLength: 10000,
  maxPropStringLength: 10000,
});

addDecorator((story, context) => {
  const readme = require(`../src/${context.kind}/README.md`);
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
