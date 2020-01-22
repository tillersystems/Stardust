import React from 'react';
import { fireEvent } from '@testing-library/react';
import Theme from '../../Theme';

import CheckBox from '..';

describe('<CheckBox />', () => {
  test('should render without a problem', () => {
    const { container } = render(<CheckBox>label</CheckBox>);

    expect(container.firstChild).toMatchSnapshot();
  });

  test('should render an initial selected checkbox', () => {
    const { getByTestId } = render(<CheckBox isDefaultChecked>label</CheckBox>);

    const labelNode = getByTestId(/checkBox-label/);
    const styledCheckBoxNode = getByTestId(/styled-checkBox/);

    expect(labelNode).toHaveStyleRule('color', Theme.palette.primary.default);
    expect(labelNode).toHaveStyleRule('font-weight', JSON.stringify(Theme.fonts.weight.thick));

    expect(styledCheckBoxNode).toHaveClass('checked');
  });

  test('should be disabled', () => {
    const { getByTestId } = render(<CheckBox isDisabled>label</CheckBox>);
    const labelNode = getByTestId(/checkBox-label/);

    expect(labelNode).toHaveStyleRule('opacity', '0.4');
    expect(labelNode).toHaveStyleRule('cursor', 'not-allowed');
  });

  test('should toggle', () => {
    const { getByTestId } = render(<CheckBox>label</CheckBox>);

    const labelNode = getByTestId(/checkBox-label/);
    const styledCheckBoxNode = getByTestId(/styled-checkBox/);

    fireEvent.click(labelNode);

    expect(labelNode).toHaveStyleRule('color', Theme.palette.primary.default);
    expect(labelNode).toHaveStyleRule('font-weight', JSON.stringify(Theme.fonts.weight.thick));

    expect(styledCheckBoxNode).toHaveClass('checked');

    fireEvent.click(labelNode);

    expect(labelNode).toHaveStyleRule('color', Theme.palette.spaceGrey);
    expect(labelNode).not.toHaveStyleRule('font-weight');

    expect(styledCheckBoxNode).toHaveStyleRule('border', `1px solid ${Theme.palette.lightGrey}`);
    expect(styledCheckBoxNode).toHaveStyleRule('background', Theme.palette.white);
  });

  test('should not toggle when disabled', () => {
    const { getByTestId } = render(<CheckBox isDisabled>label</CheckBox>);

    const labelNode = getByTestId(/checkBox-label/);
    const styledCheckBoxNode = getByTestId(/styled-checkBox/);

    fireEvent.click(labelNode);

    expect(labelNode).toHaveStyleRule('color', Theme.palette.spaceGrey);

    expect(styledCheckBoxNode).not.toHaveClass('checked');

    fireEvent.click(labelNode);

    expect(labelNode).toHaveStyleRule('color', Theme.palette.spaceGrey);

    expect(styledCheckBoxNode).not.toHaveClass('checked');
  });

  test('should call componentDidUpdate', () => {
    const { getByLabelText, rerender } = render(<CheckBox>label</CheckBox>);
    const checkboxNode = getByLabelText('label');

    expect(checkboxNode).not.toBeNull();

    rerender(<CheckBox checked>label</CheckBox>);

    expect(checkboxNode).not.toBeNull();
  });

  test('should call onChange callback', () => {
    const spy = jest.fn();
    const { getByLabelText } = render(<CheckBox onChange={spy}>label</CheckBox>);
    const checkboxLabelNode = getByLabelText('label');

    fireEvent.click(checkboxLabelNode);

    expect(spy).toHaveBeenCalledTimes(1);
  });

  test('should not call onChange callback when CheckBox is disabled', () => {
    const spy = jest.fn();
    const { getByTestId } = render(
      <CheckBox isDisabled onChange={spy}>
        label
      </CheckBox>,
    );
    const labelNode = getByTestId(/checkBox-label/);

    fireEvent.click(labelNode);

    expect(spy).toHaveBeenCalledTimes(0);
  });
});
