import React from 'react';
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
const List = ({ currency, data, locale }) => {
  return (
    <Container>
      {data.map(({ amount, evolution, label }, index) => (
        <Item
          key={index}
          amount={amount}
          currency={currency}
          evolution={evolution}
          locale={locale}
          data-testid="list-item"
        >
          {label}
        </Item>
      ))}
    </Container>
  );
};

const { arrayOf, node, number, oneOfType, shape, string } = Proptypes;
List.propTypes = {
  /** Currency for amount values */
  currency: string,

  /**
   * Data to display in the List component
   */
  data: arrayOf(
    shape({
      amount: number,
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
  currency: null,
  locale: 'en',
};

export default List;
