import React from 'react';
import { fireEvent } from '@testing-library/react';

import { Button, ButtonGroup } from '../..';

const originalWarn = console.error;
afterEach(() => (console.error = originalWarn));

describe('<ButtonGroup />', () => {
  let consoleOutput = [];
  const mockedWarn = output => consoleOutput.push(output);
  beforeEach(() => (console.error = mockedWarn));

  test('should render without a problem', () => {
    const { container } = render(
      <ButtonGroup>
        <Button name="ON" appearance="secondary">
          ON
        </Button>
        <Button name="OFF" appearance="secondary">
          OFF
        </Button>
      </ButtonGroup>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('should render with a default value', () => {
    const { getByText } = render(
      <ButtonGroup defaultActiveButtonName="ON">
        <Button name="ON" appearance="secondary">
          ON
        </Button>
        <Button name="OFF" appearance="secondary">
          OFF
        </Button>
      </ButtonGroup>,
    );
    const offButton = getByText('ON');

    expect(offButton).toHaveAttribute('data-isactive', 'true');
  });

  test('should not clone child if disabled', () => {
    const { getByText } = render(
      <ButtonGroup defaultActiveButton="ON">
        <Button name="ON" appearance="secondary">
          ON
        </Button>
        <Button name="OFF" appearance="secondary" disabled>
          OFF
        </Button>
      </ButtonGroup>,
    );

    const offButton = getByText('OFF');

    expect(offButton).toHaveAttribute('disabled');
    expect(offButton).not.toHaveAttribute('data-isactive', 'true');
    expect(offButton).not.toHaveAttribute('data-appearance', 'secondary');
  });

  test('should not clone child if not a button element', () => {
    const { getByText } = render(
      <ButtonGroup defaultActiveButton="ON">
        <div name="ON">ON</div>
        <div name="OFF">OFF</div>
      </ButtonGroup>,
    );

    const onButton = getByText('ON');
    const offButton = getByText('OFF');

    expect(onButton).not.toHaveAttribute('data-isactive', 'true');
    expect(onButton).not.toHaveAttribute('data-appearance', 'secondary');
    expect(offButton).not.toHaveAttribute('data-isactive', 'true');
    expect(offButton).not.toHaveAttribute('data-appearance', 'secondary');
  });

  test('should respond to a click handler', () => {
    const spy = jest.fn();
    const { getByText } = render(
      <ButtonGroup defaultActiveButton="ON" onChange={spy}>
        <Button name="ON" appearance="secondary">
          ON
        </Button>
        <Button name="OFF" appearance="secondary">
          OFF
        </Button>
      </ButtonGroup>,
    );

    const offButton = getByText('OFF');

    fireEvent.click(offButton);

    expect(spy).toHaveBeenCalledTimes(1);
  });

  test('should call the onclick handler on child button', () => {
    const spy = jest.fn();
    const spy2 = jest.fn();
    const { getByText } = render(
      <ButtonGroup defaultActiveButton="ON" onChange={spy}>
        <Button name="ON" appearance="secondary">
          ON
        </Button>
        <Button name="OFF" appearance="secondary" onClick={spy2}>
          OFF
        </Button>
      </ButtonGroup>,
    );

    const offButton = getByText('OFF');

    fireEvent.click(offButton);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy2).toHaveBeenCalledTimes(1);
  });

  test('should throw an error if child has not name props', () => {
    const renderComponent = () =>
      render(
        <ButtonGroup defaultActiveButtonName="ON">
          <Button appearance="secondary">ON</Button>
          <Button appearance="secondary">OFF</Button>
        </ButtonGroup>,
      );
    expect(renderComponent).toThrow('"name" prop must be provided to Button');
  });
});
