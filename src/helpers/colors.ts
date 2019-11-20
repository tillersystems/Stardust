import { lighten, darken, setLightness } from 'polished';

/**
 * Colors helper
 */

export const dark = (color: string) => darken(0.03, color);

export const light = (color: string) => lighten(0.1, color);

export const whiteOpacity = (opacity: number) => `hsla(0, 100%, 100%, ${opacity})`;

export const getLightness = (color: string) => {
  const colorWithoutPar = color.replace(/[hsl(%)]/g, '');
  const hslValue = colorWithoutPar.split(',');
  const lightessValue = Number(hslValue[2]);

  return lightessValue / 100;
};

export const setColorDark = (color: string, light: number) => {
  return setLightness(getLightness(color) - light, color);
};
