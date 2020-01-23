import styled from 'styled-components';
import { transparentize } from 'polished';

export const Container = styled.div`
  position: relative;
  background-color: ${({ theme: { palette } }) => palette.white};
  overflow-y: auto;
  max-height: 100%;
  width: 100%;
`;

export const List = styled.ul`
  width: 100%;
  list-style: none;
  overflow-y: auto;
  transform-origin: 50% 0%;
`;

export const Option = styled.li`
  display: flex;
  align-items: center;
  cursor: pointer;
  background-color: ${({ isChecked, theme: { palette } }) =>
    isChecked ? palette.veryLightGrey : 'transparent'};

  color: ${({ theme: { palette } }) => palette.spaceGrey};

  :hover {
    background: ${({ theme: { palette } }) => palette.veryLightGrey};
  }
`;

export const CheckboxOption = styled(Option)`
  padding: 0.8rem 1.6rem;
`;

export const RadioOption = styled(Option)`
  padding: 0.8rem 1.6rem;
`;

export const SimpleOption = styled(Option)`
  padding: 0.8rem 1.6rem;

  color: ${({ isChecked, theme: { palette } }) =>
    isChecked ? palette.primary.default : palette.spaceGrey};

  background-color: ${({ isChecked, theme: { palette } }) =>
    isChecked ? palette.veryLightGrey : 'transparent'};
`;

export const NoResultDefaultComponent = styled.div`
  padding: 0.8rem 1.6rem;
`;

export const SearchInputContainer = styled.div`
  position: sticky;
  z-index: 1;
  top: 0;
  padding: 1.6rem;
  padding-bottom: 0;
  margin-bottom: 1rem;
  background: ${({ theme: { palette } }) => palette.white};

  &:after {
    position: absolute;
    content: '';
    top: 100%;
    left: 0;
    right: 0;
    height: 1rem;
    background: ${({ theme: { palette } }) =>
      `linear-gradient(to bottom, ${palette.white}, ${transparentize(1, palette.white)})`};
  }
`;

export const SearchInput = styled.div`
  width: 100%;
  border: 1px solid ${({ theme: { palette } }) => palette.lightGrey};
  border-radius: 0.4rem;
  background: ${({ theme: { palette } }) => palette.veryLightGrey};

  & > div {
    background: ${({ theme: { palette } }) => palette.veryLightGrey};
    height: 3.2rem;
  }

  & input {
    background: ${({ theme: { palette } }) => palette.veryLightGrey};
    font-size: 1.2rem;

    &::placeholder {
      font-size: 1.2rem;
    }
  }
`;
