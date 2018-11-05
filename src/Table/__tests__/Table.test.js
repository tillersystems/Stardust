import React from 'react';
import { mount } from 'enzyme';
import 'jest-styled-components';
import { ThemeProvider } from 'styled-components';

import Table from '..';
import Theme from '../../Theme';

/* eslint-disable react/prop-types */
const StubComponent = ({ value }) => <div>{value}</div>;
StubComponent.displayName = 'StubComponent';

const colsDef = [
  {
    title: 'X',
    value: d => d.x,
    width: 1,
    sortable: true,
  },
  {
    title: <StubComponent value="Y" />,
    value: d => d.y,
    width: 2,
  },
  {
    title: 'Z',
    value: d => d.z,
    format: v => `z = ${v}`,
    width: '15rem',
  },
  {
    title: 'T',
    value: d => d.t,
    /* eslint-disable react/display-name */
    format: v => <StubComponent value={`t = ${v}`} />,
  },
];

const data = [
  {
    x: 11,
    y: 12,
    z: 13,
    t: 14,
  },
  {
    x: 21,
    y: 22,
    z: 23,
    t: 24,
  },
  {
    x: 31,
    y: 32,
    z: 33,
    t: 34,
  },
  {
    x: 41,
    y: 42,
    z: 43,
    t: 44,
  },
  {
    x: 51,
    y: 52,
    z: 53,
    t: 54,
  },
  {
    x: 61,
    y: 62,
    z: 63,
    t: 64,
  },
  {
    x: 71,
    y: 72,
    z: 73,
    t: 74,
  },
  {
    x: 81,
    y: 82,
    z: 83,
    t: 84,
  },
  {
    x: 91,
    y: 92,
    z: 93,
    t: 94,
  },
];

describe('<Table />', () => {
  it('should render without a problem', () => {
    const render = mount(
      <ThemeProvider theme={Theme}>
        <Table colsDef={colsDef} data={data} />
      </ThemeProvider>,
    );
    expect(render).toMatchSnapshot();
  });

  it('should render without a problem when header on top', () => {
    const render = mount(
      <ThemeProvider theme={Theme}>
        <Table colsDef={colsDef} data={data} header="top" />
      </ThemeProvider>,
    );
    expect(render).toMatchSnapshot();
  });

  it('should render without a problem when header at bottom', () => {
    const render = mount(
      <ThemeProvider theme={Theme}>
        <Table colsDef={colsDef} data={data} header="bottom" />
      </ThemeProvider>,
    );
    expect(render).toMatchSnapshot();
  });

  it('should render without a problem when no header', () => {
    const render = mount(
      <ThemeProvider theme={Theme}>
        <Table colsDef={colsDef} data={data} header="none" />
      </ThemeProvider>,
    );
    expect(render).toMatchSnapshot();
  });

  it('should render without a problem when given a width', () => {
    const render = mount(
      <ThemeProvider theme={Theme}>
        <Table colsDef={colsDef} data={data} width="80rem" />
      </ThemeProvider>,
    );
    expect(render).toMatchSnapshot();
  });

  it('should render differently when clicked on sorting (asc)', () => {
    const render = mount(
      <ThemeProvider theme={Theme}>
        <Table colsDef={colsDef} data={data} width="80rem" />
      </ThemeProvider>,
    );

    expect(render).toMatchSnapshot();

    render.find('div[data="header-cell-0"] div[data="sorting"]').simulate('click');
    expect(render).toMatchSnapshot();

    render.find('div[data="header-cell-0"] div[data="sorting"]').simulate('click');
    expect(render).toMatchSnapshot();

    render.find('div[data="header-cell-0"] div[data="sorting"]').simulate('click');
    expect(render).toMatchSnapshot();
  });

  it('should render without a problem when given a compressed rows', () => {
    const render = mount(
      <ThemeProvider theme={Theme}>
        <Table colsDef={colsDef} data={data} width="80rem" compressedRows />
      </ThemeProvider>,
    );
    expect(render).toMatchSnapshot();
  });

  it('should render without a problem when given a no zebraValue', () => {
    const render = mount(
      <ThemeProvider theme={Theme}>
        <Table colsDef={colsDef} data={data} width="80rem" noZebra />
      </ThemeProvider>,
    );
    expect(render).toMatchSnapshot();
  });

  it('should render without a problem when rows are selectable', () => {
    const spy = jest.fn();
    const rowsDef = {
      selectable: true,
      onSelect: spy,
    };

    const render = mount(
      <ThemeProvider theme={Theme}>
        <Table colsDef={colsDef} rowsDef={rowsDef} data={data} width="80rem" noZebra />
      </ThemeProvider>,
    );

    expect(render).toMatchSnapshot();

    // Check selected row is highlighted
    render.find('div[data="body-row-2"]').simulate('click');
    expect(render).toMatchSnapshot();
    expect(spy).toHaveBeenCalled();

    render.find('div[data="header-cell-0"] div[data="sorting"]').simulate('click');
    expect(render).toMatchSnapshot();
  });
});
