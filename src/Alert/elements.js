import styled from 'styled-components';
import { getAlertPosition } from './helpers';

export const Container = styled.div`
  position: fixed;
  ${({ position }) => getAlertPosition(position)};

  width: 32rem;

  z-index: 100;
`;
