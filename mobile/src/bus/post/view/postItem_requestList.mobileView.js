import React from "react";
import styled from "styled-components";
import { Text, FlatList } from "react-native";
import PostItemRequestListViewPropType from "../../../common/bus/post/propType/postItem_requestList.view.propType";
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

function PostItemRequestListMobileView(props) {
  const { shares } = props;

  return (
    <Style>
      <Text>Request</Text>
      {shares.map(share => (
        <ItemStyle key={share.id}>
          <ItemBorrowerStyle>
            {share.borrower.getNameAndEmail()}
          </ItemBorrowerStyle>
          <Text>{date2String(share.dateCreate)}</Text>
        </ItemStyle>
      ))}
    </Style>
  );
}
PostItemRequestListMobileView.propTypes = PostItemRequestListViewPropType;

export default PostItemRequestListMobileView;
