import React from "react";
import PropTypes from "prop-types";
import Modal from "react-modal";
Modal.setAppElement("#root");

function OutPostDecisionDialog(props) {
  const {
    isOpen,
    post,
    onUndoBorrowingCb,
    onUndoDeniedShareCb,
    onDecideRequestingShareCb,
    onExitDialogCb
  } = props;

  const onUndoBorrowing = e => {
    onUndoBorrowingCb(post.id);
  };
  const onExitDialog = e => {
    onExitDialogCb();
  };

  const borrowingShare = post.borrowing;
  const borrower = borrowingShare ? borrowingShare.borrower : null;
  return (
    <div id="OutPostDecisionDialog-react">
      <Modal
        isOpen={isOpen}
        shouldCloseOnOverlayClick={false}
        shouldCloseOnEsc={false}
      >
        <h1>Out Post Decision Dialog</h1>
        <p>
          Current borrower: {borrower ? borrower.email : "none"}
          {borrower && <button onClick={onUndoBorrowing}>undo</button>}
        </p>
        <RequestingTable
          shares={post.requesting}
          onDecideRequestingShareCb={onDecideRequestingShareCb}
        />
        <DeniedTable
          shares={post.denied}
          onUndoDeniedShareCb={onUndoDeniedShareCb}
        />
        <BorrowedTable shares={post.borrowed} />
        <button onClick={onExitDialog}>exit</button>
      </Modal>
    </div>
  );
}

OutPostDecisionDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  post: PropTypes.object.isRequired,
  onUndoBorrowingCb: PropTypes.func.isRequired,
  onUndoDeniedShareCb: PropTypes.func.isRequired,
  onDecideRequestingShareCb: PropTypes.func.isRequired,
  onExitDialogCb: PropTypes.func.isRequired
};

function DeniedTable(props) {
  const { shares, onUndoDeniedShareCb } = props;
  const rows = shares.map(share => (
    <DeniedTableRow share={share} onUndoDeniedShareCb={onUndoDeniedShareCb} />
  ));
  return (
    <table id="OutShareDeniedTable-react">
      <caption>Denied Table</caption>
      <thead>
        <tr>
          <td>User</td>
          <td>undo</td>
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
      <td>{share.borrower.email}</td>
      <td>
        <button onClick={onUndo}>undo</button>
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

function RequestingTable(props) {
  const { shares, onDecideRequestingShareCb } = props;
  const rows = shares.map(share => (
    <RequestingTableRow
      key={share.id}
      share={share}
      onDecideRequestingShareCb={onDecideRequestingShareCb}
    />
  ));
  return (
    <table>
      <caption>Requesting table</caption>
      <thead>
        <tr>
          <th>User</th>
          <th>approve</th>
          <th>denied</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}
RequestingTable.propTypes = {
  shares: PropTypes.array.isRequired,
  onDecideRequestingShareCb: PropTypes.func.isRequired
};

function RequestingTableRow(props) {
  const { share, onDecideRequestingShareCb } = props;
  const onApprove = e => {
    onDecideRequestingShareCb(share.id, true);
  };
  const onDeny = e => {
    onDecideRequestingShareCb(share.id, false);
  };
  return (
    <tr className="OutShareRequestingTableRow">
      <td>{share.borrower.email}</td>
      <td>
        <button disabled={share.post.borrowing !== null} onClick={onApprove}>
          approve
        </button>
      </td>
      <td>
        <button onClick={onDeny}>deny</button>
      </td>
    </tr>
  );
}
RequestingTableRow.propTypes = {
  share: PropTypes.object.isRequired,
  onDecideRequestingShareCb: PropTypes.func.isRequired
};

function BorrowedTable(props) {
  return <h1>borrowed table</h1>;
}
BorrowedTable.propTypes = {
  shares: PropTypes.array.isRequired
};

export { OutPostDecisionDialog };
