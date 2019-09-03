import styled from 'styled-components';

import { getNotificationPosition } from './helpers';

export const Container = styled.div`
  position: fixed;
  ${({ padding, position }) => getNotificationPosition(padding, position)};

  width: 32rem;
`;
