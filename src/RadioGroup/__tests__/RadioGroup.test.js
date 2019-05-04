import React from 'react';
import { fireEvent } from 'react-testing-library';

import RadioGroup from '..';
import { RadioButton } from '../..';

describe('<RadioGroup />', () => {
  test('should render without a problem', () => {
    const { container } = render(
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

    expect(container.firstChild).toMatchSnapshot();
  });

  test('should should have selected value by default', () => {
    const { getByLabelText } = render(
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

    const artichokeNode = getByLabelText('artichoke');
    const beetrootNode = getByLabelText('beetroot');
    const pumpkinNode = getByLabelText('beetroot');

    expect(artichokeNode).toHaveAttribute('checked');
    expect(beetrootNode).not.toHaveAttribute('checked');
    expect(pumpkinNode).not.toHaveAttribute('checked');
  });

  test('should select another value', () => {
    const { getByLabelText } = render(
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

    let artichokeNode = getByLabelText('artichoke');
    let beetrootNode = getByLabelText('beetroot');
    let pumpkinNode = getByLabelText('pumpkin');

    expect(artichokeNode).toHaveAttribute('checked');
    expect(beetrootNode).not.toHaveAttribute('checked');
    expect(pumpkinNode).not.toHaveAttribute('checked');

    fireEvent.click(beetrootNode);

    artichokeNode = getByLabelText('artichoke');
    beetrootNode = getByLabelText('beetroot');
    pumpkinNode = getByLabelText('pumpkin');

    expect(artichokeNode).not.toHaveAttribute('checked');
    expect(beetrootNode).toHaveAttribute('checked');
    expect(pumpkinNode).not.toHaveAttribute('checked');
  });

  test('should have radio button disabled', () => {
    const { getByLabelText } = render(
      <RadioGroup groupName="vegetable" selectedValue="artichoke">
        <RadioButton value="artichoke" id="artichoke" disabled>
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

    const artichokeNode = getByLabelText('artichoke');
    const beetrootNode = getByLabelText('beetroot');
    const pumpkinNode = getByLabelText('pumpkin');

    expect(artichokeNode).toHaveAttribute('disabled');
    expect(beetrootNode).not.toHaveAttribute('disabled');
    expect(pumpkinNode).not.toHaveAttribute('disabled');
  });

  test('should render as row', () => {
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

  test('should call componentDidUpdate when props are updated', () => {
    let selectedValue = 'artichoke';
    const { getByLabelText, rerender } = render(
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
    let artichokeNode = getByLabelText('artichoke');
    let beetrootNode = getByLabelText('beetroot');
    let pumpkinNode = getByLabelText('pumpkin');

    expect(artichokeNode).toHaveAttribute('checked');
    expect(beetrootNode).not.toHaveAttribute('checked');
    expect(pumpkinNode).not.toHaveAttribute('checked');

    selectedValue = 'beetroot';
    rerender(
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

    artichokeNode = getByLabelText('artichoke');
    beetrootNode = getByLabelText('beetroot');
    pumpkinNode = getByLabelText('pumpkin');

    expect(artichokeNode).not.toHaveAttribute('checked');
    expect(beetrootNode).toHaveAttribute('checked');
    expect(pumpkinNode).not.toHaveAttribute('checked');
  });
});
