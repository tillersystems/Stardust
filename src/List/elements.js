import styled, { css } from 'styled-components';

export const ListContainer = styled.ul`
  list-style: none;
  font-feature-settings: 'tnum';
`;

export const ListItem = styled.li`
  height: 5.2rem;
  padding: 0 2rem;

  border-top: 1px solid hsl(210, 11%, 93%);
  background-color: white;

  display: grid;
  align-content: center;
  align-items: center;

  ${({ isInline }) =>
    isInline
      ? css`
          grid-template-columns: min-content auto max-content max-content;
          grid-template-areas: 'icon mainLabel secondaryLabel annexe';
        `
      : css`
          grid-template-columns: min-content auto max-content;
          grid-template-rows: max-content max-content;
          grid-template-areas:
            'icon mainLabel secondaryLabel'
            'icon mainLabel annexe';
        `};

  &:last-of-type {
    border-bottom: 1px solid hsl(210, 11%, 93%);
  }
`;

export const Icon = styled.span`
  margin-right: 1.2rem;

  grid-area: icon;
`;

export const MainLabel = styled.span`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;

  grid-area: mainLabel;
`;

export const SecondaryLabel = styled.span`
  text-align: right;
  grid-area: secondaryLabel;
`;

export const Annexe = styled.span`
  text-align: right;
  grid-area: annexe;
`;
