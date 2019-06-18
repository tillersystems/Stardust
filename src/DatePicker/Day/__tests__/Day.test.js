import React from 'react';
import { fireEvent } from '@testing-library/react';
import { transparentize } from 'polished';

import Day from '..';
import Theme from '../../../Theme';

const dayNumber = '10';

describe('Day', () => {
  test('should render without a problem', () => {
    const { container } = render(<Day>{dayNumber}</Day>);

    expect(container.firstChild).toMatchSnapshot();
  });

  test('should render a disabled day', () => {
    const { getByText } = render(<Day disabled>{dayNumber}</Day>);

    const dayContentNode = getByText(dayNumber);

    expect(dayContentNode).toHaveStyleRule('cursor', 'not-allowed');
    expect(dayContentNode).toHaveStyleRule('color', Theme.palette.lightGrey);
    expect(dayContentNode).not.toHaveStyleRule('background', {
      modifier: ':hover',
    });
  });

  test('should render a selected day', () => {
    const { getByText } = render(<Day isSelected>{dayNumber}</Day>);

    const dayContentNode = getByText(dayNumber);

    expect(dayContentNode).toHaveStyleRule('color', Theme.palette.white);
    expect(dayContentNode).toHaveStyleRule('background', Theme.palette.primary.default);
    expect(dayContentNode).not.toHaveStyleRule('background', {
      modifier: ':hover',
    });
  });

  test('should render a shadowed day', () => {
    const { getByText } = render(<Day shadowed>{dayNumber}</Day>);

    const dayContentNode = getByText(dayNumber);

    expect(dayContentNode).toHaveStyleRule('color', Theme.palette.mediumGrey);
    expect(dayContentNode).not.toHaveStyleRule('background', {
      modifier: ':hover',
    });
  });

  test('should render as startEdge', () => {
    const expectedRadius = '50%';
    const { container, getByText } = render(<Day isStartEdge>{dayNumber}</Day>);

    const dayContainerNode = container.firstChild;
    const dayContentNode = getByText(dayNumber);

    expect(dayContainerNode).toHaveStyleRule('border-top-left-radius', expectedRadius);
    expect(dayContainerNode).toHaveStyleRule('border-bottom-left-radius', expectedRadius);

    expect(dayContentNode).toHaveStyleRule('color', Theme.palette.white);
    expect(dayContentNode).toHaveStyleRule('background', Theme.palette.primary.default);
    expect(dayContentNode).not.toHaveStyleRule(
      'background',
      transparentize(0.86, Theme.palette.primary.default),
    );
    expect(dayContentNode).not.toHaveStyleRule('background', {
      modifier: ':hover',
    });
  });

  test('should render as endEdge', () => {
    const expectedRadius = '50%';
    const { container, getByText } = render(<Day isEndEdge>{dayNumber}</Day>);

    const dayContainerNode = container.firstChild;
    const dayContentNode = getByText(dayNumber);

    expect(dayContainerNode).toHaveStyleRule('border-top-right-radius', expectedRadius);
    expect(dayContainerNode).toHaveStyleRule('border-bottom-right-radius', expectedRadius);

    expect(dayContentNode).toHaveStyleRule('color', Theme.palette.white);
    expect(dayContentNode).toHaveStyleRule('background', Theme.palette.primary.default);
    expect(dayContentNode).not.toHaveStyleRule(
      'background',
      transparentize(0.86, Theme.palette.primary.default),
    );
    expect(dayContentNode).not.toHaveStyleRule('background', {
      modifier: ':hover',
    });
  });

  test('should render with diffrent style if is in path', () => {
    const { container } = render(<Day isInPath>{dayNumber}</Day>);

    const dayContainerNode = container.firstChild;

    expect(dayContainerNode).toHaveStyleRule(
      'background',
      transparentize(0.86, Theme.palette.primary.default),
    );
  });

  test('should respond to a click handler', () => {
    const spy = jest.fn();
    const { container } = render(<Day onClick={spy}>{dayNumber}</Day>);

    const dayContainerNode = container.firstChild;

    // Click on root element
    fireEvent.click(dayContainerNode);

    expect(spy).toHaveBeenCalledTimes(1);
  });
});
