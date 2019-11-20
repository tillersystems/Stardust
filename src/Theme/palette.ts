/**
 * Defines the theming colors.
 */
import { whiteOpacity, setColorDark } from '../helpers/colors';
// Black and white colors
const white = 'hsl(0,100%,100%)';
const black = 'hsl(0,0%,0%)';

// Avatar colors
const emerald = 'hsl(145,63%,49%)';
const river = 'hsl(204,70%,53%)';
const wisteria = 'hsl(282,44%,47%)';
const carrot = 'hsl(28,80%,52%)';
const alizarin = 'hsl(6,78%,57%)';
const turquoise = 'hsl(168,76%,42%)';

// Google color
const googleBrandRed = 'hsl(5,81%,56%)';

// Shades of grey
const mysticGrey = 'hsl(218, 29%, 95%)';
const lightGrey = 'hsl(207,22%,90%)';
const mediumGrey = 'hsl(206,23%,69%)';
const darkGrey = 'hsl(206,16%,60%)';
const spaceGrey = 'hsl(207,13%,45%)';
const paleGrey = 'hsl(240,33%,99%)';
const veryLightBlue = 'hsl(220,27%,94%)';
//Temporary name
const veryLightGrey = 'hsl(214,64%,98%)';

// Primary colors
const blue = 'hsl(200,74%,46%)';
const green = 'hsl(89,53%,52%)';
const red = 'hsl(6,79%,65%)';
const yellow = 'hsl(34,91%,65%)';
const bodyBackground = paleGrey;
const darkBlue = 'hsl(213,17%,20%)';

export const palette = {
  // Black and white colors
  white,
  whiteOpacity,
  black,

  // Avatar colors
  avatar: {
    emerald,
    river,
    wisteria,
    carrot,
    alizarin,
    turquoise,
  },

  // Google color
  googleBrandRed,

  // Primary colors
  bodyBackground,
  primary: {
    default: blue,
    dark: setColorDark(blue, 0.1),
    darker: setColorDark(blue, 0.15),
  },
  secondary: {
    default: white,
  },
  success: {
    default: green,
    dark: setColorDark(green, 0.1),
    darker: setColorDark(green, 0.15),
  },
  failure: {
    default: red,
    dark: setColorDark(red, 0.1),
    darker: setColorDark(red, 0.15),
  },
  warning: {
    default: yellow,
    dark: setColorDark(yellow, 0.1),
    darker: setColorDark(yellow, 0.15),
  },
  darkBlue,
  veryLightBlue,

  // Shades of grey
  mysticGrey,
  lightGrey,
  mediumGrey,
  darkGrey,
  spaceGrey,
  paleGrey,
  veryLightGrey,
};
