import { memo } from 'react';

export const hasItemPropsAreEqual = (prev, next) => {
  return (
    prev.onChange === next.onChange &&
    prev.disabled === next.disabled &&
    prev.label === next.label &&
    prev.value === next.value &&
    prev.isSelected === next.isSelected
  );
};

export const memoItem = Component => memo(Component, hasItemPropsAreEqual);
