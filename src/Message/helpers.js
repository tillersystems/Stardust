export const getStatusBackgroundColor = ({ palette }, type) => {
  return {
    info: palette.primary.default,
    success: palette.success.default,
    error: palette.failure.default,
    warning: palette.warning.default,
  }[type];
};
