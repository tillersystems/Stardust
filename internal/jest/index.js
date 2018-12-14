import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { shallowWithTheme, mountWithTheme, render } from './utils';

import 'jest-dom/extend-expect';
import 'react-testing-library/cleanup-after-each';
import 'jest-styled-components';

// React 16 Enzyme adapter
configure({ adapter: new Adapter() });

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
global.shallow = shallow;
global.mount = mount;
global.shallowWithTheme = shallowWithTheme;
global.mountWithTheme = mountWithTheme;
