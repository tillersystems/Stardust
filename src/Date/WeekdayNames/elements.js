import styled from 'styled-components';

export const DayName = styled.div`
  font-size: ${({
    theme: {
      fonts: { size },
    },
  }) => size.medium};
`;
