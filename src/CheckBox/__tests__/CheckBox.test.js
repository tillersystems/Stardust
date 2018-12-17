import React from 'react';
import { fireEvent } from 'react-testing-library';

import CheckBox from '..';

describe('<CheckBox />', () => {
  test('should render without a problem', () => {
    const { container } = render(<CheckBox>label</CheckBox>);

    expect(container.firstChild).toMatchSnapshot();
  });

  test('should render an initial selected checkbox', () => {
    const { container } = render(<CheckBox checked>label</CheckBox>);

    expect(container.firstChild).toMatchSnapshot();
  });

  test('should be disabled', () => {
    const { getByTestId } = render(<CheckBox disabled>label</CheckBox>);
    const checkboxNode = getByTestId('checkBoxContainer');

    expect(checkboxNode).toHaveStyleRule('opacity', '0.4');
    expect(checkboxNode).toHaveStyleRule('cursor', 'not-allowed');
  });

  test('should be checked on change', () => {
    const { getByLabelText } = render(<CheckBox>label</CheckBox>);
    const checkboxNode = getByLabelText('label');

    fireEvent.click(checkboxNode);

    expect(checkboxNode).toMatchSnapshot();
  });

  test('should not be checked with change when disabled', () => {
    const spy = jest.fn();
    const { container, getByLabelText } = render(
      <CheckBox disabled onChange={spy}>
        label
      </CheckBox>,
    );
    const checkboxLabelNode = getByLabelText('label');

    fireEvent.click(checkboxLabelNode);

    expect(container.firstChild).toMatchSnapshot();
  });

  test('should call onChange callback', () => {
    const spy = jest.fn();
    const { getByLabelText } = render(<CheckBox onChange={spy}>label</CheckBox>);
    const checkboxLabelNode = getByLabelText('label');

    fireEvent.click(checkboxLabelNode);

    expect(spy).toHaveBeenCalledTimes(1);
  });

  // test('should stopPropagation on input to prevents clicking on the label trigging the event twice', () => {
  //   const spy = jest.fn();
  //   const { getByTestId } = render(<CheckBox onChange={spy}>label</CheckBox>);
  //   const checkboxInputNode = getByTestId('checkBoxInput');
  //
  //   fireEvent.click(checkboxInputNode);
  //
  //   expect(spy).toHaveBeenCalledTimes(0);
  // });
});
