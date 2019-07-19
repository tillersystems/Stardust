import { getNotificationPosition, getPositionAnimation } from '../helpers';

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
});
