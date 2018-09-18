import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Modal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LoadingIcon } from "../../util";
Modal.setAppElement("#root");

function OutPostDecisionDialog(props) {
  const {
    isOpen,
    post,
    isDecidingPost,
    onUndoApproveShare,
    onUndoDeniedShare,
    onDecideShare,
    onExit
  } = props;

  const borrowingShare = post.borrowing;
  const borrower = borrowingShare ? borrowingShare.borrower : null;

  const onUndoApproveBtnClicked = e => {
    onUndoApproveShare(borrowingShare.id);
  };
  const onExitBtnClicked = e => {
    onExit();
  };

  const content = (
    <Fragment>
      <h3 className="text-center">
        Current borrower: {borrower ? borrower.email : "none"}
        {borrower && (
          <button
            className="btn btn-lg btn-warning"
            id="OutPostDecisionDialogUndoApproveBtn"
            onClick={onUndoApproveBtnClicked}
          >
            undo
          </button>
        )}
      </h3>

      <div className="container">
        <div className="row">
          <div className="col-sm">
            <RequestTable shares={post.request} onDecideShare={onDecideShare} />
          </div>
          <div className="col-sm">
            <DeniedTable
              shares={post.denied}
              onUndoDeniedShare={onUndoDeniedShare}
            />
          </div>
        </div>
      </div>
      <div className="text-center">
        <button
          className="btn btn-lg btn-warning"
          id="OutPostDecisionDialogExitBtn"
          onClick={onExitBtnClicked}
        >
          exit
        </button>
      </div>
    </Fragment>
  );

  return (
    <Modal
      isOpen={isOpen}
      shouldCloseOnOverlayClick={false}
      shouldCloseOnEsc={false}
    >
      <div id="OutPostDecisionDialog-react">
        <h1 className="ReactModal__title">{`Share '${post.title}'`}</h1>
        {isDecidingPost ? (
          <h1 className="text-center">
            <LoadingIcon text="Please wait" isAnimate={true} />
          </h1>
        ) : (
          content
        )}
      </div>
    </Modal>
  );
}

OutPostDecisionDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  post: PropTypes.object.isRequired,
  isDecidingPost: PropTypes.bool.isRequired,
  onUndoApproveShare: PropTypes.func.isRequired,
  onUndoDeniedShare: PropTypes.func.isRequired,
  onDecideShare: PropTypes.func.isRequired,
  onExit: PropTypes.func.isRequired
};

const denyTableFromClass = "col-10";
const denyTableUndoClass = "col-2 text-center";

function DeniedTable(props) {
  const { shares, onUndoDeniedShare } = props;
  const rows = shares.map(share => (
    <DeniedTableRow
      key={share.id}
      share={share}
      onUndoDeniedShare={onUndoDeniedShare}
    />
  ));
  return (
    <table
      id="OutShareDeniedTable-react"
      className="table table-striped table-bordered"
    >
      <thead className="thead-light">
        <tr>
          <th className={denyTableFromClass}>Denial list</th>
          <th className={denyTableUndoClass}>undo</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}
function DeniedTableRow(props) {
  const { share, onUndoDeniedShare } = props;

  const onUndo = e => {
    onUndoDeniedShare(share.id);
  };
  return (
    <tr className="OutShareDeniedTableRow">
      <td className={denyTableFromClass}>{share.borrower.email}</td>
      <td className={denyTableUndoClass}>
        <button
          className="btn btn-success OutShareDeniedTableRowUndoBtn"
          onClick={onUndo}
        >
          <FontAwesomeIcon icon="undo-alt" />
        </button>
      </td>
    </tr>
  );
}
DeniedTableRow.propTypes = {
  share: PropTypes.object.isRequired,
  onUndoDeniedShare: PropTypes.func.isRequired
};

DeniedTable.propTypes = {
  shares: PropTypes.array.isRequired
};

const requestTableFromClass = "col-10";
const requestTableApproveClass = "text-center col-1";
const requestTableDenyClass = "text-center col-1";

function RequestTable(props) {
  const { shares, onDecideShare } = props;
  const rows = shares.map(share => (
    <RequestTableRow
      key={share.id}
      share={share}
      onDecideShare={onDecideShare}
    />
  ));
  return (
    <table
      className="table table-striped table-bordered"
      id="OutShareRequestTable"
    >
      <thead className="thead-light">
        <tr>
          <th className={requestTableFromClass}>Waiting list</th>
          <th className={requestTableApproveClass}>
            <FontAwesomeIcon icon="thumbs-up" />
          </th>
          <th className={requestTableDenyClass}>
            <FontAwesomeIcon icon="thumbs-up" />
          </th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}
RequestTable.propTypes = {
  shares: PropTypes.array.isRequired,
  onDecideShare: PropTypes.func.isRequired
};

function RequestTableRow(props) {
  const { share, onDecideShare } = props;
  const onApprove = e => {
    onDecideShare(share.id, true);
  };
  const onDeny = e => {
    onDecideShare(share.id, false);
  };
  return (
    <tr className="OutShareRequestTableRow">
      <td className={requestTableFromClass}>{share.borrower.email}</td>
      <td className={requestTableApproveClass}>
        {!Boolean(share.post.borrowing) && (
          <button
            className="OutShareRequestTableRowApproveBtn btn btn-success"
            onClick={onApprove}
          >
            <FontAwesomeIcon icon="thumbs-up" />
          </button>
        )}
      </td>
      <td className={requestTableDenyClass}>
        <button
          className="OutShareRequestTableRowDenyBtn btn btn-warning"
          onClick={onDeny}
        >
          <FontAwesomeIcon icon="thumbs-down" />
        </button>
      </td>
    </tr>
  );
}
RequestTableRow.propTypes = {
  share: PropTypes.object.isRequired,
  onDecideShare: PropTypes.func.isRequired
};

export { OutPostDecisionDialog };
