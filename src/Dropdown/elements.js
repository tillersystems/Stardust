import styled, { css } from 'styled-components';

import TextInput from '../Input/TextInput';

export const Header = styled.button`
  display: flex;

  height: 100%;
  width: 100%;

  padding: 0.8rem 1.2rem;

  cursor: pointer;
  text-align: left;
  font-size: ${({ theme: { fonts } }) => fonts.size.medium};

  border: 1px solid ${({ theme: { palette } }) => palette.lightGrey};
  border-radius: ${({ theme: { dimensions } }) => dimensions.radius};

  background: linear-gradient(
    180deg,
    ${({ theme: { palette } }) => palette.white} 0%,
    ${({ theme: { palette } }) => palette.mysticGrey} 100%
  );
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.08);
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
    bottom: 37%;

    width: 0;
    height: 0;

    border: 0 solid transparent;
    border-left-width: 3px;
    border-right-width: 3px;
    border-top: 3px solid ${({ theme: { palette } }) => palette.spaceGrey};
  }
`;

export const Menu = styled.ul`
  position: absolute;
  top: calc(100% + 0.4rem);
  left: 0;

  width: 100%;
  max-height: 28rem;

  border: 1px solid ${({ theme: { palette } }) => palette.lightGrey};
  border-radius: 4px;

  list-style: none;
  overflow-y: auto;

  background: linear-gradient(
    180deg,
    ${({ theme: { palette } }) => palette.white} 0%,
    ${({ theme: { palette } }) => palette.mysticGrey} 100%
  );

  color: ${({ theme: { palette } }) => palette.spaceGrey};

  transform-origin: 50% 0%;
`;

export const MenuItem = styled.li`
  display: flex;
  align-items: center;

  padding: 0.9rem 1.2rem;

  &:nth-child(1) {
    padding-top: 1.8rem;
  }

  ${({ searchable }) =>
    searchable &&
    css`
      &:nth-child(2) {
        padding-top: 1.8rem;
      }
    `}

  &:last-of-type {
    padding-bottom: 1.8rem;
  }

  cursor: pointer;
`;

export const SearchInputContainer = styled(MenuItem)`
  padding: 0;
  &:first-of-type {
    padding: 0;
  }
`;

export const SearchInput = styled(TextInput)`
  border: 0;
  border-bottom: 1px solid ${({ theme: { palette } }) => palette.lightGrey};
  border-radius: 0;
`;
