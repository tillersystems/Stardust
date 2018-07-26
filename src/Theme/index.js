/**
 * Theme exported to the provider
 * This is globally available in styled-components when interpolating a function like so:
 * ${(props) => props.theme}
 * Or using import { withTheme } from 'styled-components';
 */

import { breakpoints } from './breakpoints';
import { palette } from './palette';
import { dimensions } from './dimensions';
import { fonts } from './fonts';

const Theme = {
  breakpoints,
  palette,
  dimensions,
  fonts,
};

export default Theme;
