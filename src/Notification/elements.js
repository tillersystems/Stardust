import styled from 'styled-components';

import { getNotificationPosition, getListDirection } from './helpers';

export const Container = styled.div`
  margin-bottom: 1rem;
`;

export const NotificationsList = styled.div`
  position: fixed;
  display: flex;
  width: 32rem;
  ${({ placement }) => getListDirection(placement)};
  ${({ placement }) => getNotificationPosition(placement)};
`;
