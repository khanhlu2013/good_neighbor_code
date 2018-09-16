const waitForCrudDialogLoadingFinish = () => {
  cy.get("#OutPostCrudDialogForm-react #LoadingIcon-react").should(
    "not.be.visible"
  );
};

// - TAB
const tab = {
  focus: () => {
    cy.get("#TabSelector_OutPost").click();
  },
  snap: name => {
    cy.get("#TabSelector_OutPost #LoadingIcon-react").should("not.be.visible");
    cy.get("#TabSelector_OutPost").snapshot({ name });
  }
};

//- TABLE
const table = {
  decide: post => {
    cy.get("#OutPostTable-react .OutPostTableRow")
      .then(rows => {
        const row = Array.from(rows).find(row => {
          const text = row.textContent;
          return text.includes(post.title);
        });
        return cy.wrap(row);
      })
      .find(".OutPostTableRowDecideBtn")
      .click();
  },
  edit: rowIndex => {
    cy.get("#OutPostTable-react .OutPostTableRow")
      .eq(rowIndex)
      .find(".OutPostTableRowEditBtn")
      .click();
  },
  snap: name => {
    cy.get("#OutPostManagement-react #LoadingIcon-react").should(
      "not.be.visible"
    );
    cy.get("#OutPostManagement-react").snapshot({ name });
  },
  snapRightAway: name => {
    cy.get("#OutPostManagement-react").snapshot({ name });
  }
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
  decide: (user, isApprove) => {
    const btnClassName = isApprove
      ? "OutShareRequestingTableRowApproveBtn"
      : "OutShareRequestingTableRowDenyBtn";
    cy.get("#OutShareRequestingTable .OutShareRequestingTableRow")
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
    cy.get("#OutPostDecisionDialog-react #LoadingIcon-react").should(
      "not.be.visible"
    );
    cy.get("#OutPostDecisionDialog-react").snapshot({ name });
  },
  exit: () => {
    cy.get("#OutPostDecisionDialogExitBtn").click();
  }
};

const outPostTree = {
  tab,
  table,
  crudDialog,
  decisionDialog,
  createNewPost: () => {
    cy.get("#createPostBtn").click();
  }
};

export { outPostTree };
