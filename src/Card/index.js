import PropTypes from 'prop-types';
import styled from 'styled-components';
import { transparentize } from 'polished';

import Header from './Header';
import Body from './Body';
import Footer from './Footer';

/**
 * A Card is a simple rectangular container that can be used to display content through its children.
 * It can have a Header and a Footer. The Header can be smaller through a boolean prop.
 *
 * @return {jsx}
 */
const Card = styled.div`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  border-radius: 4px;
  box-shadow: 0 1px 3px 0 ${({ theme: { palette } }) => transparentize(0.96, palette.black)};
  border: solid 1px ${({ theme: { palette } }) => palette.veryLightBlue};
  background-color: ${({ theme: { palette } }) => palette.white};

  display: flex;
  flex-direction: column;
`;

Card.Header = Header;
Card.Body = Body;
Card.Footer = Footer;

/**
 * PropTypes Validation
 */
const { string } = PropTypes;
Card.propTypes = {
  /**
   * Defines the card height that can be any size units (ex: "100px", "10rem", "100%" ...)
   */
  height: string,

  /**
   * Defines the card width that can be any size units (ex: "100px", "10rem", "100%" ...)
   */
  width: string,
};

/**
 * Default props
 */
Card.defaultProps = {
  height: 'auto',
  width: 'auto',
};

export default Card;
