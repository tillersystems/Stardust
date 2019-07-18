import styled, { css } from 'styled-components';

export const ARROW_SIZE = 8;
export const CONTENT_PADDING = 1.8;
export const MARGIN = 12;

export const Arrow = styled.span`
  color: ${({ theme: { palette } }) => palette.white};

  position: absolute;
  display: inline-block;
  font-size: ${ARROW_SIZE * 2}px;

  ${({ placement }) =>
    placement.startsWith('top') &&
    css`
      bottom: ${-CONTENT_PADDING + 0.5}rem;
      left: calc(50% - ${ARROW_SIZE}px);
      margin-bottom: 0;
      margin-top: 0;
      text-shadow: 1px -5px 5px hsla(0, 0%, 0%, 0.1);
      transform: rotate(180deg);
    `}

  ${({ placement }) =>
    placement.startsWith('bottom') &&
    css`
      top: ${-CONTENT_PADDING + 0.5}rem;
      left: calc(50% - ${ARROW_SIZE}px);
      margin-bottom: 0;
      margin-top: 0;
      text-shadow: 1px -4px 6px hsla(0, 0%, 0%, 0.1);
      transform: rotate(0deg);
    `}

  ${({ placement }) =>
    placement.startsWith('left') &&
    css`
      right: ${-CONTENT_PADDING + 0.8}rem;
      top: calc(50% - ${ARROW_SIZE}px);
      margin-left: 0;
      margin-right: 0;
      text-shadow: 1px -5px 5px hsla(0, 0%, 0%, 0.1);
      transform: rotate(90deg);
    `}

  ${({ placement }) =>
    placement.startsWith('right') &&
    css`
      left: ${-CONTENT_PADDING + 0.8}rem;
      top: calc(50% - ${ARROW_SIZE}px);
      margin-left: 0;
      margin-right: 0;
      text-shadow: 1px -5px 5px hsla(0, 0%, 0%, 0.1);
      transform: rotate(-90deg);
    `}
`;

export const PopoverContentWrapper = styled.div`
  background: ${({ theme: { palette } }) => palette.white};
  border-radius: ${({ theme: { dimensions } }) => dimensions.radius};

  box-shadow: 0 0.2rem 0.6rem 0 hsla(0, 0%, 0%, 0.1), 0 0.2rem 0.6rem 0 hsla(206, 23%, 69%, 0.1),
    0 0 0 0.05rem ${({ theme: { palette } }) => palette.lightGrey};
  padding: ${CONTENT_PADDING}rem;
  position: relative;

  width: ${({ width }) => width};

  ${props =>
    props['data-placement'] === 'top' &&
    css`
      margin-bottom: ${MARGIN}px;
    `}

  ${props =>
    props['data-placement'] === 'bottom' &&
    css`
      margin-top: ${MARGIN}px;
    `}

  ${props =>
    props['data-placement'] === 'left' &&
    css`
      margin-right: ${MARGIN}px;
    `}

  ${props =>
    props['data-placement'] === 'right' &&
    css`
      margin-left: ${MARGIN}px;
    `}

  ${props =>
    props['data-out-of-boundaries'] &&
    css`
      visibility: hidden;
    `}
`;

export const PopoverTriggerWrapper = styled.span`
  display: inline-block;
`;
