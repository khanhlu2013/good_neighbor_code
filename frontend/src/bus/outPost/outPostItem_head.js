import React from "react";
import PropTypes from "prop-types";

import {
  PostItemHeadStyle,
  PostItemHeadLeftStyle
} from "../post/component/style/postItem_head_style";
import { date2String } from "../../share/util";

function OutPostItemHead(props) {
  const { dateCreate, onEditPost } = props;

  const onEditPostClicked = e => {
    onEditPost();
  };

  return (
    <PostItemHeadStyle>
      <PostItemHeadLeftStyle>
        <button
          id="outPostItem-editBtn-react"
          onClick={onEditPostClicked}
          className="btn btn-sm btn-primary"
        >
          edit post
        </button>
      </PostItemHeadLeftStyle>

      <div className="text-secondary font-weight-light">
        {`post on: ${date2String(dateCreate)}`}
      </div>
    </PostItemHeadStyle>
  );
}

OutPostItemHead.propTypes = {
  onEditPost: PropTypes.func.isRequired,
  dateCreate: PropTypes.instanceOf(Date).isRequired
};

export default OutPostItemHead;
