import styled from 'styled-components';

export const HeaderButton = styled.button`
  display: flex;
  align-items: center;
  height: 100%;
  width: 100%;
  position: relative;
  padding: 0 2.4rem 0 1.6rem;
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

  &:disabled {
    cursor: not-allowed;
    opacity: 0.4;
  }
`;

export const HeaderContent = styled.div`
  vertical-align: middle;
  display: inline-block;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  max-width: 100%;
`;

export const Container = styled.div`
  position: relative;
  user-select: none;
  height: 3.8rem;
`;
