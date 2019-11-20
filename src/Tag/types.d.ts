import { ReactNode } from 'react';
import { DefaultTheme } from 'styled-components';

/**
 * Typescript interface.
 */
export interface TagProps {
  /** Anything that can be rendered: numbers, strings, elements or an array (or fragment */
  children: ReactNode;
  color?: string;
  theme: DefaultTheme;
}
