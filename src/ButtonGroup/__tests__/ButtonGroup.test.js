import React from 'react';
import { mount } from 'enzyme';
import { ThemeProvider } from 'styled-components';
import 'jest-styled-components';

import ButtonGroup from '..';
import Button from '../../Button';
import Theme from '../../Theme';

describe('<Logo />', () => {
  it('should render withouth a problem', () => {
    const render = mount(
      <ThemeProvider theme={Theme}>
        <ButtonGroup>
          <Button light medium onClick={() => {}}>
            Left
          </Button>
          <Button light medium onClick={() => {}}>
            Right
          </Button>
        </ButtonGroup>
      </ThemeProvider>,
    );
    expect(render).toMatchSnapshot();
  });
});
