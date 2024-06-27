import PropTypes from "prop-types";
import { AnimatePresence, motion } from "framer-motion";

Button.propTypes = {
  children: PropTypes.any.isRequired,
  type: PropTypes.string,
  onBtnClick: PropTypes.func,
};

export default function Button({ children, type = "unfilled", onBtnClick }) {
  return (
    <AnimatePresence mode="popLayout">
      <motion.button
        onClick={onBtnClick}
        className={`btn ${type}`}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95, rotate: "12deg" }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.button>
    </AnimatePresence>
  );
}
