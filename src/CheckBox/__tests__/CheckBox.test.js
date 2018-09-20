import React from 'react';
import 'jest-styled-components';

import CheckBox from '..';

describe('<CheckBox />', () => {
  it('should render without a problem', () => {
    const render = mountWithTheme(<CheckBox id="test" />);

    expect(render).toMatchSnapshot();
  });

  it('should render without a problem when checked and enabled', () => {
    const render = mountWithTheme(<CheckBox id="test" checked />);

    expect(render).toMatchSnapshot();
  });

  it('should render without a problem when unchecked and enabled', () => {
    const render = mountWithTheme(<CheckBox id="test" checked={false} />);

    expect(render).toMatchSnapshot();
  });

  it('should render without a problem when checked and disabled', () => {
    const render = mountWithTheme(<CheckBox id="test" checked disabled />);

    expect(render).toMatchSnapshot();
  });

  it('should render without a problem when unchecked and disabled', () => {
    const render = mountWithTheme(<CheckBox id="test" checked={false} disabled />);

    expect(render).toMatchSnapshot();
  });
});
