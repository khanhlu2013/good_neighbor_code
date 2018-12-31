import React from "react";
import styled from "styled-components";
import OutPostItemHeadPropType from "@gn/common/bus/outPost/propType/outPostItemHead.propType";

import { date2String } from "@gn/common/util";

const Style = styled.div`
  display: flex;
  justify-content: space-between;
`;

const LeftStyle = styled.div`
  flex-grow: 1;
`;

function OutPostItemHeadWebView(props) {
  const { postId, dateCreate, onUpdatePostClick } = props;

  return (
    <Style>
      <LeftStyle>
        <button
          id="outPostItem-editBtn-react"
          onClick={() => onUpdatePostClick(postId)}
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

OutPostItemHeadWebView.propTypes = OutPostItemHeadPropType;

export default OutPostItemHeadWebView;
