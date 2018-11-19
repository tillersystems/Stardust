import React from 'react';
import 'jest-styled-components';

import Dropdown from '..';

describe('<Dropdown />', () => {
  it('should render without a problem', () => {
    const render = mountWithTheme(
      <Dropdown title="title">
        <div>Item1</div>
        <div>Item2</div>
        <div>Item3</div>
      </Dropdown>,
    );

    expect(render).toMatchSnapshot();
  });

  it('should toogle the dropdown', () => {
    const render = mountWithTheme(
      <Dropdown title="title">
        <div>Item1</div>
        <div>Item2</div>
        <div>Item3</div>
      </Dropdown>,
    );

    // Open Dropdown
    render
      .find('[data-test="dropdown-header"]')
      .at(1)
      .simulate('click');

    expect(render).toMatchSnapshot();

    // Close Dropdown
    render
      .find('[data-test="dropdown-header"]')
      .at(1)
      .simulate('click');

    expect(render).toMatchSnapshot();
  });

  it('should close the dropdown when clicking outside of the component', () => {
    const render = mountWithTheme(
      <Dropdown title="title">
        <div>Item1</div>
        <div>Item2</div>
        <div>Item3</div>
      </Dropdown>,
    );

    // Open Dropdown
    render
      .find('[data-test="dropdown-header"]')
      .at(1)
      .simulate('click');

    expect(render).toMatchSnapshot();

    // Clicking oustide of the conponent
    // we need tout dispatch a mousedown event: react-onclickoutside library
    // explicitly listened for mousedown events.
    // See: https://github.com/Pomax/react-onclickoutside/issues/104
    document.dispatchEvent(new MouseEvent('mousedown'));

    expect(render).toMatchSnapshot();
  });

  it('should filter items', () => {
    const render = mountWithTheme(
      <Dropdown title="title" searchable>
        <div>Item1</div>
        <div>Item2</div>
        <div>Item3</div>
      </Dropdown>,
    );

    // Open Dropdown
    render
      .find('[data-test="dropdown-header"]')
      .at(1)
      .simulate('click');

    // Type Item2 in search input
    render
      .find('[data-test="search-input"] input')
      .simulate('change', { target: { value: 'Item2' } });

    expect(render).toMatchSnapshot();
  });

  it('should return Not Found if not item found', () => {
    const render = mountWithTheme(
      <Dropdown title="title" searchable noResultLabel="Not Found">
        <div>Item1</div>
        <div>Item2</div>
        <div>Item3</div>
      </Dropdown>,
    );

    // Open Dropdown
    render
      .find('[data-test="dropdown-header"]')
      .at(1)
      .simulate('click');

    // Type Item2 in search input
    render
      .find('[data-test="search-input"] input')
      .simulate('change', { target: { value: 'qwerty' } });

    expect(render).toMatchSnapshot();
  });
});
