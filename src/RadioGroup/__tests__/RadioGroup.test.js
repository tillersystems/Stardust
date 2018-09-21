import React from 'react';
import 'jest-styled-components';

import RadioGroup from '..';
import { RadioButton } from '../..';

describe('<RadioGroup />', () => {
  it('should render without a problem', () => {
    const render = mountWithTheme(
      <RadioGroup groupName="vegetable">
        <RadioButton value="artichoke" id="artichoke">
          artichoke
        </RadioButton>
        <RadioButton value="beetroot" id="beetroot">
          beetroot
        </RadioButton>
        <RadioButton value="pumpkin" id="pumpkin">
          pumpkin
        </RadioButton>
      </RadioGroup>,
    );

    expect(render).toMatchSnapshot();
  });

  it('should render without a problem when radio is pre-selected', () => {
    const render = shallowWithTheme(
      <RadioGroup groupName="vegetable" selectedValue="artichoke">
        <RadioButton value="artichoke" id="artichoke">
          artichoke
        </RadioButton>
        <RadioButton value="beetroot" id="beetroot">
          beetroot
        </RadioButton>
        <RadioButton value="pumpkin" id="pumpkin">
          pumpkin
        </RadioButton>
      </RadioGroup>,
    );

    expect(render.dive()).toMatchSnapshot();
  });

  it("should render without a problem when it's in row", () => {
    const render = shallowWithTheme(
      <RadioGroup groupName="vegetable" isRow>
        <RadioButton value="artichoke" id="artichoke">
          artichoke
        </RadioButton>
        <RadioButton value="beetroot" id="beetroot">
          beetroot
        </RadioButton>
        <RadioButton value="pumpkin" id="pumpkin">
          pumpkin
        </RadioButton>
      </RadioGroup>,
    );
    expect(render.dive()).toMatchSnapshot();
  });

  it('should render without a problem when radio is selected  and disabled', () => {
    const render = shallowWithTheme(
      <RadioGroup groupName="vegetable">
        <RadioButton value="artichoke" id="artichoke">
          artichoke
        </RadioButton>
        <RadioButton value="beetroot" id="beetroot">
          beetroot
        </RadioButton>
        <RadioButton value="pumpkin" id="pumpkin">
          pumpkin
        </RadioButton>
      </RadioGroup>,
    );
    expect(render.dive()).toMatchSnapshot();
  });

  it('should call change handler', () => {
    const render = mountWithTheme(
      <RadioGroup groupName="vegetable" selectedValue="artichoke">
        <RadioButton value="artichoke" id="artichoke">
          artichoke
        </RadioButton>
        <RadioButton value="beetroot" id="beetroot">
          beetroot
        </RadioButton>
        <RadioButton value="pumpkin" id="pumpkin">
          pumpkin
        </RadioButton>
      </RadioGroup>,
    );
    render.find('#beetroot input').simulate('change');
    expect(render.state().selectedValue).toEqual('beetroot');
  });

  it('should call click handler', () => {
    const render = mountWithTheme(
      <RadioGroup groupName="vegetable" selectedValue="artichoke">
        <RadioButton value="artichoke" id="artichoke">
          artichoke
        </RadioButton>
        <RadioButton value="beetroot" id="beetroot">
          beetroot
        </RadioButton>
        <RadioButton value="pumpkin" id="pumpkin">
          pumpkin
        </RadioButton>
      </RadioGroup>,
    );
    render.find('#beetroot div[onClick]').simulate('click');
    expect(render.state().selectedValue).toEqual('beetroot');
  });

  it('should call componentDidUpdate when props are updated', () => {
    let selectedValue = 'artichoke';
    const render = shallowWithTheme(
      <RadioGroup groupName="vegetable" selectedValue={selectedValue}>
        <RadioButton value="artichoke" id="artichoke">
          artichoke
        </RadioButton>
        <RadioButton value="beetroot" id="beetroot">
          beetroot
        </RadioButton>
        <RadioButton value="pumpkin" id="pumpkin">
          pumpkin
        </RadioButton>
      </RadioGroup>,
    );
    render.setProps({ selectedValue: 'beetroot' });
    expect(render.state().selectedValue).toEqual('beetroot');
  });
});
