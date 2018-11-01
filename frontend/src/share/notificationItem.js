import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { nullOrRequiredValidator } from "../util";
import LoadingIcon from "./loadingIcon";

const Wrap = styled.div`
  margin-left: 2px;
`;

const NotificationWrap = styled.div`
  background-color: ${props => (props.isImportant ? "red" : "peru")};
  color: white;
  border-radius: 5px 5px;
  padding: 1px 3px;
  line-height: 100%;
`;

function NotificationItem(props) {
  const { count, isImportant = true } = props;

  let html = null;
  if (count !== null && count !== 0) {
    html = (
      <NotificationWrap isImportant={isImportant}>{count}</NotificationWrap>
    );
  } else if (count === null) {
    html = <LoadingIcon text={null} />;
  } else {
    if (count !== 0) throw Error("Unexpected code path");
  }
  return <Wrap>{html}</Wrap>;
}
NotificationItem.propTypes = {
  count: nullOrRequiredValidator("number"),
  isImportant: PropTypes.bool.isRequired
};

export { NotificationItem };
