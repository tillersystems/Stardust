import React from 'react';

import KpiChart from '..';

describe('<KpiChart />', () => {
  test('should render withouth a problem', () => {
    const { container } = render(<KpiChart title="title" label="label" />);

    expect(container.firstChild).toMatchSnapshot();
  });

  test('should render with render props', () => {
    const { getByText } = render(
      <KpiChart title="title" label="label" render={() => <p>Render Props</p>} />,
    );

    const renderNode = getByText('Render Props');

    expect(renderNode).toBeInTheDocument();
  });
});
