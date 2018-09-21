import React from 'react';
import 'jest-styled-components';

import ToggleButton from '..';

describe('<ToggleButton />', () => {
  it('should render without a problem', () => {
    const render = shallowWithTheme(<ToggleButton />);

    expect(render.dive()).toMatchSnapshot();
  });

  it('should render without a problem when checked and disabled', () => {
    const render = shallowWithTheme(<ToggleButton checked disabled />);

    expect(render.dive()).toMatchSnapshot();
  });

  it('should render without a problem when unchecked and disabled', () => {
    const render = shallowWithTheme(<ToggleButton checked={false} disabled />);

    expect(render.dive()).toMatchSnapshot();
  });

  it('should render without a problem when checked and not disabled', () => {
    const render = shallowWithTheme(<ToggleButton checked disabled={false} />);

    expect(render.dive()).toMatchSnapshot();
  });

  it('should render without a problem when unchecked and not disabled', () => {
    const render = shallowWithTheme(<ToggleButton checked={false} disabled={false} />);

    expect(render.dive()).toMatchSnapshot();
  });

  it('should call change handler when enabled', () => {
    const handleToggleMock = jest.fn();
    const render = mountWithTheme(<ToggleButton checked enabled onToggle={handleToggleMock} />);

    render.find('ToggleButton').simulate('click');

    expect(handleToggleMock).toHaveBeenCalled();
  });

  it('should not call change handler when disabled', () => {
    const handleToggleMock = jest.fn();
    const render = mountWithTheme(<ToggleButton checked disabled onToggle={handleToggleMock} />);

    render.find('ToggleButton').simulate('click');

    expect(handleToggleMock).not.toHaveBeenCalled();
  });
});
