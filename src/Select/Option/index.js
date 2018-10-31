import React from 'react';
import PropTypes from 'prop-types';

import { ListItem, Aside } from './elements';

const Option = ({ children, value, onClick, aside }) => (
  <ListItem value={value} onClick={() => onClick(children, value, aside)}>
    {aside && <Aside>{aside}</Aside>}
    {children}
  </ListItem>
);

/**
 * PropTypes Validation
 */
const { node, string, func } = PropTypes;
Option.propTypes = {
  children: node,
  aside: node,
  value: string,
  onClick: func,
};

/**
 * Default props
 */
Option.defaultProps = {
  children: null,
  aside: null,
  value: '',
  onClick: null,
};

export default Option;
