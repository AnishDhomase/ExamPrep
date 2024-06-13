import PropTypes from "prop-types";
import { useRef } from "react";

Header.propTypes = {
  name: PropTypes.string,
  subject: PropTypes.number,
  subjects: PropTypes.array,
  numQues: PropTypes.number,
  lvl: PropTypes.string,
  children: PropTypes.any,
};

function Header({ subjects, name, subject, numQues, lvl, children }) {
  const Toggler = useRef(null);
  const Details = useRef(null);
  return (
    <div className="header">
      <div className="detail" ref={Details}>
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
      </div>

      {children}
      <div
        className="toggler"
        ref={Toggler}
        onClick={() => Details.current.classList.toggle("active")}
      >
        <i className="fa-solid fa-ellipsis"></i>
      </div>

      <div className="user">
        <span>
          <i className="fa-solid fa-user"></i>
        </span>
        <span className="userName">{name || "Guest"}</span>
      </div>
    </div>
  );
}

export default Header;
