import styled from 'styled-components';

export const DayName = styled.div`
  display: flex;
  flex-basis: 2.8rem;
  justify-content: center;

  height: 1.1rem;
  width: 2.8rem;

  user-select: none;

  &:not(:nth-child(7n)) {
    margin-right: 0.8rem;
  }

  font-size: ${({
    theme: {
      fonts: { size },
    },
  }) => `calc(${size.default} - 0.2rem)`};
  text-transform: uppercase;

  color: ${({ theme: { palette } }) => palette.spaceGrey};
`;
