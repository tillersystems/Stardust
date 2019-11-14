import React from 'react';
import Proptypes from 'prop-types';

import { formatNumber } from '../../helpers/formatting';
import { Amount, Container, Evolution, Label, SideWrapper } from './elements';

/**
 *
 * @return {jsx}
 */
const Item = ({ amount, children, className, evolution, locale }) => {
  return (
    <Container className={className}>
      <Label>{children}</Label>
      <SideWrapper>
        <Amount>{amount}</Amount>
        {evolution !== null && (
          <Evolution evolution={evolution}>
            {evolution === 0 ? '=' : evolution > 0 && '+'}
            {evolution !== 0 &&
              formatNumber({
                locale,
                number: evolution,
                percent: true,
              })}
          </Evolution>
        )}
      </SideWrapper>
    </Container>
  );
};

const { node, number, string } = Proptypes;
Item.propTypes = {
  /** First side value displayed at the right side of the container */
  amount: node,

  /** Main value of the item, like a label for example, displayed at the left side of the container */
  children: node.isRequired,

  /** Second side value displayed below the first side node. Can add extra information  */
  evolution: number,

  /** Locale code used to properly format numbers  */
  locale: string,
};

Item.defaultProps = {
  amount: null,
  evolution: null,
  locale: 'en',
};

export default Item;
