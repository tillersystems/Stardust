import React from 'react';
import { fireEvent, waitForElementToBeRemoved } from '@testing-library/react';
import { css } from 'styled-components';

import Dropdown from '..';

jest.mock('popper.js');

describe('<Dropdown />', () => {
  test('should render without a problem', () => {
    const props = { title: 'title' };
    const { container } = render(
      <Dropdown {...props}>
        <div>Item1</div>
        <div>Item2</div>
        <div>Item3</div>
      </Dropdown>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });
  test('should render without a problem using portal', () => {
    const props = { title: 'title' };
    const { getByTestId } = render(
      <Dropdown usePortal {...props}>
        <div>Item1</div>
        <div>Item2</div>
        <div>Item3</div>
      </Dropdown>,
    );

    const node = getByTestId('positioned-portal');
    expect(node).toBeInTheDocument();
  });

  test('should toggle the dropdown', async () => {
    const props = { title: 'title' };
    const { container, queryAllByText } = render(
      <Dropdown {...props}>
        <div>Item1</div>
        <div>Item2</div>
        <div>Item3</div>
      </Dropdown>,
    );
    const button = container.querySelector('button');

    expect(button).toHaveAttribute('aria-expanded', 'false');
    expect(button).toHaveAttribute('aria-haspopup', 'true');

    // Open Dropdown
    fireEvent.click(button);

    expect(button).toHaveAttribute('aria-expanded', 'true');
    expect(button).toHaveAttribute('aria-haspopup', 'true');

    const ItemNode = queryAllByText(/Item/);

    expect(ItemNode).toHaveLength(3);
    expect(ItemNode[0]).toBeInTheDocument();
    expect(ItemNode[1]).toBeInTheDocument();
    expect(ItemNode[2]).toBeInTheDocument();

    // Close Dropdown
    fireEvent.click(button);

    expect(button).toHaveAttribute('aria-expanded', 'false');
    expect(button).toHaveAttribute('aria-haspopup', 'true');

    const ItemNodeRemoved = await waitForElementToBeRemoved(() => queryAllByText(/Item/));
    expect(ItemNodeRemoved[0]).toBeUndefined();
    expect(ItemNodeRemoved[1]).toBeUndefined();
    expect(ItemNodeRemoved[2]).toBeUndefined();
  });

  test('should filter items', () => {
    const props = { title: 'title', searchable: true, searchBarPlaceholder: 'search' };
    const { container, queryAllByText, getByText, getByPlaceholderText } = render(
      <Dropdown {...props}>
        <div>Item1</div>
        <div>Item2</div>
        <div>Item3</div>
      </Dropdown>,
    );

    const button = container.querySelector('button');

    expect(button).toHaveAttribute('aria-expanded', 'false');
    expect(button).toHaveAttribute('aria-haspopup', 'true');

    // Open Dropdown
    fireEvent.click(button);

    expect(button).toHaveAttribute('aria-expanded', 'true');
    expect(button).toHaveAttribute('aria-haspopup', 'true');

    // Type Item2 in search input
    fireEvent.change(getByPlaceholderText('search'), { target: { value: 'Item2' } });

    const ItemNode = queryAllByText(/Item/);
    const Item2Node = getByText('Item2');

    expect(ItemNode).toHaveLength(1);
    expect(Item2Node).toBeInTheDocument();
  });

  test('should return Not Found if not item found', () => {
    const props = {
      title: 'title',
      searchable: true,
      searchBarPlaceholder: 'search',
      noResultLabel: 'Not Found',
    };
    const { container, queryAllByText, getByText, getByPlaceholderText } = render(
      <Dropdown {...props}>
        <div>Item1</div>
        <div>Item2</div>
        <div>Item3</div>
      </Dropdown>,
    );

    const button = container.querySelector('button');

    expect(button).toHaveAttribute('aria-expanded', 'false');
    expect(button).toHaveAttribute('aria-haspopup', 'true');

    // Open Dropdown
    fireEvent.click(button);

    expect(button).toHaveAttribute('aria-expanded', 'true');
    expect(button).toHaveAttribute('aria-haspopup', 'true');

    const SearchInput = getByPlaceholderText(props.searchBarPlaceholder);

    // Type Item2 in search input
    fireEvent.change(SearchInput, { target: { value: 'qwerty' } });

    const NotFoundNode = getByText(props.noResultLabel);
    const ItemNode = queryAllByText(/Item/);

    expect(NotFoundNode).toBeInTheDocument();
    expect(ItemNode[0]).toBeUndefined();
    expect(ItemNode[1]).toBeUndefined();
    expect(ItemNode[2]).toBeUndefined();
  });

  test('should have expected custom style on each item', () => {
    const props = {
      title: 'title',
      itemCss: css`
        padding: 0.9rem 1.2rem;
        &:first-child {
          padding-top: 1.8rem;
        }
        &:last-child {
          padding-bottom: 1.8rem;
        }
      `,
    };
    const { container, getAllByRole } = render(
      <Dropdown {...props}>
        <div>Item1</div>
        <div>Item2</div>
        <div>Item3</div>
      </Dropdown>,
    );
    const button = container.querySelector('button');
    fireEvent.click(button);

    const [itemNode] = getAllByRole('menuitem');

    expect(itemNode).toHaveStyleRule('padding', '0.9rem 1.2rem');
  });
});
