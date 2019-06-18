import React from 'react';
import { fireEvent } from '@testing-library/react';

import NumberInput from '..';
import Theme from '../../../Theme';

describe('<NumberInput />', () => {
  let addEventListener = null;

  beforeEach(() => {
    addEventListener = document.addEventListener;
  });

  afterEach(() => {
    document.addEventListener = addEventListener;
  });

  test('should render without a problem', () => {
    const { container } = render(<NumberInput />);

    expect(container.firstChild).toMatchSnapshot();
  });

  test('should render without a problem when focused and unfocused', () => {
    const { container, getByTestId } = render(<NumberInput />);
    const inputNode = getByTestId('input');
    const inputNodeContainer = getByTestId('input-container');

    fireEvent.focus(inputNode);
    expect(inputNodeContainer).toHaveStyleRule('border-color', Theme.palette.primary.default);

    fireEvent.blur(inputNode);
    expect(container.firstChild).not.toHaveStyleRule('border-color');
    expect(container.firstChild).toHaveStyleRule('border', `1px solid ${Theme.palette.lightGrey}`);
  });

  test('allow the user to type numbers', () => {
    const { getByTestId } = render(<NumberInput />);
    const inputeNode = getByTestId('input');
    const inputValue = '123';

    fireEvent.change(inputeNode, { target: { value: inputValue } });

    expect(inputeNode.value).toEqual(inputValue);
  });

  test('should call change handler when controlled and value changed', () => {
    const spy = jest.fn();
    const { getByTestId } = render(<NumberInput onChange={spy} />);
    const inputeNode = getByTestId('input');
    const inputValue = '123';

    fireEvent.change(inputeNode, { target: { value: inputValue } });

    expect(spy).toHaveBeenCalledWith(123);
  });

  test('should not call change handler when controlled and disabled and text changed', () => {
    const spy = jest.fn();
    const { getByTestId } = render(<NumberInput disabled onChange={spy} />);
    const inputeNode = getByTestId('input');
    const inputValue = '123';

    fireEvent.change(inputeNode, { target: { value: inputValue } });

    expect(spy).not.toHaveBeenCalled();
  });

  test('should have a custom width', () => {
    const width = '123rem';
    const { container } = render(<NumberInput width={width} />);

    expect(container.firstChild).toHaveStyleRule('width', width);
  });

  test('should render as fluid', () => {
    const { container } = render(<NumberInput fluid />);

    expect(container.firstChild).toHaveStyleRule('width', '100%');
  });

  test('should have an icon label', () => {
    const { container } = render(<NumberInput label={{ icon: 'cog' }} />);

    expect(container.firstChild).toMatchSnapshot();
  });

  test('should have an icon icon label and label position', () => {
    const { container } = render(<NumberInput label={{ icon: 'cog' }} labelPosition="right" />);

    expect(container.firstChild).toMatchSnapshot();
  });

  test('should have a text label', () => {
    const { container } = render(<NumberInput label={{ text: 'Pickle Rick' }} />);

    expect(container.firstChild).toMatchSnapshot();
  });

  test('should render disabled without problem', () => {
    const { container, getByTestId } = render(<NumberInput disabled />);
    const inputeNode = getByTestId('input');

    expect(container.firstChild).toHaveStyleRule('opacity', '0.4');
    expect(container.firstChild).toHaveStyleRule('border-color', Theme.palette.lightGrey);
    expect(inputeNode.disabled).toBeTruthy();
  });

  test('should have a status info', () => {
    const { container, getByTestId } = render(<NumberInput info />);
    const statusNode = getByTestId('status');

    expect(container.firstChild).toHaveStyleRule('border-color', Theme.palette.primary.default);
    expect(statusNode).toBeInTheDocument();
  });

  test('should have a status success', () => {
    const { container, getByTestId } = render(<NumberInput success />);
    const statusNode = getByTestId('status');

    expect(container.firstChild).toHaveStyleRule('border-color', Theme.palette.success.default);
    expect(statusNode).toBeInTheDocument();
  });

  test('should have a status warning', () => {
    const { container, getByTestId } = render(<NumberInput warning />);
    const statusNode = getByTestId('status');

    expect(container.firstChild).toHaveStyleRule('border-color', Theme.palette.warning.default);
    expect(statusNode).toBeInTheDocument();
  });

  test('should have a status error', () => {
    const { container, getByTestId } = render(<NumberInput error />);
    const statusNode = getByTestId('status');

    expect(container.firstChild).toHaveStyleRule('border-color', Theme.palette.failure.default);
    expect(statusNode).toBeInTheDocument();
  });

  test('should increase amount when focused and key up pressed', () => {
    let keyDownListener;
    document.addEventListener = jest.fn((event, listener) => {
      if (event === 'keydown') keyDownListener = listener;
    });

    const spy = jest.fn();
    const { getByTestId } = render(<NumberInput onChange={spy} />);
    const inputeNode = getByTestId('input');

    if (!keyDownListener) throw new Error('Expected keyDownListener not to be undefined.');

    fireEvent.focus(inputeNode);
    keyDownListener({ code: 'ArrowUp' });

    expect(spy).toHaveBeenCalledWith(1);
  });

  test('should not increase amount when not focused and key up pressed', () => {
    let keyDownListener;
    document.addEventListener = jest.fn((event, listener) => {
      if (event === 'keydown') keyDownListener = listener;
    });

    const spy = jest.fn();
    const { getByTestId } = render(<NumberInput onChange={spy} />);
    const inputeNode = getByTestId('input');

    if (!keyDownListener) throw new Error('Expected keyDownListener not to be undefined.');

    fireEvent.blur(inputeNode);
    keyDownListener({ code: 'ArrowUp' });
    expect(spy).not.toHaveBeenCalled();
  });

  test('should decrease amount when focused and key down pressed', () => {
    let keyDownListener;
    document.addEventListener = jest.fn((event, listener) => {
      if (event === 'keydown') keyDownListener = listener;
    });

    const spy = jest.fn();
    const { getByTestId } = render(<NumberInput onChange={spy} />);
    const inputeNode = getByTestId('input');

    if (!keyDownListener) throw new Error('Expected keyDownListener not to be undefined.');

    fireEvent.focus(inputeNode);
    keyDownListener({ code: 'ArrowDown' });

    expect(spy).toHaveBeenCalledWith(-1);
  });

  test('should not decrease amount when not focused and key up pressed', () => {
    let keyDownListener;
    document.addEventListener = jest.fn((event, listener) => {
      if (event === 'keydown') keyDownListener = listener;
    });

    const spy = jest.fn();
    const { getByTestId } = render(<NumberInput onChange={spy} />);
    const inputeNode = getByTestId('input');

    if (!keyDownListener) throw new Error('Expected keyDownListener not to be undefined.');

    fireEvent.blur(inputeNode);
    keyDownListener({ code: 'ArrowDown' });

    expect(spy).not.toHaveBeenCalled();
  });

  test('should update value when a min is given a input is lower', () => {
    const inputValue = '123';
    const spy = jest.fn();
    const { getByTestId } = render(<NumberInput min={456} onChange={spy} />);
    const inputeNode = getByTestId('input');

    fireEvent.change(inputeNode, { target: { value: inputValue } });

    expect(spy).toHaveBeenCalledWith(456);
  });

  test('should update value when a max is given a input is greater', () => {
    const inputValue = '789';
    const spy = jest.fn();
    const { getByTestId } = render(<NumberInput max={456} onChange={spy} />);
    const inputeNode = getByTestId('input');

    fireEvent.change(inputeNode, { target: { value: inputValue } });

    expect(spy).toHaveBeenCalledWith(456);
  });
});
