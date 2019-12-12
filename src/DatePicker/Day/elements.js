import styled, { css } from 'styled-components';
import { transparentize } from 'polished';

export const Container = styled.div`
  margin-top: 0.8rem;

  &:not(:nth-child(7n)) {
    padding-right: 0.8rem;
  }

  font-size: ${({ theme: { fonts } }) => fonts.size.medium};
  color: ${({ theme: { palette } }) => palette.darkBlue};

  ${({ displayOnlyInMonth, shadowed }) =>
    displayOnlyInMonth &&
    shadowed &&
    css`
      visibility: hidden;
    `}

  ${({ shadowed, isInPath }) =>
    !shadowed &&
    isInPath &&
    css`
      background: ${({ theme: { palette } }) => transparentize(0.86, palette.primary.default)};
    `}

  ${({ shadowed, isInPath, isSelected, isStartEdge, isEndEdge }) =>
    shadowed &&
    (isInPath || isSelected || isStartEdge || isEndEdge) &&
    css`
      background: ${({ theme: { palette } }) => transparentize(0.66, palette.lightGrey)};
    `}

  ${({ isStartEdge, isSelected }) =>
    (isStartEdge || isSelected) &&
    css`
      border-top-left-radius: 2.8rem;
      border-bottom-left-radius: 2.8rem;
    `}

  ${({ isEndEdge, isSelected }) =>
    (isEndEdge || isSelected) &&
    css`
      border-top-right-radius: 2.8rem;
      border-bottom-right-radius: 2.8rem;

      &:not(:nth-child(7n)) {
        padding-right: 0;
        margin-right: 0.8rem;
      }
    `}

  cursor: pointer;
`;

export const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-basis: 2.8rem;

  width: 2.8rem;
  height: 2.8rem;
  max-width: 2.8rem;

  border-radius: 2.8rem;

  user-select: none;

  &:hover {
    background: ${({ theme: { palette } }) => transparentize(0.86, palette.primary.default)};
  }

  &,
  &:hover {
    ${({ shadowed }) =>
      shadowed &&
      css`
        background: transparent;
        color: ${({ theme: { palette } }) => palette.mediumGrey};
      `};

    ${({ disabled }) =>
      disabled &&
      css`
        cursor: not-allowed;
        background: transparent;
        color: ${({ theme: { palette } }) => palette.lightGrey};
      `};

    ${({ isInPath, isStartEdge, isEndEdge }) =>
      isInPath &&
      !isStartEdge &&
      !isEndEdge &&
      css`
        background: ${({ theme: { palette } }) => transparentize(0.86, palette.primary.default)};
      `}

    ${({ isSelected, shadowed, isStartEdge, isEndEdge }) =>
      !shadowed &&
      (isSelected || isStartEdge || isEndEdge) &&
      css`
        color: ${({ theme: { palette } }) => palette.white};
        background: ${({ theme: { palette } }) => palette.primary.default};
      `};
  }

  ${({ isStartEdge, isEndEdge }) =>
    isStartEdge &&
    !isEndEdge &&
    css`
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    `};

  ${({ isStartEdge, isEndEdge }) =>
    isEndEdge &&
    !isStartEdge &&
    css`
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    `};
`;
