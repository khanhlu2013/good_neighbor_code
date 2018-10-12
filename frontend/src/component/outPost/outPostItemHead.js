import React from "react";
import PropTypes from "prop-types";

import { date2String } from "../../util";
import "../post/postItemHead.css";

function OutPostItemHead(props) {
  const { dateCreate, onEditPost } = props;

  const onEditPostClicked = e => {
    onEditPost();
  };

  return (
    <div className="post-item-head">
      <div className="post-item-head-left-side">
        <button
          id="outPostItem-editBtn-react"
          onClick={onEditPostClicked}
          className="btn btn-sm btn-primary"
        >
          edit post
        </button>
      </div>

      <div className="post-item-head-date text-secondary font-weight-light">
        {`post on: ${date2String(dateCreate)}`}
      </div>
    </div>
  );
}

OutPostItemHead.propTypes = {
  onEditPost: PropTypes.func.isRequired,
  dateCreate: PropTypes.instanceOf(Date).isRequired
};

export { OutPostItemHead };
