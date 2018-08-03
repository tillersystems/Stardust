import styled, { css } from 'styled-components';

const Checkbox = styled.input`
  position: absolute;

  width: 0;

  opacity: 0;
`;

const Toggle = styled.span`
  display: inline-block;

  position: relative;

  width: 3.2rem;
  height: 1.8rem;

  border-radius: 2.1rem;

  background: ${({ checked, theme: { palette } }) => (checked ? palette.blue : palette.gray)};

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

    box-shadow: 0 0 1px 0 rgba(0, 0, 0, 0.1), 0 0 1px 0 rgba(0, 0, 0, 0.1),
      0 0 1px 0 rgba(0, 0, 0, 0.1);

    transition: transform 250ms ease, width 250ms, left 250ms;
    transform: translateX(${({ checked }) => (checked ? '1.3rem' : 0)});
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
