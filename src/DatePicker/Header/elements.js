import styled from 'styled-components';

import { Button } from '../../..';

export const Title = styled.div`
  flex: 1;

  user-select: none;

  font-weight: ${({ theme: { fonts } }) => fonts.weight.thick};
  font-size: ${({ theme: { fonts } }) => fonts.size.medium};
`;

export const HeaderButton = styled(Button)`
  padding: 0;
`;
