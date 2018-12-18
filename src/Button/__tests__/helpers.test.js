import Theme from '../../Theme';
import { getAppearance, getSize } from '../helpers';

describe('<Button /> -- helpers', () => {
  describe('getAppearance', () => {
    test('should return default css appearance', () => {
      const expectedCss = getAppearance(Theme, 'default');

      expect(expectedCss).toMatchSnapshot();
    });

    test('should return primary css appearance', () => {
      const expectedCss = getAppearance(Theme, 'primary');

      expect(expectedCss).toMatchSnapshot();
    });

    test('should return secondary css appearance', () => {
      const expectedCss = getAppearance(Theme, 'secondary');

      expect(expectedCss).toMatchSnapshot();
    });

    test('should return success css appearance', () => {
      const expectedCss = getAppearance(Theme, 'success');

      expect(expectedCss).toMatchSnapshot();
    });

    test('should return danger css appearance', () => {
      const expectedCss = getAppearance(Theme, 'danger');

      expect(expectedCss).toMatchSnapshot();
    });

    test('should return google css appearance', () => {
      const expectedCss = getAppearance(Theme, 'google');

      expect(expectedCss).toMatchSnapshot();
    });
  });

  describe('getSize', () => {
    test('should return default css size', () => {
      const expectedCss = getSize(Theme, 'default');

      expect(expectedCss).toMatchSnapshot();
    });

    test('should return small css size', () => {
      const expectedCss = getSize(Theme, 'small');

      expect(expectedCss).toMatchSnapshot();
    });

    test('should return large css size', () => {
      const expectedCss = getSize(Theme, 'large');

      expect(expectedCss).toMatchSnapshot();
    });
  });
});
