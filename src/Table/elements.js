import styled, { css } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  width: ${({ width }) => width};
  ${({ height }) => height && css` height ${height}`};

  box-shadow: 0 1px 0 0 hsla(0, 0%, 0%, 0.06);
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
`;

export const Body = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
`;

/**
 * Gets the value of flex attribute for a column.
 *
 * If the given width is an integer, this means that cells width are given in weights relative to each other, hence the
 * resulting flex value (in a container with flex direction set to row), should be the weight (the given integer).
 * If the given value is a width as a string (for instance with px or rem), the flex attribute shouldn't be used (because
 * width attribute is used in place), and thus the flex value is set to initial.
 *
 * @param {string} width - The width of the column.
 *
 * @returns {string} - The value of the CSS flex attribute.
 */
const getCellFlex = width => (width === parseInt(width).toString() ? width : 'initial');

/**
 * Gets the value of width attribute for a column.
 *
 * If the given width is a string, this means that cells width are given in weights relative to each other, hence the
 * resulting width value (in a container with flex direction set to row), should be the weight (the given string).
 * If the given value is a width as an integer, the width attribute shouldn't be used (because
 * width attribute is used in place), and thus the width value is set to initial.
 *
 * @param {string} width - The width of the column.
 *
 * @returns {string} - The value of the CSS width attribute.
 */
const getCellWidth = width => (width !== parseInt(width).toString() ? width : 'initial');

const cellAlignToJustify = {
  left: 'flex-start',
  center: 'center',
  right: 'flex-end',
};

const Cell = styled.div`
  box-sizing: content-box;
  display: flex;
  justify-content: ${({ align }) => cellAlignToJustify[align || 'center']};
  align-items: center;

  height: 6rem;
  width: ${({ width }) => getCellWidth(width || 'auto')};
  flex: ${({ width }) => getCellFlex(width || '1')};

  padding: 0 1rem;

  color: ${({ theme: { palette } }) => palette.mediumGrey};
`;

export const HeaderCell = styled(Cell).attrs({
  data: ({ j }) => `header-cell-${j}`,
})`
  display: flex;

  background: transparent;
`;

export const BodyCell = styled(Cell).attrs({
  data: ({ j }) => `body-cell-${j}`,
})`
  font-size: $({theme: {fonts: size}} => size.medium);
  line-height: $({theme: {fonts: size}} => size.medium);
`;

export const HeaderCellTitle = styled.div`
  display: flex;
  align-items: center;
`;

export const HeaderSortingContainer = styled.div.attrs({
  data: 'sorting',
})`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 2.5rem;
  height: 100%;

  margin-right: ${({ theme: { dimensions } }) => dimensions.small};

  cursor: pointer;
`;

export const HeaderSortingGhost = styled.div`
  width: 2.5rem;
  height: 1rem;

  margin-left: ${({ theme: { dimensions } }) => dimensions.small};

  ${({ align }) =>
    align === 'right' &&
    css`
      display: none;
    `};
`;

export const HeaderLabel = styled.div`
  font-weight: ${({
    theme: {
      fonts: { weight },
    },
  }) => weight.thick};
`;

const Row = styled.div`
  display: flex;
  align-items: center;

  width: 100%;
  height: 6rem;

  border-bottom: 1px solid hsl(0, 0%, 94%);

  &:last-child {
    border: none;
  }
`;

export const HeaderRow = styled(Row).attrs({
  data: `header-row`,
})``;

export const BodyRow = styled(Row).attrs({
  data: ({ i }) => `body-row-${i}`,
})`
  background: ${({ theme: { palette } }) => palette.white};

  ${({ selectable }) =>
    selectable &&
    css`
      cursor: pointer;
      padding-left: 0.3rem;
      }
    `};

  ${({ selected }) =>
    selected &&
    css`
      z-index: 20;
      padding-left: 0;
      box-shadow: 0.1rem 0.1rem 0.2rem 0 hsla(0, 0%, 0%, 0.1),
        0 0.1rem 0.2rem 0 hsla(0, 0%, 0%, 0.05);

      &:before {
        position: relative;
        top: 0.1rem;
        left: 0;

        height: calc(100% + 0.1rem);
        width: 0.3rem;

        content: '';
        background: ${({ theme: { palette } }) => palette.primary.default};
      }
    `};

  ${({ compressed }) =>
    compressed &&
    css`
      height: 4rem;
    `};

  &:nth-child(even) {
    ${({ noZebra }) =>
      !noZebra &&
      css`
        background: ${({ theme: { palette } }) => palette.mysticGrey};
      `};
  }
`;
