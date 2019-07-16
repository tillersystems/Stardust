import styled, { css } from 'styled-components';

export const ARROW_SIZE = '8px';

export const PopoverContentWrapper = styled.div`
  background: ${({ theme: { palette } }) => palette.white};
  border-radius: ${({ theme: { dimensions } }) => dimensions.radius};

  box-shadow: 0 0.2rem 1.6rem 0 hsla(0, 0%, 0%, 0.1), 0 0.2rem 1.6rem 0 hsla(206, 23%, 69%, 0.1),
    0 0 0 0.1rem hsl(207, 22%, 90%);
  padding: 1.8rem;
  position: relative;

  width: ${({ width }) => width};

  ${props =>
    props['data-placement'] === 'top' &&
    css`
      margin-bottom: ${ARROW_SIZE};
    `}

  ${props =>
    props['data-placement'] === 'bottom' &&
    css`
      margin-top: ${ARROW_SIZE};
    `}

  ${props =>
    props['data-placement'] === 'left' &&
    css`
      margin-right: ${ARROW_SIZE};
    `}

  ${props =>
    props['data-placement'] === 'right' &&
    css`
      margin-left: ${ARROW_SIZE};
    `}

  ${props =>
    props['data-out-of-boundaries'] &&
    css`
      visibility: hidden;
    `}
`;

export const PopoverTriggerWrapper = styled.span`
  cursor: ${({ cursor }) => cursor};
  display: inline-block;
`;
