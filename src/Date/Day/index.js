import React from 'react';
import PropTypes from 'prop-types';

import { Container, Content } from './elements';

/**
 * A single Day component.
 *
 * @param {luxon.DateTime} date - The date to display.
 * @param {boolean} selected - Whether the day is selected or not.
 * @param {boolean} selectionStart - Whether this is a selection start or not.
 * @param {boolean} selectionEnd - Whether this is a selection end or not.
 * @param {boolean} highlighted - Whether the day is highlighted or not.
 * @param {boolean} highlightStart - Whether this is a highlight start or not.
 * @param {boolean} highlightEnd - Whether this is a highlight end or not.
 * @param {boolean} shadowed - Whether the day is shadowed or not.
 * @param {boolean} disabled - Whether the day is disabled or not.
 * @param {function} onClick - Handler called when the day is clicked.
 * @param {function} onOver - Handler called when the mouse is over the day.
 *
 * @return {jsx}
 */
const Day = ({
  date,
  selected,
  selectionStart,
  selectionEnd,
  highlighted,
  highlightStart,
  highlightEnd,
  shadowed,
  disabled,
  onClick,
  onOver,
}) => (
  <Container
    selected={selected}
    highlighted={highlighted}
    shadowed={shadowed}
    disabled={disabled}
    starting={highlightStart}
    ending={highlightEnd}
    onClick={onClick}
    onMouseOver={onOver}
    onFocus={() => {}}
  >
    <Content starting={selectionStart} ending={selectionEnd}>
      {date.toLocaleString({ day: '2-digit' })}
    </Content>
  </Container>
);

/** Display name. */
Day.displayName = 'Day';

const { object, bool, func } = PropTypes;
/** Validation prop types. */
Day.propTypes = {
  date: object.isRequired,
  selected: bool,
  selectionStart: bool,
  selectionEnd: bool,
  highlighted: bool,
  highlightStart: bool,
  highlightEnd: bool,
  shadowed: bool,
  disabled: bool,
  onClick: func,
  onOver: func,
};

/** Default props. */
Day.defaultProps = {
  selected: false,
  selectionStart: false,
  selectionEnd: false,
  highlighted: false,
  highlightStart: false,
  highlightEnd: false,
  shadowed: false,
  disabled: false,
  onClick: () => {},
  onOver: () => {},
};

export default Day;
