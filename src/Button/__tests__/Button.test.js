import React from 'react';
import { fireEvent } from 'react-testing-library';

import Button from '..';
import Icon from '../../Icon';
import Theme from '../../Theme';

describe('<Button />', () => {
  test('should render without a problem', () => {
    const { container } = render(<Button>Text</Button>);

    expect(container.firstChild).toMatchSnapshot();
  });

  test('should render with another appearance', () => {
    const { container } = render(<Button appearance="primary">Text</Button>);

    expect(container.firstChild).toMatchSnapshot();
  });

  test('should render with a different size', () => {
    const { getByText } = render(<Button size="large">Text</Button>);
    const buttonNode = getByText('Text');

    expect(buttonNode).toHaveStyleRule('padding', '0.7rem 2.4rem');
    expect(buttonNode).toHaveStyleRule('font-size', Theme.fonts.size.big);
    expect(buttonNode).toHaveStyleRule('line-height', '1.5');
  });

  test('should render a fluid button', () => {
    const { getByText } = render(<Button fluid>Text</Button>);
    const buttonNode = getByText('Text');

    expect(buttonNode).toHaveStyleRule('width', '100%');
  });

  test('should render with a type submit', () => {
    const { getByText } = render(<Button type="submit">Text</Button>);
    const buttonNode = getByText('Text');

    expect(buttonNode).toHaveAttribute('type', 'submit');
  });

  test('should render a disabled button', () => {
    const { getByText } = render(<Button disabled>Text</Button>);
    const buttonNode = getByText('Text');

    expect(buttonNode).toHaveAttribute('disabled', '');
    expect(buttonNode).toHaveStyleRule('cursor', 'not-allowed');
    expect(buttonNode).toHaveStyleRule('opacity', '0.4');
  });

  test('should render a left icon', () => {
    const icon = <Icon color={Theme.palette.white} name="calendar" />;
    const iconPosition = 'left';
    const { container } = render(
      <Button icon={icon} iconPosition={iconPosition}>
        Text
      </Button>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('should render a right icon', () => {
    const icon = <Icon color={Theme.palette.white} name="calendar" />;
    const iconPosition = 'right';
    const { container } = render(
      <Button icon={icon} iconPosition={iconPosition}>
        Text
      </Button>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('should respond to a click handler', () => {
    const spy = jest.fn();
    const { getByText } = render(<Button onClick={spy}>Text</Button>);
    const buttonNode = getByText('Text');

    fireEvent.click(buttonNode);

    expect(spy).toHaveBeenCalledTimes(1);
  });
});
