import PropTypes from "prop-types";

function GoogleLoginRPC(props) {
  const { onGoogleLogin, view } = props;

  return view(onGoogleLogin);
}
GoogleLoginRPC.propTypes = {
  onGoogleLogin: PropTypes.func.isRequired,
  view: PropTypes.func.isRequired
};
export default GoogleLoginRPC;
