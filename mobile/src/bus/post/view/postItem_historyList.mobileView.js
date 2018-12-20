import React from "react";
import styled from "styled-components";
import { Text } from "react-native";
import PostItemHistoryListViewPropType from "../../../common/bus/post/propType/postItem_requestList.view.propType";
import { date2String } from "../../../common/util";

const Style = styled.View`
  padding: 5px;
  background: whitesmoke;
`;
const ItemStyle = styled.View`
  flex-direction: row;
`;
const ItemBorrowerStyle = styled.Text`
  flex: 1;
`;

function renderItem({ item }) {
  const { share } = item;
  return (
    <ItemStyle>
      <ItemBorrowerStyle>{share.borrower.getNameAndEmail()}</ItemBorrowerStyle>
      <Text>{date2String(share.dateReturn)}</Text>
    </ItemStyle>
  );
}

function PostItemHistoryListMobileView(props) {
  const { shares } = props;

  return (
    <Style>
      <Text>History</Text>
      {shares.map(share => (
        <ItemStyle key={share.id}>
          <ItemBorrowerStyle>
            {share.borrower.getNameAndEmail()}
          </ItemBorrowerStyle>
          <Text>{date2String(share.dateReturn)}</Text>
        </ItemStyle>
      ))}
    </Style>
  );
}
PostItemHistoryListMobileView.propTypes = PostItemHistoryListViewPropType;

export default PostItemHistoryListMobileView;
