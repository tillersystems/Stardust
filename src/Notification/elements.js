import styled from 'styled-components';

import { getNotificationPosition } from './helpers';

export const Container = styled.div`
  position: fixed;
  ${({ position }) => getNotificationPosition(position)};

  width: 32rem;
`;
