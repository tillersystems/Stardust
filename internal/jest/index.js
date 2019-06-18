import '@babel/polyfill';

import { render } from './utils';

import 'jest-dom/extend-expect';
import '@testing-library/react/cleanup-after-each';
import 'jest-styled-components';

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

// Fail tests on any warning
console.error = message => {
  throw new Error(message);
};

// Sets the globals for easier access.
global.render = render;
