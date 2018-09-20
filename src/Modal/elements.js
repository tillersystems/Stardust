import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  min-width: 100%;
  height: 100%;
  min-height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  height: 100%;
  width: 100%;
  min-width: 100%;
  min-height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const Dialog = styled.dialog`
  z-index: 999;
  display: flex;
  flex-direction: column;

  height: ${({ height }) => height};
  width: ${({ width }) => width};

  margin: 0 auto;
  padding: 0 ${({ theme: { dimensions } }) => dimensions.medium};

  color: ${({ theme: { palette } }) => palette.darkBlue};
  font-size: ${({
    theme: {
      fonts: { size },
    },
  }) => size.medium};

  border-radius: ${({ theme: { dimensions } }) => dimensions.radius};
  background: ${({ theme: { palette } }) => palette.white};

  /* For small devices */
  ${breakpoint('xs', 'sm')`
    width:90%;
    margin: 0 auto;
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
