import { getAlertPosition, getPositionAnimation } from '../helpers';

describe('<Alert /> -- helpers', () => {
  describe('getAlertPosition', () => {
    it('should return Alert Css Position', () => {
      const expected = getAlertPosition('top-left');

      expect(expected).toMatchSnapshot();
    });
  });

  describe('getPositionAnimation', () => {
    it('should return Animation position', () => {
      const expected = getPositionAnimation('top-center');

      expect(expected).toMatchSnapshot();
    });
  });
});
