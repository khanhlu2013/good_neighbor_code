import React, { Component } from "react";
import PropTypes from "prop-types";
import Modal from "react-modal";
Modal.setAppElement("#root");

class OutPostDialog extends Component {
  constructor(props) {
    super(props);

    const {
      title = "",
      description = "",
      _id: postID = null,
      isActive = true
    } = props.outPost ? props.outPost : {};

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
    this.props.onCrudOutPostCb(
      this.state.postID,
      this.state.title,
      this.state.description,
      this.state.isActive
    );

    e.preventDefault();
  };

  render() {
    return (
      <div id="OutPostDialog-react">
        <Modal
          isOpen={this.props.isOpen}
          shouldCloseOnOverlayClick={false}
          shouldCloseOnEsc={false}
        >
          <h1>CrudPost Dialog</h1>
          <form id="OutPostDialogForm-react" onSubmit={this.onSubmitPost}>
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

OutPostDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  outPost: PropTypes.object, //if null then we create post, otherwise we edit post
  onCrudOutPostCb: PropTypes.func.isRequired,
  onCancelCrudPostDialog: PropTypes.func.isRequired
};

export { OutPostDialog };
