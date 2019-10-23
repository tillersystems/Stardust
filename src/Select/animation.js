/**
 * Define animation variants for modal animation
 * https://www.framer.com/api/motion/
 */
export const animationVariants = {
  visible: {
    opacity: 1,
    scaleY: 1,
    originX: '50%',
    originY: '0%',
    transition: {
      ease: 'anticipate',
      duration: 0.15,
    },
  },
  hidden: {
    opacity: 0,
    scaleY: 0,
    originX: '50%',
    originY: '0%',
    transition: {
      duration: 0.15,
    },
  },
};
