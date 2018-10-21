import React from "react";
import PropTypes from "prop-types";

import { date2String } from "../../util";
import { User } from "../../model/user";
import "../post/postItem_head.css";

function InPostItemHead(props) {
  const { postUser, dateCreate } = props;
  return (
    <div className="post-item-head">
      <div className="post-item-head-left-side">
        <span className="text-primary font-weight-bold">{postUser.name}</span>
        <span className="text-secondary font-weight-light">
          {` ${postUser.email}`}
        </span>
      </div>

      <div className="post-item-head-date text-secondary font-weight-light">
        {`post on: ${date2String(dateCreate)}`}
      </div>
    </div>
  );
}

InPostItemHead.propTypes = {
  postUser: PropTypes.instanceOf(User).isRequired,
  dateCreate: PropTypes.instanceOf(Date).isRequired
};

export { InPostItemHead };
