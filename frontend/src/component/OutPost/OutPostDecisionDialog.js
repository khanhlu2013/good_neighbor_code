import React from "react";
import PropTypes from "prop-types";
import Modal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
Modal.setAppElement("#root");

function OutPostDecisionDialog(props) {
  const {
    isOpen,
    post,
    onUndoApproveRequestingCb,
    onUndoDeniedShareCb,
    onDecideShareCb,
    onExitDialogCb
  } = props;

  const borrowingShare = post.borrowing;
  const borrower = borrowingShare ? borrowingShare.borrower : null;

  const onUndoBorrowing = e => {
    onUndoApproveRequestingCb(borrowingShare.id);
  };
  const onExitDialog = e => {
    onExitDialogCb();
  };

  return (
    <div id="OutPostDecisionDialog-react">
      <Modal
        isOpen={isOpen}
        shouldCloseOnOverlayClick={false}
        shouldCloseOnEsc={false}
      >
        <h1 className="ReactModal__title">{`Share '${post.title}'`}</h1>
        <h3 className="text-center">
          Current borrower: {borrower ? borrower.email : "none"}
          {borrower && (
            <button
              className="btn btn-lg btn-warning"
              id="OutPostDecisionDialogUndoApproveBtn"
              onClick={onUndoBorrowing}
            >
              undo
            </button>
          )}
        </h3>

        <div className="container">
          <div className="row">
            <div className="col-sm">
              <RequestingTable
                shares={post.requesting}
                onDecideShareCb={onDecideShareCb}
              />
            </div>
            <div className="col-sm">
              <DeniedTable
                shares={post.denied}
                onUndoDeniedShareCb={onUndoDeniedShareCb}
              />
            </div>
          </div>
        </div>
        <div className="text-center">
          <button
            className="btn btn-lg btn-warning"
            id="OutPostDecisionDialogExitBtn"
            onClick={onExitDialog}
          >
            exit
          </button>
        </div>
      </Modal>
    </div>
  );
}

OutPostDecisionDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  post: PropTypes.object.isRequired,
  onUndoApproveRequestingCb: PropTypes.func.isRequired,
  onUndoDeniedShareCb: PropTypes.func.isRequired,
  onDecideShareCb: PropTypes.func.isRequired,
  onExitDialogCb: PropTypes.func.isRequired
};

const denyTableFromClass = "col-10";
const denyTableUndoClass = "col-2 text-center";

function DeniedTable(props) {
  const { shares, onUndoDeniedShareCb } = props;
  const rows = shares.map(share => (
    <DeniedTableRow
      key={share.id}
      share={share}
      onUndoDeniedShareCb={onUndoDeniedShareCb}
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
  const { share, onUndoDeniedShareCb } = props;

  const onUndo = e => {
    onUndoDeniedShareCb(share.id);
  };
  return (
    <tr className="OutShareDeniedTableRow">
      <td className={denyTableFromClass}>{share.borrower.email}</td>
      <td className={denyTableUndoClass}>
        <button className="btn btn-success" onClick={onUndo}>
          <FontAwesomeIcon icon="undo-alt" />
        </button>
      </td>
    </tr>
  );
}
DeniedTableRow.propTypes = {
  share: PropTypes.object.isRequired,
  onUndoDeniedShareCb: PropTypes.func.isRequired
};

DeniedTable.propTypes = {
  shares: PropTypes.array.isRequired
};

const requestingTableFromClass = "col-10";
const requestingTableApproveClass = "text-center col-1";
const requestingTableDenyClass = "text-center col-1";

function RequestingTable(props) {
  const { shares, onDecideShareCb } = props;
  const rows = shares.map(share => (
    <RequestingTableRow
      key={share.id}
      share={share}
      onDecideShareCb={onDecideShareCb}
    />
  ));
  return (
    <table
      className="table table-striped table-bordered"
      id="OutShareRequestingTable"
    >
      <thead className="thead-light">
        <tr>
          <th className={requestingTableFromClass}>Waiting list</th>
          <th className={requestingTableApproveClass}>
            <FontAwesomeIcon icon="thumbs-up" />
          </th>
          <th className={requestingTableDenyClass}>
            <FontAwesomeIcon icon="thumbs-up" />
          </th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}
RequestingTable.propTypes = {
  shares: PropTypes.array.isRequired,
  onDecideShareCb: PropTypes.func.isRequired
};

function RequestingTableRow(props) {
  const { share, onDecideShareCb } = props;
  const onApprove = e => {
    onDecideShareCb(share.id, true);
  };
  const onDeny = e => {
    onDecideShareCb(share.id, false);
  };
  return (
    <tr className="OutShareRequestingTableRow">
      <td className={requestingTableFromClass}>{share.borrower.email}</td>
      <td className={requestingTableApproveClass}>
        {!Boolean(share.post.borrowing) && (
          <button
            className="OutShareRequestingTableRowApproveBtn btn btn-success"
            onClick={onApprove}
          >
            <FontAwesomeIcon icon="thumbs-up" />
          </button>
        )}
      </td>
      <td className={requestingTableDenyClass}>
        <button
          className="OutShareRequestingTableRowDenyBtn btn btn-warning"
          onClick={onDeny}
        >
          <FontAwesomeIcon icon="thumbs-down" />
        </button>
      </td>
    </tr>
  );
}
RequestingTableRow.propTypes = {
  share: PropTypes.object.isRequired,
  onDecideShareCb: PropTypes.func.isRequired
};

export { OutPostDecisionDialog };
