import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

/**
 * Header
 *
 * This component is in charge of display
 * the header of Card component
 *
 * @param {boolean} small - change header size
 *
 * @return {jsx}
 */
const Header = styled.div`
  border-bottom: solid 1px ${({ theme: { palette } }) => palette.veryLightBlue};

  display: flex;
  align-items: center;
  justify-content: space-between;

  height: 7.4rem;
  padding: 0 3rem;

  ${({ small }) =>
    small &&
    css`
      height: 6rem;
      padding: 0 2rem;
    `}
`;

/**
 * PropTypes Validation
 */
const { bool } = PropTypes;
Header.propTypes = {
  small: bool,
};

/**
 * Default props
 */
Header.defaultProps = {
  small: false,
};

export default Header;
