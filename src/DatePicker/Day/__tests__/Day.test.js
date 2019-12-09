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

  test('should render multiple days without a problem', () => {
    const { container } = render(
      <>
        <Day shadowed>10</Day>
        <Day isSelected>11</Day>
        <Day isStartEdge>12</Day>
        <Day isInPath>13</Day>
        <Day isEndEdge>14</Day>
        <Day>15</Day>
        <Day shadowed>16</Day>
        <Day disabled>17</Day>
      </>,
    );

    expect(container).toMatchSnapshot();
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
    const expectedRadius = '2.8rem';
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
    const expectedRadius = '2.8rem';
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

  test('should render with different style if is in path', () => {
    const { container } = render(<Day isInPath>{dayNumber}</Day>);

    const dayContainerNode = container.firstChild;

    expect(dayContainerNode).toHaveStyleRule(
      'background',
      transparentize(0.86, Theme.palette.primary.default),
    );
  });

  test('should render as shadowed in path', () => {
    const { container, getByText } = render(
      <Day shadowed isInPath>
        {dayNumber}
      </Day>,
    );

    const dayContainerNode = container.firstChild;
    const dayContentNode = getByText(dayNumber);

    expect(dayContainerNode).toHaveStyleRule(
      'background',
      transparentize(0.66, Theme.palette.lightGrey),
    );
    expect(dayContentNode).toHaveStyleRule('color', Theme.palette.mediumGrey);
  });

  test('should render hidden if is shadowed and displayOnlyInMonth', () => {
    const { container } = render(
      <Day displayOnlyInMonth shadowed>
        {dayNumber}
      </Day>,
    );

    const dayContainerNode = container.firstChild;

    expect(dayContainerNode).toHaveStyleRule('visibility', 'hidden');
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
