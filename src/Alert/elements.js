import styled, { css } from 'styled-components';

const getStatusBackgroundColor = ({ palette }, type) => {
  return {
    info: palette.primary.default,
    success: palette.success.default,
    error: palette.warning.default,
    warning: palette.failure.default,
  }[type];
};

export const AlertContainer = styled.div`
  position: absolute;
  top: 0;
  left: 10rem;
  right: 10rem;

  display: flex;
  align-items: center;

  padding: 1.3rem;

  border-radius: 0.5rem;

  color: ${({ theme: { palette } }) => palette.white};

  cursor: pointer;

  ${({ theme, type }) =>
    css`
      background: ${getStatusBackgroundColor(theme, type)};
    `};
`;

export const Message = styled.span`
  flex: 1;
  text-align: left;
  margin-left: 2rem;
`;
