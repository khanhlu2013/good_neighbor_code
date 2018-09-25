import React from "react";
import PropTypes from "prop-types";

function PostItemBody(props) {
  const { title, description } = props;

  return (
    <div className="post-item-body">
      <div>
        <span className="text-secondary font-weight-light">title: </span>
        {title}
      </div>
      <div>
        <span className="text-secondary font-weight-light">description: </span>
        {description}
      </div>
    </div>
  );
}
PostItemBody.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
};

export { PostItemBody };
