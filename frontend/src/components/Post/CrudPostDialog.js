import React, { Component } from "react";
import PropTypes from "prop-types";
import Modal from "react-modal";
Modal.setAppElement("#root");

class CrudPostDialog extends Component {
  constructor(props) {
    super(props);
    const { curCrudPost } = props;
    let title = "";
    let description = "";
    if (curCrudPost) {
      title = curCrudPost.title;
      description = curCrudPost.description;
    }

    this.state = { title, description };
  }

  onTitleChange = e => {
    this.setState({ title: e.currentTarget.value });
  };

  onDescriptionChange = e => {
    this.setState({ description: e.currentTarget.value });
  };

  onSubmitPost = e => {
    this.props.onCrudPost(
      this.props.curCrudPost,
      this.state.title,
      this.state.description
    );

    e.preventDefault();
  };

  render() {
    return (
      <div id="CrudPostDialog-react">
        <Modal
          isOpen={this.props.isOpenCrudPostDialog}
          shouldCloseOnOverlayClick={false}
          shouldCloseOnEsc={false}
        >
          <h1>CrudPost Dialog</h1>
          <form onSubmit={this.onSubmitPost}>
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
            <button type="submit">post</button>
            <button type="button" onClick={this.props.onCancelCrudPostDialog}>
              cancel
            </button>
          </form>
        </Modal>
      </div>
    );
  }
}

CrudPostDialog.propTypes = {
  isOpenCrudPostDialog: PropTypes.bool.isRequired,
  curCrudPost: PropTypes.object, //if null then we create post, otherwise we edit post
  onCrudPost: PropTypes.func.isRequired,
  onCancelCrudPostDialog: PropTypes.func.isRequired
};

export { CrudPostDialog };
