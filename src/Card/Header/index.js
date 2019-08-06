import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

/**
 * The Header of the Card is displayed at the top of the Card, before content.
 * Height can have two possible values through the `small` prop.
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
  /**
   * change header size
   */
  small: bool,
};

/**
 * Default props
 */
Header.defaultProps = {
  small: false,
};

export default Header;
