import React from "react";
import styled from "styled-components";
import { Text, FlatList } from "react-native";
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
  const prepData = shares.map(share => ({ share, key: share.id }));

  return (
    <Style>
      <Text>History</Text>
      <FlatList data={prepData} renderItem={renderItem} />
    </Style>
  );
}
PostItemHistoryListMobileView.propTypes = PostItemHistoryListViewPropType;

export default PostItemHistoryListMobileView;
