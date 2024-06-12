import PropTypes from "prop-types";

Button.propTypes = {
  children: PropTypes.any.isRequired,
  type: PropTypes.string,
  onBtnClick: PropTypes.func,
};

export default function Button({ children, type = "unfilled", onBtnClick }) {
  return (
    <button onClick={onBtnClick} className={`btn ${type}`}>
      {children}
    </button>
  );
}
