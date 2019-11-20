import styled from 'styled-components';

import { TagProps } from './types.d';
import Theme from '../Theme';

/**
 * A Tag categorizes or marks anything.
 */
const Tag = styled.div<TagProps>(({ theme: { palette }, color }) => {
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
  color: Theme.palette.primary.default,
} as Partial<TagProps>;

export default Tag;
