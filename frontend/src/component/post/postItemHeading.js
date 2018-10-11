import React from "react";
import PropTypes from "prop-types";

import { date2String, nullOrRequiredValidator } from "../../util";
import { User } from "../../model/user";
import "./postItemHeading.css";

function PostItemHeading(props) {
  const { postUser, dateCreate } = props;
  return (
    <div className="post-item-heading">
      {postUser && (
        <div className="post-item-heading-user">
          <span className="text-primary font-weight-bold">{postUser.name}</span>
          <span className="text-secondary font-weight-light">
            {` ${postUser.email}`}
          </span>
        </div>
      )}

      <div className="post-item-heading-date text-secondary font-weight-light">
        {`post on: ${date2String(dateCreate)}`}
      </div>
    </div>
  );
}

PostItemHeading.propTypes = {
  postUser: nullOrRequiredValidator("object", User),
  dateCreate: PropTypes.instanceOf(Date).isRequired
};

export { PostItemHeading };
