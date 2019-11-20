import React from 'react';
import styled from 'styled-components';

import { ITag } from './types';
import Theme from '../Theme';

/**
 * A Tag categorizes or marks anything.
 */
const Tag = styled.div<ITag>(({ theme: { palette }, color }) => {
  return `
  position: relative;
  display: inline-block;

  padding: 0.4rem 0.8rem;
  border-radius: 0.5rem;

  color: ${palette.white};
  background: ${color};
`;
});

/**
 * Default props.
 */
Tag.defaultProps = {
  appearance: Theme.palette.primary.default,
  color: Theme.palette.primary.default,
} as Partial<ITag>;

export default Tag;
