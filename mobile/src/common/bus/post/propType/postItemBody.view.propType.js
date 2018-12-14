import PropTypes from "prop-types";
import Post from "../../../model/post";

const PostItemBodyViewPropType = {
  post: PropTypes.instanceOf(Post).isRequired
};

export default PostItemBodyViewPropType;
