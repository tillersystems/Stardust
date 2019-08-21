import React from 'react';
import PropTypes from 'prop-types';

import { Wrapper, Container, Label } from './elements';

/**
 * A Radio represents a single value from multiple options, so a Radio should be used with at least another one.
 *
 * @return {jsx}
 */
const RadioButton = ({
  children,
  className,
  disabled,
  id,
  name,
  onChange,
  selectedValue,
  value,
}) => {
  const checked = selectedValue === value;
  return (
    <Wrapper disabled={disabled} onClick={() => onChange(value)} className={className}>
      <Container checked={checked} disabled={disabled}>
        <input
          defaultChecked={checked}
          type="radio"
          name={name}
          value={value}
          id={id}
          disabled={disabled}
        />
      </Container>
      <Label htmlFor={id} checked={checked} disabled={disabled}>
        {children}
      </Label>
    </Wrapper>
  );
};

const { bool, func, node, string } = PropTypes;

/** Prop types. */
RadioButton.propTypes = {
  /** Label of the radio */
  children: node,

  /** className needed by styled-components */
  className: string,

  /** Whether the button is enabled or not */
  disabled: bool,

  /** Id allowing to link the label with the radio button */
  id: string,

  /** Name of the radio button group. In most of the case it will be defined by the `RadioGroup` component */
  name: string,

  /** Callback triggered when radio is clicked */
  onChange: func,

  /** Defines which radio is checked */
  selectedValue: string,

  /** Defines the radio element value */
  value: string,
};

/** Default props. */
RadioButton.defaultProps = {
  children: null,
  className: '',
  disabled: false,
  id: null,
  name: null,
  onChange: () => {},
  selectedValue: null,
  value: '',
};

export default RadioButton;
