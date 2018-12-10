import { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { checkAuth } from "../../common/app/action/auth.action";

class _ extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    view: PropTypes.func.isRequired,
    navigation: PropTypes.object.isRequired
  };

  async componentDidMount() {
    const user = await this.props.dispatch(checkAuth());
    if (user) {
      this.props.navigation.navigate("PrivateApp");
    } else {
      this.props.navigation.navigate("Login");
    }
  }

  render() {
    return this.props.view();
  }
}

const AuthCheckController = connect()(_);
export default AuthCheckController;
