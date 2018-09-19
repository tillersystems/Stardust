import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';

import { Avatar, Icon } from '..';
import { UserName, DisconnectWrapper } from './elements';

/**
 * User Info
 *
 * This component is in charge of displaying
 * the info of a current user
 *
 * @return {jsx}
 */

const UserInfo = ({ className, name, onClick, pictureSrc }) => (
  <div className={className}>
    <Avatar name={name} src={pictureSrc} />
    <UserName>{name}</UserName>
    <DisconnectWrapper onClick={onClick} data-test="DisconnectWrapper-test">
      <Icon color="white" name="power-off" />
    </DisconnectWrapper>
  </div>
);

/**
 * PropTypes Validation.
 */
const { func, string } = PropTypes;
UserInfo.propTypes = {
  className: string,
  name: string.isRequired,
  onClick: func,
  pictureSrc: string,
};

/**
 * Default props.
 */
UserInfo.defaultProps = {
  className: '',
  onClick: () => {},
  pictureSrc: null,
};

export default styled(UserInfo)`
  display: grid;
  grid-template-columns: 4.1rem auto auto;
  align-items: center;

  padding: ${({ theme: { dimensions } }) => dimensions.medium};

  background: rgba(0, 0, 0, 0.2);
  border-top: 1px solid ${({ theme: { palette } }) => palette.darkBlue};
  border-bottom: 1px solid ${({ theme: { palette } }) => palette.darkBlue};

  color: ${({ theme: { palette } }) => palette.white};
  font-size: ${({ theme: { fonts } }) => fonts.size.medium};

  cursor: pointer;

  /* For small devices */
  ${breakpoint('xs', 'sm')`
    display: none;
  `};

  /* For medium devices */
  ${breakpoint('sm', 'lg')`
    align-items: center;
    justify-content: center;
    grid-template-columns: auto;
    grid-template-rows: 4.1rem 5rem;
  `};
`;
