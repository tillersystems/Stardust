import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';

export const Container = styled.div`
  position: fixed;
  display: grid;
  justify-content: center;
  align-content: center;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  width: 100%;

  /* For small mobile devices */
  ${breakpoint('xs', 'sm')`
    display: flex;
    align-items: flex-end;
  `};
`;

export const Overlay = styled.div`
  position: fixed;
  min-width: 100%;
  min-height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 99;
`;

export const Dialog = styled.dialog`
  position: relative;
  width: ${({ width }) => width};
  height: ${({ height }) => height};

  z-index: 999;
  display: flex;
  flex-direction: column;

  padding: ${({ padding }) => padding};

  color: ${({ theme: { palette } }) => palette.darkBlue};
  font-size: ${({
    theme: {
      fonts: { size },
    },
  }) => size.medium};

  border-radius: ${({ theme: { dimensions } }) => dimensions.radius};
  background: ${({ theme: { palette } }) => palette.white};

  /* For small mobile devices */
  ${breakpoint('xs', 'sm')`
    width: 100%;
    margin: 0.4rem;
  `};
`;

export const Title = styled.p`
  text-transform: uppercase;
  font-weight: ${({ theme: { fonts } }) => fonts.weight.thick};
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
`;
