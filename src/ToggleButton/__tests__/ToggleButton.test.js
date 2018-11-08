import React, { PureComponent } from 'react';
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
    const render = shallowWithTheme(<ToggleButton checked />);

    expect(render.dive()).toMatchSnapshot();
  });

  it('should render without a problem when unchecked and not disabled', () => {
    const render = shallowWithTheme(<ToggleButton checked={false} />);

    expect(render.dive()).toMatchSnapshot();
  });

  it('should toggle', () => {
    const render = mountWithTheme(<ToggleButton />);

    render.find('ToggleButton').simulate('click');

    expect(render).toMatchSnapshot();
  });

  it('should call change handler when enabled', () => {
    const handleToggleMock = jest.fn();
    const render = mountWithTheme(<ToggleButton checked onToggle={handleToggleMock} />);

    render.find('ToggleButton').simulate('click');

    expect(handleToggleMock).toHaveBeenCalled();
  });

  it('should not call change handler when disabled', () => {
    const handleToggleMock = jest.fn();
    const render = mountWithTheme(<ToggleButton checked disabled onToggle={handleToggleMock} />);

    render.find('ToggleButton').simulate('click');

    expect(handleToggleMock).not.toHaveBeenCalled();
  });

  it('should call componentDidUpdate and setState', () => {
    class FakeComponent extends PureComponent {
      state = {
        checked: false,
      };

      handleToogle = () => {
        const { checked } = this.state;
        this.setState({ ...this.state, checked: !checked });
      };

      render() {
        const { checked } = this.state;

        return <ToggleButton checked={checked} onToggle={this.handleToogle} />;
      }
    }

    const render = mountWithTheme(<FakeComponent />);

    render.find('ToggleButton').simulate('click');

    expect(render).toMatchSnapshot();
  });
});
