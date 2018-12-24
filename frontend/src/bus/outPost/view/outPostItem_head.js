import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { date2String } from "@gn/common/util";

const Style = styled.div`
  display: flex;
  justify-content: space-between;
`;

const LeftStyle = styled.div`
  flex-grow: 1;
`;

function OutPostItemHead(props) {
  const { dateCreate, onOpenUpdatePostDialog, postId } = props;

  const onUpdatePostClicked = e => {
    onOpenUpdatePostDialog(postId);
  };

  return (
    <Style>
      <LeftStyle>
        <button
          id="outPostItem-editBtn-react"
          onClick={onUpdatePostClicked}
          className="btn btn-sm btn-primary"
        >
          edit post
        </button>
      </LeftStyle>

      <div className="text-secondary font-weight-light">
        {`post on: ${date2String(dateCreate)}`}
      </div>
    </Style>
  );
}

OutPostItemHead.propTypes = {
  postId: PropTypes.string.isRequired,
  onOpenUpdatePostDialog: PropTypes.func.isRequired,
  dateCreate: PropTypes.instanceOf(Date).isRequired
};

export default OutPostItemHead;
