import styled from 'styled-components';

export const Recenter = styled.button`
  left: 0;
  position: absolute;
  top: 0;
`;

export const Root = styled.div`
  margin: 3rem 0;
  position: relative;
`;

export const ScrollArea = styled.div`
  height: ${({ height }) => `${height}px`};
  overflow: auto;
  position: relative;
`;

export const ScrollContent = styled.div`
  background-color: ${({ theme: { palette } }) => palette.veryLightBlue};
  align-items: center;
  display: flex;
  height: ${({ height }) => `${height + 500}px`};
  justify-content: center;
  width: 200vw;
`;
