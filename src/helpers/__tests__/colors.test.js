import 'jest-styled-components';

import { dark, light, whiteOpacity, getLightness, setColorDark } from '../colors';

describe('Colors helpers', () => {
  it('should render a darker color', () => {
    const expectedValue = dark('hsl(6, 79%, 65%)');
    expect(expectedValue).toMatchSnapshot();
  });
  it('should render a lighter color', () => {
    const expectedValue = light('hsl(6, 79%, 65%)');
    expect(expectedValue).toMatchSnapshot();
  });
  it('should render a white with an opacity', () => {
    const expectedValue = whiteOpacity(0.1);
    expect(expectedValue).toMatchSnapshot();
  });
  it('should render the lightness value of an hsl color', () => {
    const expectedValue = getLightness('hsl(6, 79%, 65%)');
    expect(expectedValue).toMatchSnapshot();
  });
  it('should render a darker light on hsl color', () => {
    const expectedValue = setColorDark('hsl(6, 79%, 65%)', 0.1);
    expect(expectedValue).toMatchSnapshot();
  });
});
