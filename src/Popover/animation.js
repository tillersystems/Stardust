/**
 * Define animation variants for popover animation
 * https://www.framer.com/api/motion/
 */
export const transition = {
  default: { duration: 0.15 },
};

export const popoverVariants = {
  visible: {
    marginTop: 12,
    opacity: 1,
    transition: {
      ...transition,
      default: {
        ...transition.default,
        delay: 0.15,
      },
    },
  },
  hidden: {
    marginTop: 8,
    opacity: 0,
    transition,
  },
};
