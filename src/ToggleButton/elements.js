import styled, { css } from 'styled-components';

const Checkbox = styled.input`
  position: absolute;

  width: 0;

  opacity: 0;
`;

const Toggle = styled.span`
  display: inline-block;

  position: relative;

  width: 3.8rem;
  height: 2rem;

  border-radius: 1rem;

  background: ${({ checked, theme: { palette } }) =>
    checked
      ? `${palette.primary.default} linear-gradient(
          0deg,
          ${palette.whiteOpacity(0)} 0%,
          ${palette.whiteOpacity(0.1)} 100%
        )`
      : palette.lightGrey};

  border: 1px solid
    ${({ checked, theme: { palette } }) => (checked ? palette.primary.default : palette.lightGrey)};

  cursor: pointer;
  pointer-events: none;

  &:before {
    content: '';

    display: block;

    position: absolute;
    top: 0.1rem;
    left: 0.2rem;

    cursor: pointer;

    height: 1.6rem;
    width: 1.6rem;

    border-radius: 1.6rem;

    background: ${({ theme: { palette } }) => palette.white};

    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.15);

    transition: transform 250ms ease;
    transform: translateX(${({ checked }) => (checked ? '1.7rem' : 0)});
    will-change: transform;
  }

  ${({ readOnly }) =>
    readOnly
      ? css`
          opacity: 0.4;
        `
      : css`
          &:active {
            &:before {
              width: 3rem;
              left: ${p => (p.checked ? '0' : '6px')};
            }
          }
        `};
`;

export { Checkbox, Toggle };
