import React from "react";
import { StyleSheet } from "react-native";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import { date2String, nullOrRequiredValidator } from "../../../common/util";

const Style = styled.View`
  justify-content: space-between;
`;

const LeftStyle = styled.View`
  flex: 1;
`;

function InPostItemHead(props) {
  const { postUserName, postUserEmail, dateCreate } = props;
  return (
    <Style>
      <LeftStyle>
        <Text>{postUserName}</Text>
        {postUserEmail && <Text>{` ${postUserEmail}`}</Text>}
      </LeftStyle>

      <Text>{`post on: ${date2String(dateCreate)}`}</Text>
    </Style>
  );
}

InPostItemHead.propTypes = {
  postUserName: PropTypes.string.isRequired,
  postUserEmail: nullOrRequiredValidator("string"),
  dateCreate: PropTypes.instanceOf(Date).isRequired
};

export default InPostItemHead;
