import React, { Component } from "react";
import PropTypes from "prop-types";

class OutPostDecisionDialogController extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isDecidingPost: false
    };

    this.wrapBeforeAfter_isDecidingPost_stateSetting_aroundPostDecisionAsyncHandler = this.wrapBeforeAfter_isDecidingPost_stateSetting_aroundPostDecisionAsyncHandler.bind(
      this
    );
  }

  wrapBeforeAfter_isDecidingPost_stateSetting_aroundPostDecisionAsyncHandler(
    asyncFn
  ) {
    return (...args) => {
      /**
       * Take in an original async function and return an enhance function.
       * The enhance function's only purpose is to receive args when it is invoked by the client
       * These arg will be pass through the original function for consumption
       * The original function will also be wrap by setState to indicate before and after.
       */
      this.setState({ isDecidingPost: true });
      asyncFn(...args).then(result => this.setState({ isDecidingPost: false }));
    };
  }

  render() {
    const {
      view,
      onUndoApproveShare: onUndoApproveShare_ori,
      onUndoDenyShare: onUndoDenyShare_ori,
      onDecideShare: onDecideShare_ori
    } = this.props;
    const { isDecidingPost } = this.state;
    const onUndoApproveShare = this.wrapBeforeAfter_isDecidingPost_stateSetting_aroundPostDecisionAsyncHandler(
      onUndoApproveShare_ori
    );
    const onUndoDenyShare = this.wrapBeforeAfter_isDecidingPost_stateSetting_aroundPostDecisionAsyncHandler(
      onUndoDenyShare_ori
    );
    const onDecideShare = this.wrapBeforeAfter_isDecidingPost_stateSetting_aroundPostDecisionAsyncHandler(
      onDecideShare_ori
    );

    return React.createElement(view, {
      ...this.props,
      onUndoApproveShare,
      onUndoDenyShare,
      onDecideShare,
      isDecidingPost
    });
  }
}

OutPostDecisionDialogController.propTypes = {
  view: PropTypes.func.isRequired,
  onUndoApproveShare: PropTypes.func.isRequired,
  onUndoDenyShare: PropTypes.func.isRequired,
  onDecideShare: PropTypes.func.isRequired
};

export default OutPostDecisionDialogController;
