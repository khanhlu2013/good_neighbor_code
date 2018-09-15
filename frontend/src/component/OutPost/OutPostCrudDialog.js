import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import Modal from "react-modal";
import deepEqual from "deep-equal";
import classNames from "classnames";
import _ from "lodash";

import { Post } from "../../model/post";
import { LoadingIcon } from "../../util";

Modal.setAppElement("#root");

class OutPostCrudDialog extends Component {
  constructor(props) {
    super(props);
    let post = props.post;
    if (!post) {
      post = new Post(null, null, true, "", "", null, null);
    }
    this.state = { post, initPost: post };
  }

  static getDerivedStateFromProps(props, state) {
    return { isPostChanged: !deepEqual(state.post, state.initPost) };
  }

  onTitleChange = e => {
    const post = _.cloneDeep(this.state.post);
    post.title = e.target.value;
    this.setState({ post });
  };

  onDescriptionChange = e => {
    const post = _.cloneDeep(this.state.post);
    post.description = e.target.value;
    this.setState({ post });
  };

  onIsActiveChange = e => {
    const post = _.cloneDeep(this.state.post);
    post.isActive = e.target.checked;
    this.setState({ post });
  };

  onSubmitPost = e => {
    const { post } = this.state;
    this.props.onOk(post.id, post.title, post.description, post.isActive);

    e.preventDefault();
  };

  getOkCancelHtml = () => {
    const { post, isCrudingPost } = this.props;
    let resultHtml;

    if (isCrudingPost) {
      resultHtml = (
        <h1>
          <LoadingIcon text={post ? "Editing" : "Creating"} isAnimate={true} />
        </h1>
      );
    } else {
      resultHtml = (
        <Fragment>
          <button
            disabled={!this.state.isPostChanged || post.getValidateError()}
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
    const error = post.getValidateError();
    const validTitle = !error || !error.title;
    const validDescription = !error || !error.description;

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
          <form id="OutPostCrudDialogForm-react" onSubmit={this.onSubmitPost}>
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
                    "is-valid": validTitle,
                    "is-invalid": !validTitle
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
                    "is-valid": validDescription,
                    "is-invalid": !validDescription
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
  post: PropTypes.object, //if null then we create post, otherwise we edit post
  isCrudingPost: PropTypes.bool.isRequired,
  onOk: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};

export { OutPostCrudDialog };
