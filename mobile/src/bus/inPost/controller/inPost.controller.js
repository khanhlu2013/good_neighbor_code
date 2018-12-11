import { Component } from "react";
import PropTypes from "prop-types";

class InPostController extends Component {
  async componentDidMount() {
    const inPosts = await fetchInPost();
  }
}
InPostController.propTypes = {
  dispatch: PropTypes.func.isRequired,
  view: PropTypes.func.isRequired
};

//lets come back here. and dispatch the fetchInPost
//i also need inPosts, isFetchingInPosts, isFetchedInPosts ...
//i also need to merge the reducer and state.
