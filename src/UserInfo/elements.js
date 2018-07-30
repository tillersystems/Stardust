import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';

export const UserName = styled.span`
  flex: 1;

  font-family: ${({ theme: { fonts } }) => fonts.family};
  font-weight: ${({ theme: { fonts } }) => fonts.weight.thin};
  letter-spacing: ${({ theme: { fonts } }) => fonts.spacing.medium};
  text-align: left;

  /* For medium devices */
  ${breakpoint('sm', 'lg')`
    display: none;
  `};
`;

export const DisconnectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
