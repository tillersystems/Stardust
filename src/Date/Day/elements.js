import styled, { css } from 'styled-components';
import { lighten } from 'polished';

export const Container = styled.div`
  font-size: ${({ theme: { fonts } }) => fonts.size.medium};
  line-height: ${({ theme: { fonts } }) => `${fonts.size.mediumInt + 1.6}rem`}

  cursor: pointer;

${({ shadowed }) =>
  shadowed &&
  css`
    & > ${Content} {
      color: ${({ theme: { palette } }) => palette.gray};
    }
  `};

${({ disabled }) =>
  disabled &&
  css`
    cursor: not-allowed;

    & > ${Content} {
      color: ${({ theme: { palette } }) => palette.gray};
    }
  `};

  ${({ selected }) =>
    selected &&
    css`
      & > ${Content} {
        color: ${({ theme: { palette } }) => palette.white};
        background: ${({ theme: { palette } }) => palette.blue};
      }
    `};

  ${({ highlighted }) =>
    highlighted &&
    css`
      background: ${({ theme: { palette } }) => lighten(0.4, palette.blue)};
    `}

  ${({ starting }) =>
    starting &&
    css`
      border-top-left-radius: ${({ theme: { dimensions } }) => dimensions.radius};
      border-bottom-left-radius: ${({ theme: { dimensions } }) => dimensions.radius};
    `};

  ${({ ending }) =>
    ending &&
    css`
      border-top-right-radius: ${({ theme: { dimensions } }) => dimensions.radius};
      border-bottom-right-radius: ${({ theme: { dimensions } }) => dimensions.radius};
    `};
`;

export const Content = styled.div`
  width: 100%;
  height: 100%;

  ${({ starting }) =>
    starting &&
    css`
      border-top-left-radius: ${({ theme: { dimensions } }) => dimensions.radius};
      border-bottom-left-radius: ${({ theme: { dimensions } }) => dimensions.radius};
    `};

  ${({ ending }) =>
    ending &&
    css`
      border-top-right-radius: ${({ theme: { dimensions } }) => dimensions.radius};
      border-bottom-right-radius: ${({ theme: { dimensions } }) => dimensions.radius};
    `};
`;
