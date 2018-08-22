import React from 'react';
import 'jest-styled-components';

import KpiChart from '..';

describe('<KpiChart />', () => {
  it('should render withouth a problem', () => {
    const render = mountWithTheme(<KpiChart title="title" label="label" />);

    expect(render).toMatchSnapshot();
  });

  it('should render with render props', () => {
    const render = mountWithTheme(
      <KpiChart title="title" label="label" render={() => <p>Render Props</p>} />,
    );

    expect(render).toMatchSnapshot();
  });
});
