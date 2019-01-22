import React from 'react';
import { fireEvent } from 'react-testing-library';

import Tooltip from '..';

describe('<Tooltip />', () => {
  test('should render without a problem', () => {
    const { container } = render(
      <Tooltip
        title="Ventes nettes (ventes brutes moins les réductions et les annulations) plus les taxes
        sur la période séléctionnée."
      >
        <button type="button">Show Tooltip</button>
      </Tooltip>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('should render without a problem with inverted color', () => {
    const { container } = render(
      <Tooltip
        invertColor
        title="Ventes nettes (ventes brutes moins les réductions et les annulations) plus les taxes
        sur la période séléctionnée."
      >
        <button type="button">Show Tooltip</button>
      </Tooltip>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('should render open a tooltip without a problem', () => {
    const { getByTestId } = render(
      <Tooltip
        active
        title="Ventes nettes (ventes brutes moins les réductions et les annulations) plus les taxes
        sur la période séléctionnée."
      >
        <button type="button">Show Tooltip</button>
      </Tooltip>,
    );
    const tooltipNode = getByTestId('tooltip');

    expect(tooltipNode).toBeInTheDocument();
  });

  test('should render with a different width', () => {
    const width = '40rem';
    const { getByTestId } = render(
      <Tooltip
        active
        width={width}
        title="Ventes nettes (ventes brutes moins les réductions et les annulations) plus les taxes
        sur la période séléctionnée."
      >
        <button type="button">Show Tooltip</button>
      </Tooltip>,
    );
    const tooltipNode = getByTestId('tooltip');

    expect(tooltipNode).toHaveStyleRule('width', width);
  });

  test('should toggle on click', done => {
    const buttonText = 'Show Tooltip';
    const { queryByTestId, getByTestId, getByText } = render(
      <Tooltip
        title="Ventes nettes (ventes brutes moins les réductions et les annulations) plus les taxes
        sur la période séléctionnée."
      >
        <button type="button">{buttonText}</button>
      </Tooltip>,
    );
    const buttonNode = getByText(buttonText);

    fireEvent.click(buttonNode);

    let tooltipNode;
    tooltipNode = getByTestId('tooltip');

    expect(tooltipNode).toBeInTheDocument();

    fireEvent.click(buttonNode);

    setTimeout(() => {
      tooltipNode = queryByTestId('tooltip');
      expect(tooltipNode).toBeNull();
      done();
    }, 500);
  });

  test('should toggle on mouseEnter/mouseLeave ', done => {
    const buttonText = 'Show Tooltip';
    const { queryByTestId, getByTestId, getByText } = render(
      <Tooltip
        hover
        title="Ventes nettes (ventes brutes moins les réductions et les annulations) plus les taxes
        sur la période séléctionnée."
      >
        <button type="button">{buttonText}</button>
      </Tooltip>,
    );
    const buttonNode = getByText(buttonText);

    fireEvent.mouseEnter(buttonNode);

    let tooltipNode;
    tooltipNode = getByTestId('tooltip');

    expect(tooltipNode).toBeInTheDocument();

    fireEvent.mouseLeave(buttonNode);

    setTimeout(() => {
      tooltipNode = queryByTestId('tooltip');
      expect(tooltipNode).toBeNull();
      done();
    }, 500);
  });

  test('should render a tooltip  displayed above the element', () => {
    const { getByTestId } = render(
      <Tooltip
        active
        top
        title="Ventes nettes (ventes brutes moins les réductions et les annulations) plus les taxes
        sur la période séléctionnée."
      >
        <button type="button">Show Tooltip</button>
      </Tooltip>,
    );
    const tooltipNode = getByTestId('tooltip');

    expect(tooltipNode).toHaveStyleRule('bottom', '100%');
    expect(tooltipNode).toHaveStyleRule('top', 'auto');
  });
});
