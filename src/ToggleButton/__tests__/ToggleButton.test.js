import React from 'react';
import { fireEvent } from 'react-testing-library';

import ToggleButton from '..';

describe('<ToggleButton />', () => {
  test('should render without a problem', () => {
    const { container } = render(<ToggleButton />);

    expect(container.firstChild).toMatchSnapshot();
  });

  test('should render without a problem when checked', () => {
    const { container } = render(<ToggleButton checked />);

    expect(container.firstChild).toMatchSnapshot();
  });

  test('should render without a problem when disabled', () => {
    const { container, getByTestId } = render(<ToggleButton disabled />);
    const toggleNode = getByTestId('toggle-button');

    expect(container.firstChild).toHaveStyleRule('cursor', 'not-allowed');
    expect(toggleNode).toHaveStyleRule('opacity', '0.4');
  });

  test('should toggle', () => {
    const { container } = render(<ToggleButton />);

    fireEvent.click(container.firstChild);

    expect(render).toMatchSnapshot();

    fireEvent.click(container.firstChild);

    expect(render).toMatchSnapshot();
  });

  test('should call change handler when enabled', () => {
    const handleToggleMock = jest.fn();
    const { container } = render(<ToggleButton checked onToggle={handleToggleMock} />);

    fireEvent.click(container.firstChild);

    expect(handleToggleMock).toHaveBeenCalledTimes(1);
  });

  test('should not call change handler when disabled', () => {
    const handleToggleMock = jest.fn();
    const { container } = render(<ToggleButton checked disabled onToggle={handleToggleMock} />);

    fireEvent.click(container.firstChild);

    expect(handleToggleMock).not.toHaveBeenCalled();
  });
});
