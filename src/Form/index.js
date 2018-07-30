import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './elements';
import Field from './Field';
import Group from './Group';

/**
 * Create a Form
 *
 * Submit action is provided by onSubmit props
 */
const Form = ({ className, children, onSubmit, name }) => (
  <Container
    className={className}
    onSubmit={e => {
      e.preventDefault();
      onSubmit();
    }}
    name={name}
  >
    {children}
  </Container>
);

Form.Field = Field;
Form.Group = Group;

/**
 * PropTypes validation
 */
const { node, string, func } = PropTypes;
Form.propTypes = {
  children: node,
  name: string,
  onSubmit: func,
  className: string,
};

/**
 * Default props
 */
Form.defaultProps = {
  children: null,
  name: '',
  onSubmit: () => {},
  className: '',
};

export default Form;
