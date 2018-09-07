import React, { Component } from "react";
import PropTypes from "prop-types";
import Modal from "react-modal";
Modal.setAppElement("#root");

class OutPostCrudDialog extends Component {
  constructor(props) {
    super(props);

    const {
      title = "",
      description = "",
      id: postID = null,
      isActive = true
    } = props.post ? props.post : {};

    this.state = { title, description, postID, isActive };
  }

  onTitleChange = e => {
    this.setState({ title: e.currentTarget.value });
  };

  onDescriptionChange = e => {
    this.setState({ description: e.currentTarget.value });
  };

  onIsActiveChange = e => {
    this.setState({ isActive: e.target.checked });
  };

  onSubmitPost = e => {
    this.props.onCrudPostCb(
      this.state.postID,
      this.state.title,
      this.state.description,
      this.state.isActive
    );

    e.preventDefault();
  };

  render() {
    const title = this.state.postID
      ? `Edit '${this.props.post.title}' post`
      : "Create new post";
    return (
      <div id="OutPostCrudDialog-react">
        <Modal
          isOpen={this.props.isOpen}
          shouldCloseOnOverlayClick={false}
          shouldCloseOnEsc={false}
        >
          <h1 className="ReactModal__title">{title}</h1>
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
                  className="form-control"
                  aria-describedby="post title"
                  onChange={this.onTitleChange}
                  value={this.state.title}
                  placeholder="post title"
                />
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
                  className="form-control"
                  aria-describedby="post description"
                  onChange={this.onDescriptionChange}
                  value={this.state.description}
                  rows="4"
                  placeholder="post description"
                />
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
                    checked={this.state.isActive}
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
            <div className="form-group row">
              <div className="col-sm-10">
                <button
                  type="button"
                  onClick={this.props.onCancelCrudPostDialog}
                  className="btn btn-warning"
                >
                  cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  ok
                </button>
              </div>
            </div>
          </form>
        </Modal>
      </div>
    );
  }
}

OutPostCrudDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  post: PropTypes.object, //if null then we create post, otherwise we edit post
  onCrudPostCb: PropTypes.func.isRequired,
  onCancelCrudPostDialog: PropTypes.func.isRequired
};

export { OutPostCrudDialog };
