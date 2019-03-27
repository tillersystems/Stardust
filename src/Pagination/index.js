import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Icon, Theme } from '..';

import {
  Container,
  PaginationContainer,
  PaginationItem,
  PaginationGroup,
  ArrowContainer,
  BreakItem,
} from './elements';

/**
 * Pagination
 *
 * This component is in charge of displaying
 * a Pagination
 *
 * @param {number} pageCount - total number of pages in the pagination.
 * @param {number} pageRangeDisplayed - displayed page range.
 * @param {number} marginPageDisplayed - page displayed on the pagination marges.
 * @param {string} breakLabel - default '...'. Label when you need a break for long pagination.
 * @param {func} getRequestedPageNumber - component callback function.
 * @param {string} align - component alignment. oneOf ['left', 'center', 'right'].
 *
 * @return {jsx}
 */
const Pagination = ({
  pageCount,
  pageRangeDisplayed,
  marginPageDisplayed,
  breakLabel,
  getRequestedPageNumber,
  align,
}) => {
  /**
   * Component initial state.
   */
  const [currentPage, setCurrentPage] = useState(1);

  /**
   * Page item click callback.
   *
   * @param {number} index
   */
  const handlePageItemClicked = index => {
    if (currentPage === index) return;

    setCurrentPage(index);
    getRequestedPageNumber(currentPage);
  };

  /**
   * Handle click on previous page.
   */
  const handlePrevious = () => {
    setCurrentPage(currentPage === 1 ? 1 : currentPage - 1);
    getRequestedPageNumber(currentPage);
  };

  /**
   * Handle click on next page.
   */
  const handleNextPage = () => {
    setCurrentPage(currentPage === pageCount ? pageCount : currentPage + 1);
    getRequestedPageNumber(currentPage);
  };

  /**
   * Return a pagination item.
   *
   * @param {number} index
   *
   * @return {jsx}
   */
  const getPaginationItem = index => {
    return (
      <PaginationItem
        key={index}
        active={currentPage === index}
        onClick={() => handlePageItemClicked(index)}
        data-testid={`page-${index}`}
      >
        {index}
      </PaginationItem>
    );
  };

  /**
   * Render the pagination.
   *
   * @return {Array}
   */
  const renderPagination = () => {
    const items = [];

    if (pageCount <= pageRangeDisplayed) {
      for (let i = 1; i <= pageCount; i++) {
        items.push(getPaginationItem(i));
      }
    } else {
      let left = pageRangeDisplayed / 2;
      let right = pageRangeDisplayed - left;
      let index;
      let paginationBreak;

      if (currentPage > pageCount - left) {
        right = pageCount - currentPage;
        left = pageRangeDisplayed - right;
      } else if (currentPage < left) {
        left = currentPage;
        right = pageRangeDisplayed - left;
      }

      for (index = 1; index <= pageCount; index++) {
        if (index <= marginPageDisplayed) {
          items.push(getPaginationItem(index));
          continue;
        }

        if (index > pageCount - marginPageDisplayed) {
          items.push(getPaginationItem(index));
          continue;
        }

        if (index >= currentPage - left && index <= currentPage + right) {
          items.push(getPaginationItem(index));
          continue;
        }

        if (breakLabel && items[items.length - 1] !== paginationBreak) {
          paginationBreak = <BreakItem key={index}>{breakLabel}</BreakItem>;
          items.push(paginationBreak);
        }
      }
    }

    return items;
  };

  /**
   * Render the component.
   *
   * @return {jsx}
   */
  return (
    <Container align={align} data-testid="pagination-main-container">
      <PaginationContainer data-testid="pagination-container">
        <ArrowContainer side="left" onClick={handlePrevious} data-testid="arrow-left">
          <Icon name="chevron-left" color={Theme.palette.lightGrey} />
        </ArrowContainer>
        <PaginationGroup>{renderPagination()}</PaginationGroup>
        <ArrowContainer side="right" onClick={handleNextPage} data-testid="arrow-right">
          <Icon name="chevron-right" color={Theme.palette.lightGrey} />
        </ArrowContainer>
      </PaginationContainer>
    </Container>
  );
};

/**
 * Pagination component props validation.
 */
const { number, string, func, oneOf } = PropTypes;

Pagination.propTypes = {
  pageCount: number,
  pageRangeDisplayed: number,
  marginPageDisplayed: number,
  breakLabel: string,
  align: oneOf(['left', 'right', 'center']),
  getRequestedPageNumber: func,
};

/**
 * Pagination default props.
 */
Pagination.defaultProps = {
  pageCount: 1,
  pageRangeDisplayed: 2,
  marginPageDisplayed: 1,
  breakLabel: '...',
  align: 'right',
  getRequestedPageNumber: () => {},
};

Pagination.displayName = 'Pagination';

export default Pagination;
