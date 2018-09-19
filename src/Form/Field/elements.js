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

  margin-left: 0;
  margin-top: ${({ theme: { dimensions } }) => dimensions.small};

  ${({ isRow }) =>
    isRow &&
    css`
      margin-left: ${({ theme: { dimensions } }) => dimensions.small};
      margin-top: 0;
    `};

  &:first-child {
    margin-left: 0;
    margin-top: 0;
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
    `};
`;

export const Label = styled.label`
  width: ${({ width }) => width};
  min-height: ${({
    theme: {
      fonts: { size },
    },
  }) => size.medium};

  color: ${({ theme: { palette } }) => palette.darkGrey};
  text-align: left;

  font-weight: ${({
    theme: {
      fonts: { weight },
    },
  }) => weight.normal};
  font-size: ${({
    theme: {
      fonts: { size },
    },
  }) => size.medium};
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

  ${({ hasFocus }) =>
    hasFocus &&
    css`
      color: ${({ theme: { palette } }) => palette.primary.default};
      font-weight: ${({
        theme: {
          fonts: { weight },
        },
      }) => weight.thick};
    `};
`;

export const ElementContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  width: 100%;
  flex: 1;
`;

export const ElementWrapper = styled.div``;
