import PropTypes from "prop-types";

function InPostListController(props) {
  const { posts, renderProp } = props;

  const sortedPosts = [...posts].sort(
    (p1, p2) => p2.dateCreate - p1.dateCreate
  );
  return renderProp(sortedPosts);
}
InPostListController.propTypes = {
  posts: PropTypes.array.isRequired,
  renderProp: PropTypes.func.isRequired
};

export default InPostListController;
