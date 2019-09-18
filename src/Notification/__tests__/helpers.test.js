import { getNotificationPosition, getPositionAnimation, getListDirection } from '../helpers';

describe('<Notification /> -- helpers', () => {
  describe('getAlertPosition', () => {
    test('should return notification Css Position', () => {
      const expected = getNotificationPosition('top-left');

      expect(expected).toMatchSnapshot();
    });
  });

  describe('getPositionAnimation', () => {
    test('should return Animation position', () => {
      const expected = getPositionAnimation('top-center');

      expect(expected).toMatchSnapshot();
    });
  });

  describe('getListDirection', () => {
    test('should return valid flex direction for top-center placement', () => {
      const expected = getListDirection('top-center');

      expect(expected).toMatchSnapshot();
    });
  });

  describe('getListDirection', () => {
    test('should return valid flex direction for bottom-left placement', () => {
      const expected = getListDirection('bottom-left');

      expect(expected).toMatchSnapshot();
    });
  });
});
