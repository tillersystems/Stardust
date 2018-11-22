import Theme from '../../Theme';
import { getAppearance, getSize } from '../helpers';

describe('<Button /> -- helpers', () => {
  describe('getAppearance', () => {
    it('should return default css appearance', () => {
      const expectedCss = getAppearance(Theme, 'default');

      expect(expectedCss).toMatchSnapshot();
    });

    it('should return primary css appearance', () => {
      const expectedCss = getAppearance(Theme, 'primary');

      expect(expectedCss).toMatchSnapshot();
    });

    it('should return secondary css appearance', () => {
      const expectedCss = getAppearance(Theme, 'secondary');

      expect(expectedCss).toMatchSnapshot();
    });

    it('should return success css appearance', () => {
      const expectedCss = getAppearance(Theme, 'success');

      expect(expectedCss).toMatchSnapshot();
    });

    it('should return danger css appearance', () => {
      const expectedCss = getAppearance(Theme, 'danger');

      expect(expectedCss).toMatchSnapshot();
    });

    it('should return google css appearance', () => {
      const expectedCss = getAppearance(Theme, 'google');

      expect(expectedCss).toMatchSnapshot();
    });
  });

  describe('getSize', () => {
    it('should return default css size', () => {
      const expectedCss = getSize(Theme, 'default');

      expect(expectedCss).toMatchSnapshot();
    });

    it('should return small css size', () => {
      const expectedCss = getSize(Theme, 'small');

      expect(expectedCss).toMatchSnapshot();
    });

    it('should return large css size', () => {
      const expectedCss = getSize(Theme, 'large');

      expect(expectedCss).toMatchSnapshot();
    });
  });
});
