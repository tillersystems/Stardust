export const getStatusBackgroundColor = ({ palette }, type) => {
  return {
    info: palette.primary.default,
    success: palette.success.default,
    error: palette.warning.default,
    warning: palette.failure.default,
  }[type];
};
