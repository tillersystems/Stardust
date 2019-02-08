import styled, { css } from 'styled-components';

/**
 * Gets the width of the wrapper given a size.
 *
 * @param {String} size - The size of the wrapper.
 */
const getWrapperWidth = size => (/^\d+(rem|px)$/.test(size) ? size : 'auto');

/**
 * Gets the flex CSS property value of the wrapper given a size.
 *
 * @param {String} size - The flex value.
 */
const getWrapperFlex = size => (/^\d+$/.test(size) ? size : 'initial');

export const Wrapper = styled.div`
  display: flex;

  flex: ${({ size }) => getWrapperFlex(size)};
  width: ${({ size }) => getWrapperWidth(size)};

  &:not(:last-child) {
    margin-bottom: ${({ isRow, theme: { dimensions } }) => (isRow ? 0 : dimensions.small)};
    margin-right: ${({ isRow, theme: { dimensions } }) => (isRow ? dimensions.big : 0)};
  }
`;

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: flex-end;

  ${({ inlineLabel }) =>
    inlineLabel &&
    css`
      flex-direction: row;
      align-items: center;
      margin-left: 0;
      margin-bottom: ${({ theme: { dimensions } }) => dimensions.small};
    `};
`;

export const Label = styled.label`
  width: ${({ width }) => width};
  min-height: ${({
    theme: {
      fonts: { size },
    },
  }) => size.medium};

  color: ${({ theme: { palette } }) => palette.darkBlue};
  text-align: left;

  text-transform: uppercase;
  font-weight: ${({
    theme: {
      fonts: { weight },
    },
  }) => weight.thick};
  font-size: ${({
    theme: {
      fonts: { size },
    },
  }) => size.default};
  line-height: ${({
    theme: {
      fonts: { size },
    },
  }) => size.medium};

  margin-top: ${({ theme: { dimensions } }) => dimensions.small};
  margin-bottom: ${({ theme: { dimensions } }) => dimensions.small};
  margin-left: ${({ theme: { dimensions } }) => dimensions.tiny};

  ${({ inlineLabel }) =>
    inlineLabel &&
    css`
      margin-right: 0.5rem;
      margin-left: 0;
    `};
`;

export const ElementContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  width: 100%;
  height: 100%;
  flex: 1;
`;

export const ElementWrapper = styled.div`
  height: 100%;
`;
