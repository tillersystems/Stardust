import React, { forwardRef } from 'react';
import Proptypes from 'prop-types';

import Item from './Item';
import { Container } from './elements';

/**
 * List component displays a list of items through a `data` prop
 * You can format the data to stylise it or render the item in one line.
 *
 * See README.md and its stories from Storybook for documentation and examples
 *
 * @return {jsx}
 */
const List = forwardRef(({ className, currency, data, locale }, ref) => {
  return (
    <Container className={className} ref={ref}>
      {data.map(({ amount, evolution, label }, index) => (
        <Item
          key={index}
          amount={amount}
          currency={currency}
          {...(typeof evolution !== 'undefined' ? { evolution } : {})}
          locale={locale}
          data-testid="list-item"
        >
          {label}
        </Item>
      ))}
    </Container>
  );
});

const { arrayOf, node, number, oneOfType, shape, string } = Proptypes;
List.propTypes = {
  /** Needed by styled-components for custom style */
  className: string,

  /** Currency for amount values */
  currency: string,

  /**
   * Data to display in the List component
   */
  data: arrayOf(
    shape({
      amount: node,
      evolution: number,
      label: oneOfType([node, string]),
    }),
  ).isRequired,

  /**
   * locale code used to properly format numbers
   */
  locale: string,
};

List.defaultProps = {
  className: undefined,
  currency: null,
  locale: 'en',
};

List.displayName = 'List';

export default List;
