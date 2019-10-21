import styled from 'styled-components';

export const Header = styled.button`
  display: flex;
  align-items: center;

  height: 100%;
  width: 100%;
  position: relative;

  padding: 0 1.2rem;

  cursor: pointer;
  text-align: left;
  font-size: ${({ theme: { fonts } }) => fonts.size.medium};

  border: 1px solid ${({ theme: { palette } }) => palette.lightGrey};
  border-radius: ${({ theme: { dimensions } }) => dimensions.radius};

  background: linear-gradient(
    180deg,
    ${({ theme: { palette } }) => palette.white} 0%,
    ${({ theme: { palette } }) => palette.paleGrey} 100%
  );
  color: ${({ theme: { palette } }) => palette.spaceGrey};

  &::after {
    content: '';

    position: absolute;
    right: 1.4rem;
    top: 37%;

    width: 0;
    height: 0;

    border: 0 solid transparent;
    border-right-width: 3px;
    border-left-width: 3px;
    border-bottom: 3px solid ${({ theme: { palette } }) => palette.spaceGrey};
  }
  &::before {
    content: '';

    position: absolute;
    right: 1.4rem;
    bottom: 33%;

    width: 0;
    height: 0;

    border: 0 solid transparent;
    border-left-width: 3px;
    border-right-width: 3px;
    border-top: 3px solid ${({ theme: { palette } }) => palette.spaceGrey};
  }
`;

export const HeaderContent = styled.div`
  align-items: center;
  display: flex;
  height: 2.2rem;
  padding-right: 2rem;
`;

export const Menu = styled.ul`
  width: 100%;
  max-height: 28rem;

  list-style: none;
  overflow-y: auto;

  color: ${({ theme: { palette } }) => palette.spaceGrey};

  transform-origin: 50% 0%;
`;

export const MenuItem = styled.li`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const SearchInputContainer = styled(MenuItem)`
  padding: 0;
  &:first-of-type {
    padding: 0;
  }
`;
