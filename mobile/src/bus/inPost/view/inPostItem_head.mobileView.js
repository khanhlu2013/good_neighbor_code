import React from "react";
import { Text, StyleSheet } from "react-native";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import { date2String, nullOrRequiredValidator } from "@gn/common/util";

const Style = styled.View`
  flex-direction : row
  justify-content: space-between;
`;

const LeftStyle = styled.View`
  flex: 1;
`;

function InPostItemHeadMobileView(props) {
  const { postUserName, postUserEmail, dateCreate } = props;
  return (
    <Style>
      <LeftStyle>
        <Text>{`${postUserName}${postUserEmail && ` ${postUserEmail}`}`}</Text>
      </LeftStyle>

      <Text>{`post on: ${date2String(dateCreate)}`}</Text>
    </Style>
  );
}

InPostItemHeadMobileView.propTypes = {
  postUserName: PropTypes.string.isRequired,
  postUserEmail: nullOrRequiredValidator("string"),
  dateCreate: PropTypes.instanceOf(Date).isRequired
};

export default InPostItemHeadMobileView;
