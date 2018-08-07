import styled from 'styled-components';

export const PickerContainer = styled.div``;

export const Separator = styled.div`
  height: 100%;
  width: 0.1rem;

  background: ${({ theme: { palette } }) => palette.gray};
`;
