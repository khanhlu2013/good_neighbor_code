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
    return (
      <div id="OutPostCrudDialog-react">
        <Modal
          isOpen={this.props.isOpen}
          shouldCloseOnOverlayClick={false}
          shouldCloseOnEsc={false}
        >
          <h1>CrudPost Dialog</h1>
          <form id="OutPostCrudDialogForm-react" onSubmit={this.onSubmitPost}>
            <input
              type="text"
              onChange={this.onTitleChange}
              value={this.state.title}
              placeholder="post title"
            />
            <textarea
              onChange={this.onDescriptionChange}
              value={this.state.description}
              placeholder="post description"
            />
            <label>
              Is Active
              <input
                type="checkbox"
                checked={this.state.isActive}
                onChange={this.onIsActiveChange}
              />
            </label>
            <button type="submit">ok</button>
            <button type="button" onClick={this.props.onCancelCrudPostDialog}>
              cancel
            </button>
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
