import React from 'react';
import { fireEvent } from '@testing-library/react';
import Theme from '../../Theme';

import Navigation from '..';

describe('<Navigation />', () => {
  test('should render without a problem', () => {
    const { getByTestId } = render(
      <Navigation>
        <div>link</div>
        <span>link2</span>
        <div>link3</div>
      </Navigation>,
    );

    const navigation = getByTestId('navigation');
    expect(navigation).toBeInTheDocument();
  });

  test('should correctly display activated link', () => {
    const { getByText } = render(
      <Navigation>
        <div>link</div>
        <span isActive>link2</span>
        <div>link3</div>
      </Navigation>,
    );

    const activatedLink = getByText(/link2/);

    expect(activatedLink).toHaveStyleRule('color', Theme.palette.darkBlue);
  });

  test('should correctly change activated link on click', () => {
    const { getByText } = render(
      <Navigation>
        <div>link</div>
        <span isActive>link2</span>
        <div>link3</div>
      </Navigation>,
    );

    const link2 = getByText(/link2/);
    const link3 = getByText(/link3/);

    fireEvent.click(link3);

    expect(link3).toHaveStyleRule('color', Theme.palette.darkBlue);
    expect(link2).toHaveStyleRule('color', Theme.palette.spaceGrey);
  });

  test('should correctly render on vertical display', () => {
    const { getByTestId } = render(
      <Navigation isVertical>
        <div>link</div>
        <span isActive>link2</span>
        <div>link3</div>
      </Navigation>,
    );

    const navigation = getByTestId('navigation');
    expect(navigation).toHaveStyleRule('flex-direction', 'column');
  });
});
