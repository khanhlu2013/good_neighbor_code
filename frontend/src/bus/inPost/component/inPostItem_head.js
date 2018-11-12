import React from "react";
import PropTypes from "prop-types";

import User from "../../../model/user";
import {
  PostItemHeadStyle,
  PostItemHeadLeftStyle
} from "../../post/component/style/postItem_head_style";
import { date2String } from "../../../share/util";

function InPostItemHead(props) {
  const { postUser, dateCreate } = props;
  return (
    <PostItemHeadStyle>
      <PostItemHeadLeftStyle>
        <span className="text-primary font-weight-bold">{postUser.name}</span>
        <span className="text-secondary font-weight-light">
          {` ${postUser.email}`}
        </span>
      </PostItemHeadLeftStyle>

      <div className="text-secondary font-weight-light">
        {`post on: ${date2String(dateCreate)}`}
      </div>
    </PostItemHeadStyle>
  );
}

InPostItemHead.propTypes = {
  postUser: PropTypes.instanceOf(User).isRequired,
  dateCreate: PropTypes.instanceOf(Date).isRequired
};

export default InPostItemHead;