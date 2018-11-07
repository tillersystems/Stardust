import styled from 'styled-components';

export const PopOver = styled.div`
position: relative;

width: ${({ width }) => width};

padding: 1.8rem;

border-radius: ${({ theme: { dimensions } }) => dimensions.radius};

box-shadow: 0 0.2rem 1.6rem 0 hsla(0, 0%, 0%, 0.1), 0 0.2rem 1.6rem 0 hsla(206, 23%, 69%, 0.1),
  0 0 0 0.1rem hsl(207, 22%, 90%);

background: ${({ theme: { palette } }) => palette.white};

&::before {
  content: "";

  display:block;

  position:absolute;
  top: -0.7rem;
  left: ${({ arrowPositionX }) => arrowPositionX};
  z-index:-1;

  height:14.14px;
  width:14.14px;

  transform: rotate(135deg);

  background:white;
  box-shadow: -1px 1px 2px 0px rgba(0,0,0,0.2);
`;
