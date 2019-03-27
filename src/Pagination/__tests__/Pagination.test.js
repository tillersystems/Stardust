import React from 'react';
import { fireEvent } from 'react-testing-library';

import Pagination from '..';
import Theme from '../../Theme';

/**
 * Test suit for Pagination component.
 */
describe('<Pagination />', () => {
  test('should render without a problem', () => {
    const { container } = render(<Pagination pageCount={10} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('should render without a problem without large number of pages', () => {
    const { container } = render(<Pagination pageCount={2} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('should render whithout problem on center', () => {
    const { container } = render(<Pagination pageCount={2} align="center" />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('should render whithout problem on left', () => {
    const { container } = render(<Pagination pageCount={2} align="left" />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('should select a page', () => {
    const { getByText } = render(<Pagination pageCount={10} />);

    const selectedPage = getByText('2');

    fireEvent.click(selectedPage);

    expect(selectedPage).toHaveStyleRule('background-color', Theme.palette.primary.default);
  });

  test('should select the last page', () => {
    const { getByText } = render(<Pagination pageCount={10} />);

    const selectedPage = getByText('10');

    fireEvent.click(selectedPage);

    expect(selectedPage).toHaveStyleRule('background-color', Theme.palette.primary.default);
  });

  test('should select a page in the middle', () => {
    const { getByText, getByTestId } = render(<Pagination pageCount={10} />);

    const arrowRight = getByTestId('arrow-right');

    fireEvent.click(arrowRight);
    fireEvent.click(arrowRight);
    fireEvent.click(arrowRight);
    fireEvent.click(arrowRight);

    const selectedPage = getByText('5');

    expect(selectedPage).toHaveStyleRule('background-color', Theme.palette.primary.default);
  });

  test('should go to next page on arrow right click', () => {
    const { getByTestId, getByText } = render(<Pagination pageCount={10} />);

    const arrowRight = getByTestId('arrow-right');
    const selectedPage = getByText('2');

    fireEvent.click(arrowRight);

    expect(selectedPage).toHaveStyleRule('background-color', Theme.palette.primary.default);
  });

  test('should go to previous page on arrow left click', () => {
    const { getByTestId, getByText } = render(<Pagination pageCount={10} />);

    const arrowRight = getByTestId('arrow-right');
    const arrowLeft = getByTestId('arrow-left');
    const firstPage = getByText('1');

    fireEvent.click(arrowRight);
    fireEvent.click(arrowLeft);

    expect(firstPage).toHaveStyleRule('background-color', Theme.palette.primary.default);
  });

  test('should call callback function', () => {
    const spy = jest.fn();

    const { getByTestId } = render(<Pagination pageCount={10} getRequestedPageNumber={spy} />);

    const arrowRight = getByTestId('arrow-right');

    fireEvent.click(arrowRight);

    expect(spy).toHaveBeenCalled();
  });
});
