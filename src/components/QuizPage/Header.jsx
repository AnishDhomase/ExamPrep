import PropTypes from "prop-types";
import { useRef } from "react";
import { motion } from "framer-motion";

Header.propTypes = {
  name: PropTypes.string,
  subject: PropTypes.number,
  subjects: PropTypes.array,
  numQues: PropTypes.number,
  lvl: PropTypes.string,
};

function Header({ subjects, name, subject, numQues, lvl }) {
  // console.log("⚡⚡Header Render");
  const Toggler = useRef(null);
  const Details = useRef(null);

  return (
    <motion.div
      className="header"
      initial={window.innerWidth > 774 && { y: "-10vh" }}
      animate={window.innerWidth > 774 && { y: 0 }}
      transition={window.innerWidth > 774 && { duration: 1 }}
    >
      <motion.div className="detail" ref={Details}>
        <span>
          <b>Subject </b>
          <i className="fa-solid fa-chevron-right"></i> {subjects[subject]}
        </span>
        <span>
          <b>Questions </b>
          <i className="fa-solid fa-chevron-right"></i> {numQues}
        </span>
        <span>
          <b>Level </b>
          <i className="fa-solid fa-chevron-right"></i> {lvl}
        </span>
      </motion.div>
      <motion.div
        className="toggler"
        ref={Toggler}
        onClick={() => Details.current.classList.toggle("active")}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95, rotate: "12deg" }}
        transition={{ duration: 0.2 }}
      >
        <i className="fa-solid fa-ellipsis"></i>
      </motion.div>

      <div className="user">
        <span>
          <i className="fa-solid fa-user"></i>
        </span>
        <span className="userName">{name || "Guest"}</span>
      </div>
    </motion.div>
  );
}

export default Header;
