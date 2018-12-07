import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import Modal from "react-modal";
import classNames from "classnames";
import _ from "lodash";
import update from "immutability-helper";

import Post from "@gn/common/model/post";
import LoadingIcon from "../../../share/loadingIcon";
import { nullOrRequiredValidator } from "../../../share/util";

Modal.setAppElement("#root");

class OutPostCrudDialog extends Component {
  constructor(props) {
    super(props);
    let post;

    if (!props.post) {
      post = new Post(null, null, true, "", "", null, null);
    } else {
      post = _.cloneDeep(props.post);
    }
    this.state = { post };
  }

  static getDerivedStateFromProps(props, state) {
    const { post } = state;

    const { post: initPost } = props;
    let isPostChanged;
    if (initPost) {
      isPostChanged =
        post.title !== initPost.title ||
        post.description !== initPost.description ||
        post.isActive !== initPost.isActive;
    } else {
      isPostChanged =
        post.title !== "" || post.description !== "" || post.isActive !== true;
    }

    const isValidTitle = Boolean(post.title.trim());
    const isValidDescription = Boolean(post.description.trim());
    return { isPostChanged, isValidTitle, isValidDescription };
  }

  onTitleChange = e => {
    const post = update(this.state.post, { title: { $set: e.target.value } });
    this.setState({ post });
  };

  onDescriptionChange = e => {
    const post = update(this.state.post, {
      description: { $set: e.target.value }
    });
    this.setState({ post });
  };

  onIsActiveChange = e => {
    const post = update(this.state.post, {
      isActive: { $set: e.target.checked }
    });
    this.setState({ post });
  };

  onSubmitPost = e => {
    const { post } = this.state;
    this.props.onOk(post.id, post.title, post.description, post.isActive);

    e.preventDefault();
  };

  getOkCancelHtml = () => {
    let resultHtml;
    const { isValidTitle, isValidDescription } = this.state;

    if (this.props.isCrudingPost) {
      resultHtml = (
        <h1>
          <LoadingIcon text={this.props.post ? "Editing" : "Creating"} />
        </h1>
      );
    } else {
      resultHtml = (
        <Fragment>
          <button
            disabled={
              !this.state.isPostChanged || !isValidTitle || !isValidDescription
            }
            type="submit"
            className="btn btn-lg btn-primary"
          >
            ok
          </button>
          <button
            type="button"
            onClick={this.props.onCancel}
            className="btn btn-lg btn-warning"
          >
            cancel
          </button>
        </Fragment>
      );
    }

    return resultHtml;
  };

  render() {
    const { post } = this.state;
    const { isValidTitle, isValidDescription } = this.state;

    const dialogTitle = this.props.post
      ? `Edit '${this.props.post.title}' post`
      : "Create new post";

    return (
      <div id="OutPostCrudDialog-react">
        <Modal
          isOpen={this.props.isOpen}
          shouldCloseOnOverlayClick={false}
          shouldCloseOnEsc={false}
        >
          <h1 className="ReactModal__title">{dialogTitle}</h1>
          <form id="outPostCrudDialogForm-react" onSubmit={this.onSubmitPost}>
            <div className="form-group row">
              <label
                htmlFor="outpostCrudDialogFormTitle"
                className="col-sm-2 col-form-label"
              >
                Title
              </label>
              <div className="col-sm-10">
                <input
                  id="outpostCrudDialogFormTitle"
                  type="text"
                  className={classNames({
                    "form-control": true,
                    "is-valid": isValidTitle,
                    "is-invalid": !isValidTitle
                  })}
                  aria-describedby="post title"
                  onChange={this.onTitleChange}
                  value={post.title}
                  placeholder="post title"
                />
                <div className="invalid-feedback">required</div>
              </div>
            </div>

            <div className="form-group row">
              <label
                htmlFor="outpostCrudDialogFormDescription"
                className="col-sm-2 col-form-label"
              >
                Description
              </label>
              <div className="col-sm-10">
                <textarea
                  id="outpostCrudDialogFormDescription"
                  type="text"
                  className={classNames({
                    "form-control": true,
                    "is-valid": isValidDescription,
                    "is-invalid": !isValidDescription
                  })}
                  aria-describedby="post description"
                  onChange={this.onDescriptionChange}
                  value={post.description}
                  rows="4"
                  placeholder="post description"
                />
                <div className="invalid-feedback">required</div>
              </div>
            </div>

            <div className="form-group row">
              <div className="col-sm-2">Is Active</div>
              <div className="col-sm-10">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="outpostCrudDialogFormIsActive"
                    checked={post.isActive}
                    onChange={this.onIsActiveChange}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="outpostCrudDialogFormIsActive"
                  >
                    Is Active
                  </label>
                </div>
              </div>
            </div>
            <div className="text-center">{this.getOkCancelHtml()}</div>
          </form>
        </Modal>
      </div>
    );
  }
}

OutPostCrudDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  post: nullOrRequiredValidator("object"),
  isCrudingPost: PropTypes.bool.isRequired,
  onOk: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};

export default OutPostCrudDialog;
