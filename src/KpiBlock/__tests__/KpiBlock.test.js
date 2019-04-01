import React from 'react';

import KpiBlock from '..';

describe('<KpiBlock />', () => {
  test('should render without a problem', () => {
    const { container } = render(<KpiBlock title="title" value="value" />);

    expect(container.firstChild).toMatchSnapshot();
  });

  test('should render with a positive variation value', () => {
    const { container } = render(<KpiBlock title="title" value="value" variation={100} />);

    expect(container.firstChild).toMatchSnapshot();
  });

  test('should render with a negative variation value', () => {
    const { container } = render(<KpiBlock title="title" value="value" variation={-100} />);

    expect(container.firstChild).toMatchSnapshot();
  });

  test('should render with a custom a value', () => {
    const Custom = () => <div data-testid="customValue">custom</div>;
    const { getByTestId } = render(<KpiBlock title="title" value={<Custom />} variation={-100} />);
    const customValueNode = getByTestId('customValue');

    expect(customValueNode).toBeInTheDocument();
  });

  test('should render with compacted style', () => {
    const { container, getByText } = render(
      <KpiBlock title="title" value="value" variation={-100} isCompacted />,
    );
    const titleNode = getByText('title');
    const valueNode = getByText('value');

    expect(titleNode).toHaveStyleRule('font-size', '1.2rem');
    expect(valueNode).toHaveStyleRule('font-size', '2.6rem');
    expect(container.firstChild).toHaveStyleRule(
      'grid-template-areas',
      "'title' 'value' 'variation'",
    );
  });
});
