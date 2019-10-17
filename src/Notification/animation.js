import { getPositionAnimation } from './helpers';

/**
 * Define animation variants for modal animation
 */
export const containerVariants = {
  visible: placement => ({
    x: getPositionAnimation(placement).enter.x,
    y: getPositionAnimation(placement).enter.y,
    transition: {
      ease: 'easeOut',
      duration: 0.25,
    },
  }),
  hidden: placement => ({
    x: getPositionAnimation(placement).exit.x,
    y: getPositionAnimation(placement).exit.y,
    transition: {
      ease: 'backIn',
      duration: 0.35,
    },
  }),
};

export const notificationsListVariants = {
  visible: {
    transition: {
      when: 'beforeChildren',
    },
  },
  hidden: {
    transition: {
      when: 'afterChildren',
    },
  },
};

export const layoutTransition = {
  type: 'spring',
  damping: 30,
  stiffness: 400,
};
