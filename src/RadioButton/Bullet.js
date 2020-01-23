import React from 'react';
import PropTypes from 'prop-types';

import { StyledRadio } from './elements';

const RadioBullet = ({ isChecked, disabled }) => (
  <StyledRadio
    className={isChecked ? 'checked' : ''}
    disabled={disabled}
    data-testid="styled-radio"
  />
);

RadioBullet.propTypes = {
  isChecked: PropTypes.bool,
  disabled: PropTypes.bool,
};

RadioBullet.defaultProps = {
  isChecked: false,
  disabled: false,
};

export default RadioBullet;
