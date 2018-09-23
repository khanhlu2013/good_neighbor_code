import React, { Component } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import className from "classnames";
import { LoadingIcon, date2String } from "../../util";
const titleClass = "col-4";
const fromClass = "col-2";
const dateClass = "col-2";
const recycleClass = "text-center col-1";
const requestClass = "text-center col-1";
const borrowClass = "text-center col-1";
const doRequestClass = "text-center col-1";

class Table extends Component {
  state = {
    filterStr: ""
  };

  onFilterChange = e => {
    this.setState({ filterStr: e.target.value });
  };

  render() {
    const { filterStr } = this.state;
    const { posts, requestingPostIds, onCreateShare, loginUser } = this.props;
    const rows = posts
      .filter(
        post =>
          post.title.includes(filterStr) || post.description.includes(filterStr)
      )
      .sort((p1, p2) => p2.dateCreated - p1.dateCreated)
      .map(post => (
        <TableRow
          key={post.id}
          loginUser={loginUser}
          post={post}
          isRequestingPost={requestingPostIds.includes(post.id)}
          onCreateShare={onCreateShare}
        />
      ));

    return (
      <table
        id="InPostTable-react"
        className="table table-sm table-striped table-bordered"
      >
        <thead className="thead-light">
          <tr>
            <th className={titleClass}>
              all
              <input
                type="text"
                placeholder="filter"
                value={this.state.filterStr}
                onChange={this.onFilterChange}
              />
            </th>
            <th className={fromClass}>from</th>
            <th className={dateClass}>date</th>
            <th className={recycleClass}>
              <FontAwesomeIcon icon="recycle" />
            </th>
            <th className={requestClass}>
              <FontAwesomeIcon icon="question" />
            </th>
            <th className={borrowClass}>
              <FontAwesomeIcon icon="user-clock" />
            </th>
            <th className={doRequestClass}>request</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}

Table.propTypes = {
  loginUser: PropTypes.object.isRequired,
  posts: PropTypes.array.isRequired,
  requestingPostIds: PropTypes.array.isRequired,
  onCreateShare: PropTypes.func.isRequired
};

function TableRow(props) {
  const { loginUser, post, isRequestingPost, onCreateShare } = props;
  const onCreateShareClicked = e => {
    onCreateShare(post.id);
  };
  const isMeRequest = post.requestShares.some(
    share => share.borrower.id === loginUser.id
  );
  const borrowShare = post.curBorrowShare;
  const borrower = borrowShare ? borrowShare.borrower : null;
  const isMeBorrow = borrower && borrower.id === loginUser.id;

  let requestColumnHtml;
  if (isMeRequest || isMeBorrow) {
    requestColumnHtml = (
      <span>
        <FontAwesomeIcon icon="check" />
      </span>
    );
  } else if (isRequestingPost) {
    requestColumnHtml = <LoadingIcon text={null} isAnimate={true} />;
  } else if (!post.isActive) {
    requestColumnHtml = "not active";
  } else {
    requestColumnHtml = (
      <button
        className="InPostTableRowBorrowBtn btn btn-success"
        onClick={onCreateShareClicked}
      >
        <FontAwesomeIcon icon="question" />
      </button>
    );
  }
  return (
    <tr
      className={className({
        InPostTableRow: true,
        "table-success": isMeRequest || isMeBorrow
      })}
    >
      <td className={titleClass}>{post.title}</td>
      <td className={fromClass}>{post.user.email}</td>
      <td className={dateClass}>{date2String(post.dateCreated)}</td>
      <td className={recycleClass}>{post.returnShares.length}</td>
      <td className={requestClass}>{post.requestShares.length}</td>
      <td className={borrowClass}>{borrower ? borrower.email : ""}</td>
      <td className={doRequestClass}>{requestColumnHtml}</td>
    </tr>
  );
}
TableRow.propTypes = {
  loginUser: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  isRequestingPost: PropTypes.bool.isRequired,
  onCreateShare: PropTypes.func.isRequired
};

export { Table as InPostTable };
