import React from 'react';

import KpiBlock from '..';

describe('<KpiBlock />', () => {
  test('should render withouth a problem', () => {
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
    const Custom = () => <div data-testid="customeValue">custom</div>;
    const { getByTestId } = render(<KpiBlock title="title" value={<Custom />} variation={-100} />);
    const customeValueNode = getByTestId('customeValue');

    expect(customeValueNode).toBeInTheDocument();
  });
});
