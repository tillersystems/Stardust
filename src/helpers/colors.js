import { lighten, darken, setLightness } from 'polished';

export const dark = color => darken(0.03, color);

export const light = color => lighten(0.1, color);

export const whiteOpacity = opacity => `hsla(0, 100%, 100%, ${opacity})`;

export const getLigntness = color => {
  const colorWithoutPar = color.replace(/[hsl(%)]/g, '');
  const hslValue = colorWithoutPar.split(',');
  const lightessValue = hslValue[2];
  return lightessValue / 100;
};

export const setColorDark = (color, light) => {
  return setLightness(getLigntness(color) - light, color);
};
