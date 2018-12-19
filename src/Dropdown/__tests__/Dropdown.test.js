import React from 'react';
import { fireEvent } from 'react-testing-library';

import Dropdown from '..';

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

  test('should toggle the dropdown', done => {
    const props = { title: 'title' };
    const { queryAllByText, getByText } = render(
      <Dropdown {...props}>
        <div>Item1</div>
        <div>Item2</div>
        <div>Item3</div>
      </Dropdown>,
    );
    const button = getByText(props.title);

    expect(button).toHaveAttribute('aria-expanded', 'false');
    expect(button).toHaveAttribute('aria-haspopup', 'true');

    // Open Dropdown
    fireEvent.click(button);

    expect(button).toHaveAttribute('aria-expanded', 'true');
    expect(button).toHaveAttribute('aria-haspopup', 'true');

    let ItemNode;
    ItemNode = queryAllByText(/Item/);

    expect(ItemNode).toHaveLength(3);
    expect(ItemNode[0]).toBeInTheDocument();
    expect(ItemNode[1]).toBeInTheDocument();
    expect(ItemNode[2]).toBeInTheDocument();

    // Close Dropdown
    fireEvent.click(button);

    setTimeout(() => {
      ItemNode = queryAllByText(/Item/);
      expect(button).toHaveAttribute('aria-expanded', 'false');
      expect(button).toHaveAttribute('aria-haspopup', 'true');
      expect(ItemNode[0]).toBeUndefined();
      expect(ItemNode[1]).toBeUndefined();
      expect(ItemNode[2]).toBeUndefined();
      done();
    }, 500);
  });

  test('should close the dropdown when clicking outside of the component', done => {
    const props = { title: 'title' };
    const { queryAllByText, getByText } = render(
      <Dropdown {...props}>
        <div>Item1</div>
        <div>Item2</div>
        <div>Item3</div>
      </Dropdown>,
    );

    const button = getByText(props.title);

    expect(button).toHaveAttribute('aria-expanded', 'false');
    expect(button).toHaveAttribute('aria-haspopup', 'true');

    // Open Dropdown
    fireEvent.click(button);

    expect(button).toHaveAttribute('aria-expanded', 'true');
    expect(button).toHaveAttribute('aria-haspopup', 'true');

    let ItemNode;
    ItemNode = queryAllByText(/Item/);

    expect(ItemNode).toHaveLength(3);
    expect(ItemNode[0]).toBeInTheDocument();
    expect(ItemNode[1]).toBeInTheDocument();
    expect(ItemNode[2]).toBeInTheDocument();

    // Clicking outside of the conponent
    // we need to dispatch a mousedown event: react-onclickoutside library
    // explicitly listening for mousedown events.
    // See: https://github.com/Pomax/react-onclickoutside/issues/104
    document.dispatchEvent(new MouseEvent('mousedown'));

    setTimeout(() => {
      ItemNode = queryAllByText(/Item/);
      expect(button).toHaveAttribute('aria-expanded', 'false');
      expect(button).toHaveAttribute('aria-haspopup', 'true');
      expect(ItemNode[0]).toBeUndefined();
      expect(ItemNode[1]).toBeUndefined();
      expect(ItemNode[2]).toBeUndefined();
      done();
    }, 500);
  });

  test('should filter items', () => {
    const props = { title: 'title', searchable: true, searchBarPlaceholder: 'search' };
    const { queryAllByText, getByText, getByPlaceholderText } = render(
      <Dropdown {...props}>
        <div>Item1</div>
        <div>Item2</div>
        <div>Item3</div>
      </Dropdown>,
    );

    const button = getByText(props.title);

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
    const { queryAllByText, getByText, getByPlaceholderText } = render(
      <Dropdown {...props}>
        <div>Item1</div>
        <div>Item2</div>
        <div>Item3</div>
      </Dropdown>,
    );

    const button = getByText(props.title);

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
});
