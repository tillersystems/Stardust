import styled from 'styled-components';
import RadioButton from '../RadioButton';

export const Options = styled.ul`
  width: 100%;

  list-style: none;
  overflow-y: auto;

  color: ${({ theme: { palette } }) => palette.spaceGrey};

  transform-origin: 50% 0%;
`;

export const Option = styled.li`
  display: flex;
  align-items: center;
  cursor: pointer;
  background-color: ${({ isChecked, theme: { palette } }) =>
    isChecked ? palette.veryLightGrey : 'transparent'};
`;

export const NoResultDefaultComponent = styled(Options)`
  padding: 0.8rem 1.6rem;
  &:first-child {
    padding-top: 1.2rem;
  }
  &:last-child {
    padding-bottom: 1.2rem;
  }
  :hover {
    background: ${({ theme: { palette } }) => palette.veryLightGrey};
  }
`;

export const SearchInputContainer = styled(Option)`
  padding: 1.6rem;
  padding-bottom: 0.8rem;
`;

export const Radio = styled(RadioButton)`
  padding: 0;
  label {
    margin-left: 1.2rem;
  }
`;
