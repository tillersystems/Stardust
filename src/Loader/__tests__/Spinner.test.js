import 'jest-styled-components';
import React from 'react';
import { mount } from 'enzyme';

import Loader from '..';
import Theme from '../../Theme';

describe('<Loader />', () => {
  it('should render without a problem ', () => {
    const wrapper = mount(<Loader />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should render with another size ', () => {
    const wrapper = mount(<Loader width="4rem" height="4rem" />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should render with another color ', () => {
    const wrapper = mount(<Loader color={Theme.palette.failure.default} />);

    expect(wrapper).toMatchSnapshot();
  });
});
