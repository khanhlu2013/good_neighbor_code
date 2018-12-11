import { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import fetchInPosts from "@gn/common/bus/inPost/action/fetchInPosts.action";
import InPostSelector from "@gn/common/bus/inPost/inPost.selector";

class _ extends Component {
  componentDidMount() {
    this.props.fetchInPost();
  }
  render() {
    const { view, inPosts } = this.props;
    view(inPosts);
  }
}
_.propTypes = {
  fetchInPost: PropTypes.func.isRequired,
  inPosts: PropTypes.array.isRequired,
  view: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => ({
  inPosts: InPostSelector(state)
});
const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchInPost: () => {
    dispatch(fetchInPosts);
  }
});
const InPostController = connect(
  mapStateToProps,
  mapDispatchToProps
)(_);

export default InPostController;

//lets come back here. and dispatch the fetchInPost
//i also need inPosts, isFetchingInPosts, isFetchedInPosts ...
//i also need to merge the reducer and state.
