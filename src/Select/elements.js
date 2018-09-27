import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const Title = styled.h4`
  color: ${({ theme: { palette } }) => palette.darkBlue};
  font-size: 1.2rem;
  /* font-size: ${({ theme: { fonts } }) => fonts.default};	 */
  font-weight: 500;
  line-height: 18px;
  text-transform: uppercase;
  padding-bottom: 0.6rem;
  `;

export const Dropdown = styled.ul`
  border: 1px solid ${({ theme: { palette } }) => palette.lightGrey};
  border-radius: 4px;
  position: absolute;
  list-style: none;
  top: calc(100% + 0.4rem);
  background-color: ${({ theme: { palette } }) => palette.white};
  width: 100%;
  left: 0;
  max-height: 160px;
  overflow-y: auto;
  transform-origin: 50% 0%;
`;

export const Prefix = styled.span`
  color: ${({ theme: { palette } }) => palette.darkGrey};
  padding-right: 0.5rem;
`;

export const Aside = styled.span`
  padding-right: 0.8rem;
`;

export const Container = styled.div`
  display: flex;
  cursor: pointer;
  text-align: left;
  padding: 0.8rem 1.2rem;
  height: 38px;
  width: 150px;
  border: 1px solid ${({ theme: { palette } }) => palette.lightGrey};
  border-radius: 4px;
  background-color: ${({ theme: { palette } }) => palette.white};
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.08);
  color: ${({ theme: { palette } }) => palette.darkBlue};
  font-size: ${({ theme: { fonts } }) => fonts.medium};
  position: relative;
  &::after {
    content: '';
    position: absolute;
    right: 14px;
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
    right: 14px;
    bottom: 37%;
    width: 0;
    height: 0;
    border: 0 solid transparent;
    border-left-width: 3px;
    border-right-width: 3px;
    border-top: 3px solid ${({ theme: { palette } }) => palette.spaceGrey};
  }
  & > select {
    display: none;
  }
`;
