import styled from 'styled-components';
import { transparentize } from 'polished';

/**
 * Footer
 *
 * This component is in charge of display
 * the footer of Card component
 *
 *
 * @return {jsx}
 */
const Footer = styled.div`
  box-shadow: 0 -1px 2px 0 ${({ theme: { palette } }) => transparentize(0.96, palette.black)};
  border-top: solid 1px ${({ theme: { palette } }) => palette.veryLightBlue};

  display: flex;
  align-items: center;
  justify-content: center;

  height: 4.9rem;
  padding: 0 2rem;
`;

export default Footer;
