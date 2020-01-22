import React from 'react';
import PropTypes from 'prop-types';

import Icon from '../Icon';

import { StyledCheckbox } from './elements';

const CheckboxBullet = ({ isChecked }) => (
  <StyledCheckbox className={isChecked ? 'checked' : ''} data-testid="styled-checkBox">
    <Icon name="check-mark" color="currentColor" width="10px" height="10px" />
  </StyledCheckbox>
);

CheckboxBullet.propTypes = {
  isChecked: PropTypes.bool.isRequired,
};

export default CheckboxBullet;
