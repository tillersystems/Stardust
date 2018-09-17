/**
 * Defines the theming colors.
 */

import { lighten, darken } from 'polished';

const dark = color => darken(0.03, color);

const light = color => lighten(0.1, color);

// -start- Old colours palette
const white = 'hsl(0, 100%, 100%)';
const gray = 'hsl(218, 18%, 91%)';
const black = 'hsl(0, 0%, 0%)';
const blackLight = 'hsl(213, 17%, 20%)';

// const red = 'hsl(6, 79%, 65%)';
// const green = 'hsl(89, 53%, 52%)';
// const blue = 'hsl(200, 74%, 46%)';
const orange = 'hsl(34, 91%, 65%)';
const anthracite = 'hsl(213, 17%, 20%)';
const clay = 'hsl(215, 17%, 26%)';
const sand = 'hsl(214, 8%, 84%)';
const marble = 'hsl(206, 23%, 69%)';
const grey = 'hsl(206, 16%, 60%)';
const bodyBackground = 'hsl(218, 29%, 95%)';
const emerald = 'hsl(145, 63%, 49%)';
const river = 'hsl(204, 70%, 53%)';
const wisteria = 'hsl(282, 44%, 47%)';
const carrot = 'hsl(28, 80%, 52%)';
const alizarin = 'hsl(6, 78%, 57%)';
const turquoise = 'hsl(168, 76%, 42%)';
const greygoose = 'hsl(216, 29%, 97%)';
const fadeBlue = 'hsl(210, 50%, 98%)';

const forePrimary = white;
// const backPrimary = blue;

const foreSecondary = grey;
const backSecondary = white;

const foreSuccess = white;
// const backSuccess = green;

const foreFailure = white;
// const backFailure = red;

const googleBrandRed = '#ea4335';
// -end- Old colours palette

// -start- New colours palette
const whiteOpacity = opacity => `hsla(0, 100%, 100%, ${opacity})`;

const red = 'hsl(6, 79%, 65%)';
const red1 = 'hsl(6, 60%, 58%)';
const red2 = 'hsl(6, 52%, 55%)';
const green = 'hsl(89, 53%, 52%)';
const green1 = 'hsl(89, 49%, 45%)';
const green2 = 'hsl(89, 49%, 42%)';
const blue = 'hsl(200, 74%, 46%)';
const blue1 = 'hsl(200, 74%, 41%)';
const blue2 = 'hsl(200, 74%, 38%)';
const darkBlue = 'hsl(213, 17%, 20%)';
const yellow = 'hsl(9, 91%, 65%)';

const mysticGrey = 'hsl(216,45%,98%)';
const lightGrey = 'hsl(207,22%,90%)';
const mediumGrey = 'hsl(206,23%,69%)';
const darkGrey = 'hsl(206,16%,60%)';
const spaceGrey = 'hsl(207,13%,45%)';

const backPrimary = blue;
const backFailure = red;
const backSuccess = green;
// -end- New colours palette

export const palette = {
  // -start- Old colours palette
  white,
  black,
  blackLight,

  googleBrandRed,

  gray,
  greygoose,
  darkGray: dark(gray),
  lightGray: light(gray),

  red,
  darkRed: dark(red),
  lightRed: light(red),

  green,
  darkGreen: dark(green),
  lightGreen: light(green),

  blue,
  // darkBlue: dark(blue),
  lightBlue: light(blue),

  orange,

  anthracite,
  clay,
  sand,
  marble,
  emerald,
  river,
  wisteria,
  carrot,
  alizarin,
  turquoise,
  grey,
  bodyBackground,
  fadeBlue,

  primary: {
    fore: forePrimary,
    darkFore: dark(forePrimary),
    lightFore: light(forePrimary),

    back: backPrimary,
    darkBack: dark(backPrimary),
    lightBack: light(backPrimary),

    default: blue,
    dark: blue1,
    darker: blue2,
  },

  secondary: {
    fore: foreSecondary,
    darkFore: dark(foreSecondary),
    lightFore: light(foreSecondary),

    back: backSecondary,
    darkBack: dark(backSecondary),
    lightBack: light(backSecondary),
  },

  success: {
    fore: foreSuccess,
    darkFore: dark(foreSuccess),
    lightFore: light(foreSuccess),

    back: backSuccess,
    darkBack: dark(backSuccess),
    lightBack: light(backSuccess),

    default: green,
    dark: green1,
    darker: green2,
  },

  failure: {
    fore: foreFailure,
    darkFore: dark(foreFailure),
    lightFore: light(foreFailure),

    back: backFailure,
    darkBack: dark(backFailure),
    lightBack: light(backFailure),

    default: red,
    dark: red1,
    darker: red2,
  },
  // -end- Old colours palette

  // -start- New colours palette
  whiteOpacity,
  // red,
  // green,
  // blue,
  darkBlue,
  yellow,

  mysticGrey,
  lightGrey,
  mediumGrey,
  darkGrey,
  spaceGrey,
  // -end- New colours palette
};
