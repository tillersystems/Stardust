import React from 'react';
import { fireEvent } from 'react-testing-library';
import Theme from '../../../Theme';

import TextInput from '..';

describe('<TextInput />', () => {
  test('should render without a problem', () => {
    const { container } = render(
      <TextInput placeholder="default input" id="test" tabIndex="0" value="" />,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('should render without a problem when focused and unfocused', () => {
    const { getByTestId } = render(<TextInput />);
    const inputeNode = getByTestId('input');

    fireEvent.focus(inputeNode);
    expect(render).toMatchSnapshot();

    fireEvent.blur(inputeNode);
    expect(render).toMatchSnapshot();
  });

  test('allow the user to type a word', () => {
    const { getByTestId } = render(<TextInput />);
    const inputeNode = getByTestId('input');
    const inputValue = 'hello';

    fireEvent.change(inputeNode, { target: { value: inputValue } });

    expect(inputeNode.value).toEqual(inputValue);
  });

  test('should call change handler when controlled and text changed', () => {
    const spy = jest.fn();
    const { getByTestId } = render(<TextInput onChange={spy} />);
    const inputeNode = getByTestId('input');
    const inputValue = 'hello';

    fireEvent.change(inputeNode, { target: { value: inputValue } });

    expect(spy.mock.calls[0][0]).toBe('hello');
  });

  test('should not call change handler when controlled and disabled and text changed', () => {
    const spy = jest.fn();
    const { getByTestId } = render(<TextInput disabled onChange={spy} />);
    const inputeNode = getByTestId('input');
    const inputValue = 'hello';

    fireEvent.change(inputeNode, { target: { value: inputValue } });

    expect(spy).not.toHaveBeenCalled();
  });

  test('should have a custom width', () => {
    const width = '123rem';
    const { container } = render(<TextInput width={width} />);

    expect(container.firstChild).toHaveStyleRule('width', width);
  });

  test('should render as fluid', () => {
    const { container } = render(<TextInput fluid />);

    expect(container.firstChild).toHaveStyleRule('width', '100%');
  });

  test('should have a different type', () => {
    const { getByTestId } = render(<TextInput type="password" value="" />);
    const inputeNode = getByTestId('input');

    expect(inputeNode.type).toMatchSnapshot();
  });

  test('should have an icon label', () => {
    const { container } = render(<TextInput value="" label={{ icon: 'cog' }} />);

    expect(container.firstChild).toMatchSnapshot();
  });

  test('should have an icon icon label and label position', () => {
    const { container } = render(
      <TextInput value="" label={{ icon: 'cog' }} labelPosition="right" />,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('should have a text label', () => {
    const { container } = render(<TextInput value="" label={{ text: 'Pickle Rick' }} />);

    expect(container.firstChild).toMatchSnapshot();
  });

  test('should render disabled without problem', () => {
    const { container, getByTestId } = render(<TextInput disabled value="" />);
    const inputeNode = getByTestId('input');

    expect(container.firstChild).toHaveStyleRule('opacity', '0.4');
    expect(container.firstChild).toHaveStyleRule('border-color', Theme.palette.lightGrey);
    expect(inputeNode.disabled).toBeTruthy();
  });

  test('should have a loading status', () => {
    const { getByTestId } = render(<TextInput loading value="" />);
    const statusNode = getByTestId('status');

    expect(statusNode).toBeInTheDocument();
  });

  test('should have a status info', () => {
    const { container, getByTestId } = render(<TextInput info value="" />);
    const statusNode = getByTestId('status');

    expect(container.firstChild).toHaveStyleRule('border-color', Theme.palette.primary.default);
    expect(statusNode).toBeInTheDocument();
  });

  test('should have a status success', () => {
    const { container, getByTestId } = render(<TextInput success value="" />);
    const statusNode = getByTestId('status');

    expect(container.firstChild).toHaveStyleRule('border-color', Theme.palette.success.default);
    expect(statusNode).toBeInTheDocument();
  });

  test('should have a status warning', () => {
    const { container, getByTestId } = render(<TextInput warning value="" />);
    const statusNode = getByTestId('status');

    expect(container.firstChild).toHaveStyleRule('border-color', Theme.palette.warning.default);
    expect(statusNode).toBeInTheDocument();
  });

  test('should render error without problem', () => {
    const { container, getByTestId } = render(<TextInput error value="" />);
    const statusNode = getByTestId('status');

    expect(container.firstChild).toHaveStyleRule('border-color', Theme.palette.failure.default);
    expect(statusNode).toBeInTheDocument();
  });

  test('should render ghost input without problem', () => {
    const { container } = render(<TextInput ghost value="" />);

    expect(container.firstChild).toHaveStyleRule('border-color', 'transparent');
  });

  test('should have a search status', () => {
    const { getByTestId } = render(<TextInput search value="" />);
    const statusNode = getByTestId('status');

    expect(statusNode).toBeInTheDocument();
  });

  test('should render search status input without problem when focused', () => {
    const { container, getByTestId } = render(<TextInput search value="" />);
    const inputeNode = getByTestId('input');

    fireEvent.click(inputeNode);

    expect(container.firstChild).toMatchSnapshot();
  });
});
