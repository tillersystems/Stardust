import styled from 'styled-components';

export const PopOver = styled.div`
position: relative;

width: ${({ width }) => width || 'auto'};

padding: 1.8rem;

border-radius: ${({ theme: { dimensions } }) => dimensions.radius};

box-shadow: 0 0.2rem 1.6rem 0 hsla(0, 0%, 0%, 0.1), 0 0.2rem 1.6rem 0 hsla(206, 23%, 69%, 0.1),
  0 0 0 0.1rem hsl(207, 22%, 90%);

background: ${({ theme: { palette } }) => palette.white};

&::before {
  content: '';

  position: absolute;
  top: -2rem;
  left: 50%;

  transform: translateX(-50%);

  border-width: 1rem;
  border-style: solid;
  border-color: transparent transparent ${({ theme: { palette } }) => palette.white} transparent;
`;
