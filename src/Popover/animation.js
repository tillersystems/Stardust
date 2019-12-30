/**
 * Define animation variants for popover animation
 * https://www.framer.com/api/motion/
 */
export const transition = {
  default: { duration: 0.15 },
};

export const popoverVariants = {
  visible: {
    top: 0,
    opacity: 1,
    transition,
  },
  hidden: {
    top: '-12px',
    opacity: 0,
    transition,
  },
};
