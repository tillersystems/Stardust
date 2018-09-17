import React from 'react';
import 'jest-styled-components';

import KpiBlock from '..';

describe('<KpiBlock />', () => {
  it('should render withouth a problem', () => {
    const render = mountWithTheme(<KpiBlock title="title" value="value" />);

    expect(render).toMatchSnapshot();
  });

  it('should render with a positive variation value', () => {
    const render = mountWithTheme(<KpiBlock title="title" value="value" variation={100} />);

    expect(render).toMatchSnapshot();
  });

  it('should render with a negative variation value', () => {
    const render = mountWithTheme(<KpiBlock title="title" value="value" variation={-100} />);

    expect(render).toMatchSnapshot();
  });

  it('should render with a custom a value', () => {
    const render = mountWithTheme(
      <KpiBlock title="title" value="<div>67</div>" variation={-100} />,
    );

    expect(render).toMatchSnapshot();
  });
});
