import React from 'react';
import { fireEvent } from '@testing-library/react';

import BreadCrumb from '..';

describe('<BreadCrumb />', () => {
  test('should render without a problem', () => {
    const { getByText } = render(
      <BreadCrumb>
        <BreadCrumb.Item>path</BreadCrumb.Item>
        <BreadCrumb.Item>to</BreadCrumb.Item>
        <BreadCrumb.Item>the</BreadCrumb.Item>
        <BreadCrumb.Item>current</BreadCrumb.Item>
        <BreadCrumb.Item>page</BreadCrumb.Item>
      </BreadCrumb>,
    );

    // Button Node
    const pathNode = getByText('path');
    const theNode = getByText('the');
    const pageNode = getByText('page');

    expect(pathNode).toBeInTheDocument();
    expect(pageNode).toBeInTheDocument();
    expect(theNode).toBeInTheDocument();
  });

  test('should respond to a click handler', () => {
    const spy = jest.fn();

    const { getByText } = render(
      <BreadCrumb>
        <BreadCrumb.Item>
          <button type="button" onClick={spy}>
            path
          </button>
        </BreadCrumb.Item>
        <BreadCrumb.Item>to</BreadCrumb.Item>
        <BreadCrumb.Item>the</BreadCrumb.Item>
        <BreadCrumb.Item>current</BreadCrumb.Item>
        <BreadCrumb.Item>page</BreadCrumb.Item>
      </BreadCrumb>,
    );

    // Button Node
    const pathNode = getByText('path');

    fireEvent.click(pathNode);

    expect(spy).toHaveBeenCalledTimes(1);
  });
});
