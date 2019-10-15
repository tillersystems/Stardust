/**
 * Define animation variants for modal animation
 */
export const containerVariants = {
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

export const overlayVariants = {
  visible: { opacity: 1 },
  hidden: {
    opacity: 0,
    transition: {
      delay: 0.15,
    },
  },
};

export const dialogVariants = {
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      delay: 0.15,
      duration: 0.15,
    },
  },
  hidden: {
    y: 50,
    opacity: 0,
    transition: {
      duration: 0.15,
    },
  },
};
