import React from 'react';
import 'jest-styled-components';

import RadioButton from '..';

describe('<RadioButton />', () => {
  it('should render without a problem', () => {
    const render = shallowWithTheme(<RadioButton id="test">test</RadioButton>);

    expect(render.dive()).toMatchSnapshot();
  });

  it('should render without a problem when radio is selected and enabled', () => {
    const render = shallowWithTheme(
      <RadioButton id="test" value="apple" selectedValue="apple">
        test
      </RadioButton>,
    );

    expect(render.dive()).toMatchSnapshot();
  });

  it('should render without a problem when radio is not selected and enabled', () => {
    const render = shallowWithTheme(
      <RadioButton id="test" value="apple" selectedValue="apricot">
        test
      </RadioButton>,
    );

    expect(render.dive()).toMatchSnapshot();
  });

  it('should render without a problem when radio is selected  and disabled', () => {
    const render = shallowWithTheme(
      <RadioButton id="test" value="apple" selectedValue="apple" disabled>
        test
      </RadioButton>,
    );

    expect(render.dive()).toMatchSnapshot();
  });

  it('should render without a problem when radio is not selected and disabled', () => {
    const render = shallowWithTheme(
      <RadioButton id="test" value="apple" selectedValue="apricot" disabled>
        test
      </RadioButton>,
    );

    expect(render.dive()).toMatchSnapshot();
  });
});
