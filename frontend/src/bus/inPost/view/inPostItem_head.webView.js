import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { date2String, nullOrRequiredValidator } from "@gn/common/util";

const Style = styled.div`
  display: flex;
  justify-content: space-between;
`;

const LeftStyle = styled.div`
  flex-grow: 1;
`;

function InPostItemHeadWebView(props) {
  const { postUserName, postUserEmail, dateCreate } = props;
  return (
    <Style>
      <LeftStyle>
        <span className="text-primary font-weight-bold">{postUserName}</span>
        {postUserEmail && (
          <span className="text-secondary font-weight-light">
            {` ${postUserEmail}`}
          </span>
        )}
      </LeftStyle>

      <div className="text-secondary font-weight-light">
        {`post on: ${date2String(dateCreate)}`}
      </div>
    </Style>
  );
}

InPostItemHeadWebView.propTypes = {
  postUserName: PropTypes.string.isRequired,
  postUserEmail: nullOrRequiredValidator("string"),
  dateCreate: PropTypes.instanceOf(Date).isRequired
};

export default InPostItemHeadWebView;
