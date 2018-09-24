import 'jest-styled-components';
import React from 'react';

import Loader from '..';
import Theme from '../../Theme';

describe('<Loader />', () => {
  it('should render without a problem ', () => {
    const render = shallow(<Loader />);

    expect(render.dive()).toMatchSnapshot();
  });

  it('should render with another size ', () => {
    const render = shallow(<Loader width="4rem" height="4rem" />);

    expect(render.dive()).toMatchSnapshot();
  });

  it('should render with another color ', () => {
    const render = shallow(<Loader color={Theme.palette.failure.default} />);

    expect(render.dive()).toMatchSnapshot();
  });
});
