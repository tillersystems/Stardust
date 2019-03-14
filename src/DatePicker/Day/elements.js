import styled, { css } from 'styled-components';
import { transparentize } from 'polished';

export const Container = styled.div`
  margin-top: 0.8rem;

  &:not(:nth-child(7n)) {
    padding-right: 0.8rem;
  }

  font-size: ${({ theme: { fonts } }) => fonts.size.medium};
  color: ${({ theme: { palette } }) => palette.darkBlue};

  ${({ isInPath }) =>
    isInPath &&
    css`
      background: ${({ theme: { palette } }) => transparentize(0.86, palette.primary.default)};
    `}

  ${({ isStartEdge }) =>
    isStartEdge &&
    css`
      border-top-left-radius: 50%;
      border-bottom-left-radius: 50%;
    `}

  ${({ isEndEdge }) =>
    isEndEdge &&
    css`
      border-top-right-radius: 50%;
      border-bottom-right-radius: 50%;

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

  border-radius: 50%;

  user-select: none;

  ${({ disabled, shadowed, isSelected, isStartEdge, isEndEdge }) =>
    !disabled &&
    !shadowed &&
    !isSelected &&
    !isStartEdge &&
    !isEndEdge &&
    css`
      &:hover {
        background: ${({ theme: { palette } }) => transparentize(0.86, palette.primary.default)};
      }
    `};

  ${({ shadowed }) =>
    shadowed &&
    css`
      color: ${({ theme: { palette } }) => palette.mediumGrey};
    `};

  ${({ disabled }) =>
    disabled &&
    css`
      cursor: not-allowed;

      color: ${({ theme: { palette } }) => palette.lightGrey};
    `};

  ${({ isInPath, isStartEdge, isEndEdge }) =>
    isInPath &&
    !isStartEdge &&
    !isEndEdge &&
    css`
      background: ${({ theme: { palette } }) => transparentize(0.86, palette.primary.default)};
    `}

  ${({ isSelected, isStartEdge, isEndEdge }) =>
    (isSelected || isStartEdge || isEndEdge) &&
    css`
      color: ${({ theme: { palette } }) => palette.white};
      background: ${({ theme: { palette } }) => palette.primary.default};
    `};
`;
