import React, { Children } from 'react';
import { Icon } from '..';
import PropTypes from 'prop-types';

import { Container, Item } from './elements';
import Theme from '../Theme';

/**
 * A BreadCrumb is a component which organise its childrens in row.
 * Each children is separated with _greater than_ symbol.
 * The main use of that component will be to display the client's history path.
 *
 * @return {jsx}
 */

const BreadCrumb = ({ children }) => (
  <Container>
    {Children.map(children, (child, index) => (
      <>
        {!!index && (
          <Icon
            name="chevron-right"
            color={Theme.palette.darkBlue}
            size="medium"
            title="icon title"
          />
        )}
        <Item isLastItem={index === children.length - 1}>{child}</Item>
      </>
    ))}
  </Container>
);

const { node } = PropTypes;
/**
 * PropTypes Validation.
 */
BreadCrumb.propTypes = {
  /**
   * Anything that can be rendered: numbers, strings, elements or an array (or fragment)
   */
  children: node.isRequired,
};

export default BreadCrumb;
