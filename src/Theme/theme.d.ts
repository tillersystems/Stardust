import 'styled-components';

/**
 * This configuration will allow you:
 * To have auto-completion and type-checking of your theme in your components.
 * To have the basic completion on the types of styled-components.
 *
 * We are using Typescript interface merging to override the default theme.
 * We import original module declarations and extend them!
 */

declare module 'styled-components' {
  export interface DefaultTheme {
    breakpoints: {
      xs: number;
      sm: number;
      md: number;
      lg: number;
      xl: number;
    };
    palette: {
      white: string;
      whiteOpacity: (opacity: number) => string;
      black: string;
      avatar: {
        emerald: string;
        river: string;
        wisteria: string;
        carrot: string;
        alizarin: string;
        turquoise: string;
      };
      googleBrandRed: string;
      bodyBackground: string;
      primary: {
        default: string;
        dark: string;
        darker: string;
      };
      secondary: {
        default: string;
      };
      success: {
        default: string;
        dark: string;
        darker: string;
      };
      failure: {
        default: string;
        dark: string;
        darker: string;
      };
      warning: {
        default: string;
        dark: string;
        darker: string;
      };
      darkBlue: string;
      veryLightBlue: string;
      mysticGrey: string;
      lightGrey: string;
      mediumGrey: string;
      darkGrey: string;
      spaceGrey: string;
      paleGrey: string;
      veryLightGrey: string;
    };
    dimensions: {
      radius: string;
      tiny: string;
      small: string;
      medium: string;
      big: string;
      huge: string;
      radiusInt: number;
      tinyInt: number;
      smallInt: number;
      mediumInt: number;
      bigInt: number;
      hugeInt: number;
    };
    fonts: {
      size: {
        tiny: string;
        small: string;
        huge: string;
        default: string;
        medium: string;
        big: string;
        h6: string;
        h5: string;
        h4: string;
        h3: string;
        h2: string;
        h1: string;
        tinyInt: number;
        smallInt: number;
        hugeInt: number;
        defaultInt: number;
        mediumInt: number;
        bigInt: number;
        h6Int: number;
        h5Int: number;
        h4Int: number;
        h3Int: number;
        h2Int: number;
        h1Int: number;
      };
      spacing: {
        small: string;
        medium: string;
        big: string;
      };
      weight: {
        thin: number;
        normal: number;
        thick: number;
      };
      family: string;
    };
  }
}
