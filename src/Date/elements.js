import styled from 'styled-components';

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  margin-bottom: ${({ theme: { dimensions } }) => dimensions.medium};

  color: ${({ theme: { palette } }) => palette.darkBlue};
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

export const HeaderTitle = styled.div`
  flex: 1;
  text-align: center;
`;
