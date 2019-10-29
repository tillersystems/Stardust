import React from 'react';
import Proptypes from 'prop-types';

import { Icon, ListContainer, ListItem, MainLabel, SecondaryLabel, Annexe } from './elements';

/**
 * List component displays a list of item through data passed props.
 * You can format the data to stylise it or render the item in one line.
 *
 * See README.md and its stories from Storybook for documentation and examples
 *
 * @return {jsx}
 */
const List = ({ datas, formatDatas, isInline }) => {
  const {
    icon: formatIcon,
    mainLabel: formatMainLabel,
    secondaryLabel: formatSecondaryLabel,
    annexe: formatAnnexe,
  } = formatDatas;

  return (
    <ListContainer>
      {datas.map(({ icon, mainLabel, secondaryLabel, annexe }, index) => (
        <ListItem key={index} isInline={isInline} data-testid="list-item">
          {icon && <Icon>{formatIcon ? formatIcon(icon) : icon}</Icon>}
          <MainLabel>{formatMainLabel ? formatMainLabel(mainLabel) : mainLabel}</MainLabel>
          <SecondaryLabel>
            {formatSecondaryLabel ? formatSecondaryLabel(secondaryLabel) : secondaryLabel}
          </SecondaryLabel>
          <Annexe>{formatAnnexe ? formatAnnexe(annexe) : annexe}</Annexe>
        </ListItem>
      ))}
    </ListContainer>
  );
};

const { arrayOf, shape, bool, func, string } = Proptypes;
List.propTypes = {
  /**
   * Data to display in the List component
   */
  datas: arrayOf(
    shape({
      icon: string,
      mainLabel: string,
      secondaryLabel: string,
      annexe: string,
    }),
  ).isRequired,

  /**
   * Format the value for display
   */
  formatDatas: shape({
    icon: func,
    mainLabel: func,
    secondaryLabel: func,
    annexe: func,
  }),

  /**
   * If isInline property is set the list items while be displayed in one line
   */
  isInline: bool,
};

List.defaultProps = {
  formatDatas: { icon: null, mainLabel: null, secondaryLabel: null, annexe: null },
  isInline: false,
};

export default List;
