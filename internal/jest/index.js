import '@babel/polyfill';

import { render } from './utils';
import { Settings } from 'luxon';

import 'jest-dom/extend-expect';
import '@testing-library/react/cleanup-after-each';
import 'jest-styled-components';

Settings.defaultLocale = 'en';

// Mock matchMedia
window.matchMedia =
  window.matchMedia ||
  function() {
    return {
      matches: false,
      addListener: function() {},
      removeListener: function() {},
    };
  };

console.error = message => {
  if (!message.match(/warning/i)) {
    throw new Error(message);
  }
  console.warn(message);
};

// Sets the globals for easier access.
global.render = render;

// Mock document.createRange, createTange actually won't work inside JSDOM
global.document.createRange = () => ({
  setStart: () => {},
  setEnd: () => {},
  commonAncestorContainer: {
    nodeName: 'BODY',
    ownerDocument: document,
  },
});
