import React from 'react';
import { DateTime } from 'luxon';
import { fireEvent } from 'react-testing-library';
import { css } from 'styled-components';
import { lighten } from 'polished';

import Day from '..';
import Theme from '../../../Theme';
import { Content } from '../elements';

describe('Day', () => {
  const dateValue = DateTime.fromObject({
    year: 2018,
    month: 7,
    day: 15,
    hour: 0,
    minute: 0,
    second: 0,
    zone: 'Europe/Paris',
  });

  test('should render with no problem', () => {
    const { container } = render(<Day date={dateValue} />);

    expect(container.firstChild).toMatchSnapshot();
  });

  test('should render when disabled', () => {
    const { container } = render(<Day date={dateValue} disabled />);

    const dayContainerNode = container.firstChild;

    expect(dayContainerNode).toHaveStyleRule('cursor', 'not-allowed');
    expect(dayContainerNode).toHaveStyleRule('color', Theme.palette.lightGrey, {
      modifier: css`
        > ${Content}
      `,
    });
  });

  test('should render when selected', () => {
    const { container } = render(<Day date={dateValue} selected />);

    const dayContainerNode = container.firstChild;

    expect(dayContainerNode).toHaveStyleRule('color', Theme.palette.white, {
      modifier: css`
        > ${Content}
      `,
    });
    expect(dayContainerNode).toHaveStyleRule('background', Theme.palette.primary.default, {
      modifier: css`
        > ${Content}
      `,
    });
  });

  test('should render when highlighted', () => {
    const { container } = render(<Day date={dateValue} highlighted />);

    const dayContainerNode = container.firstChild;

    expect(dayContainerNode).toHaveStyleRule(
      'background',
      lighten(0.4, Theme.palette.primary.default),
    );
  });

  test('should render when shadowed', () => {
    const { container } = render(<Day date={dateValue} shadowed />);

    const dayContainerNode = container.firstChild;

    expect(dayContainerNode).toHaveStyleRule('color', Theme.palette.lightGrey, {
      modifier: css`
        > ${Content}
      `,
    });
  });

  test('should render when highlightStart', () => {
    const { container } = render(<Day date={dateValue} highlightStart />);

    const dayContainerNode = container.firstChild;

    expect(dayContainerNode).toHaveStyleRule('border-top-left-radius', Theme.dimensions.radius);
    expect(dayContainerNode).toHaveStyleRule('border-bottom-left-radius', Theme.dimensions.radius);
  });

  test('should render when highlightEnd', () => {
    const { container } = render(<Day date={dateValue} highlightEnd />);

    const dayContainerNode = container.firstChild;

    expect(dayContainerNode).toHaveStyleRule('border-top-right-radius', Theme.dimensions.radius);
    expect(dayContainerNode).toHaveStyleRule('border-bottom-right-radius', Theme.dimensions.radius);
  });

  test('should render when selectionStart', () => {
    const { getByText } = render(<Day date={dateValue} selectionStart />);

    const dayContentNode = getByText('15');

    expect(dayContentNode).toHaveStyleRule('border-top-left-radius', Theme.dimensions.radius);
    expect(dayContentNode).toHaveStyleRule('border-bottom-left-radius', Theme.dimensions.radius);
  });

  test('should render when selectionEnd', () => {
    const { getByText } = render(<Day date={dateValue} selectionEnd />);

    const dayContentNode = getByText('15');

    expect(dayContentNode).toHaveStyleRule('border-top-right-radius', Theme.dimensions.radius);
    expect(dayContentNode).toHaveStyleRule('border-bottom-right-radius', Theme.dimensions.radius);
  });

  test('should respond to a click handler', () => {
    const spy = jest.fn();
    const { container } = render(<Day date={dateValue} onClick={spy} />);

    const dayContainerNode = container.firstChild;

    // Click on root element
    fireEvent.click(dayContainerNode);

    expect(spy).toHaveBeenCalledTimes(1);
  });

  test('should respond to a onMouseOver handler', () => {
    const spy = jest.fn();
    const { container } = render(<Day date={dateValue} onOver={spy} onFocus={() => {}} />);

    const dayContainerNode = container.firstChild;

    // hover root element
    fireEvent.mouseOver(dayContainerNode);

    expect(spy).toHaveBeenCalledTimes(1);
  });
});
