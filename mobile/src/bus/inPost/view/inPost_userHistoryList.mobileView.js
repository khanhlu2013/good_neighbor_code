import React from "react";
import { StyleSheet } from "react-native";
import { Table, Row, Rows } from "react-native-table-component";

import PostListNoDataMobileView from "../../post/view/postListNoData.mobileView";
import { date2String } from "../../../common/util";
import InPostUserHistoryListPropType from "../../../common/bus/inPost/propType/inPost_userHistoryList.propType";

function InPostUserHistoryListMobileView(props) {
  const { shares } = props;
  if (shares.length === 0) {
    return <PostListNoDataMobileView />;
  }
  const tableHead = ["date", "post", "lender"];
  const rows = shares.map(share => [
    date2String(share.dateReturn),
    share.post.title,
    share.post.user.getNameAndEmail()
  ]);

  return (
    <Table borderStyle={{ borderWidth: 2, borderColor: "#c8e1ff" }}>
      <Row data={tableHead} style={styles.head} textStyle={styles.text} />
      <Rows data={rows} textStyle={styles.text} />
    </Table>
  );
}

InPostUserHistoryListMobileView.propTypes = InPostUserHistoryListPropType;

export default InPostUserHistoryListMobileView;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: "#fff" },
  head: { height: 40, backgroundColor: "#f1f8ff" },
  text: { margin: 6 }
});
