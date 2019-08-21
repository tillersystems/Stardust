import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './elements';
import Field from './Field';
import Group from './Group';

/**
 * A Form is used to collect, validate and submit user inputs through provided fields
 * which can be text input, select, radio buttons, etc.
 * Submit action is provided by onSubmit callback prop
 *
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
  /**
   * Should be the fields constituting the form, so instances of CheckBox, Input, Select, etc
   */
  children: node,

  /**
   * ClassName needed by styled components
   */
  className: string,

  /**
   * Attribute of the `form` html element
   */
  name: string,

  /**
   * Action handler on form submission
   */
  onSubmit: func,
};

/**
 * Default props
 */
Form.defaultProps = {
  children: null,
  className: '',
  name: '',
  onSubmit: () => {},
};

export default Form;
