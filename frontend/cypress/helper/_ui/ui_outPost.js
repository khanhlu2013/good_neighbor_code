const waitForCrudDialogLoadingFinish = () => {
  cy.get("#OutPostCrudDialogForm-react #LoadingIcon-react").should(
    "not.be.visible"
  );
};

const waitForDecisionDialogLoadingFinish = () => {
  cy.get("#OutPostDecisionDialog-react #LoadingIcon-react").should(
    "not.be.visible"
  );
};

const waitForMainPageLoadingFinish = () => {
  cy.get("#OutPostManagement-react #LoadingIcon-react").should(
    "not.be.visible"
  );
};

const _genList = listId => ({
  decide: post => {
    cy.get(`#${listId} #outPost-item-react`)
      .then(items => {
        const item = Array.from(items).find(item =>
          item.textContent.includes(`title: ${post.title}`)
        );
        return cy.wrap(item);
      })
      .find("#outPostItem-decisionBtn-react")
      .click();
  },
  awareReturn: post => {
    cy.get(`#${listId} #outPost-item-react`)
      .then(items => {
        const item = Array.from(items).find(item =>
          item.textContent.includes(`title: ${post.title}`)
        );
        return cy.wrap(item);
      })
      .find("#outPostItem-awareReturnBtn-react")
      .click();
  },

  edit: post => {
    cy.get(`#${listId} #outPost-item-react`)
      .then(items => {
        const item = Array.from(items).find(item =>
          item.textContent.includes(`title: ${post.title}`)
        );
        return cy.wrap(item);
      })
      .find("#outPostItem-editBtn-react")
      .click();
  }
});

const list = {
  all: _genList("outPostList-all-react"),
  requestNote: _genList("outPostList-requestNote-react"),
  borrow: _genList("outPostList-borrow-react"),
  returnNote: _genList("outPostList-returnNote-react")
};

//- CRUD-DIALOG
const crudDialog = {
  snapRightAway: name => {
    cy.get("#OutPostCrudDialogForm-react").snapshot({ name });
  },
  fillOut: (title, description, isActive) => {
    cy.get("#OutPostCrudDialogForm-react :text")
      .clear()
      .type(`${title}`);
    cy.get("#OutPostCrudDialogForm-react textarea")
      .clear()
      .type(`${description}`);
    const isActiveCheckBox = cy.get("#OutPostCrudDialogForm-react :checkbox");
    if (isActive) {
      isActiveCheckBox.check();
    } else {
      isActiveCheckBox.uncheck();
    }
  },
  submit: () => {
    cy.get("#OutPostCrudDialogForm-react :submit").click();
  },
  waitForLoadingFinish: waitForCrudDialogLoadingFinish
};

//- DECISION-DIALOG
const decisionDialog = {
  undoApprove: () => {
    cy.get("#OutPostDecisionDialogUndoApproveBtn").click();
  },
  undoDenied: user => {
    cy.get("#OutShareDeniedTable-react")
      .then(rows => {
        const row = Array.from(rows).find(row =>
          row.textContent.includes(user.email)
        );
        return cy.wrap(row);
      })
      .find(".OutShareDeniedTableRowUndoBtn")
      .click();
  },
  decide: (user, isApprove) => {
    const btnClassName = isApprove
      ? "OutShareRequestTableRowApproveBtn"
      : "OutShareRequestTableRowDenyBtn";
    cy.get("#OutShareRequestTable .OutShareRequestTableRow")
      .then(rows => {
        const row = Array.from(rows).find(row =>
          row.textContent.includes(user.email)
        );
        return cy.wrap(row);
      })
      .find(`.${btnClassName}`)
      .click();
  },
  snap: name => {
    waitForDecisionDialogLoadingFinish();
    cy.get("#OutPostDecisionDialog-react").snapshot({ name });
  },
  snapRightAway: name => {
    cy.get("#OutPostDecisionDialog-react").snapshot({ name });
  },
  exit: () => {
    cy.get("#OutPostDecisionDialogExitBtn").click();
  },
  waitForLoadingFinish: waitForDecisionDialogLoadingFinish
};

const outPostUi = {
  crudDialog,
  decisionDialog,
  createNewPost: () => {
    cy.get("#createPostBtn").click();
  },
  list,
  waitForMainPageLoadingFinish,
  snap: name => {
    waitForMainPageLoadingFinish();
    cy.get("#OutPostManagement-react").snapshot({ name });
  },
  snapRightAway: name => {
    cy.get("#OutPostManagement-react").snapshot({ name });
  }
};

export { outPostUi };
