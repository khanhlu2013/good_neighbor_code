import PropTypes from "prop-types";
import Post from "../../../model/post";

const PostItemBodyViewPropTypes = {
  post: PropTypes.instanceOf(Post).isRequired
};

export default PostItemBodyViewPropTypes;
