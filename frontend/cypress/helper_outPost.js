// - TAB
const tab = {
  focus: () => {
    cy.get("#react-tabs-2").click();
  },
  snap: name => {
    cy.get("#react-tabs-2").snapshot({ name });
  }
};

//- TABLE
const table = {
  decide: post => {
    cy.get("#OutPostTable-react .OutPostTableRow")
      .then(rows => {
        const row = Array.from(rows).find(row => {
          const text = row.textContent;
          return text.includes(post.title) && text.includes(post.description);
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
    cy.get(".isRefreshingOutPost").should("not.be.visible");
    cy.get("#OutPostManagement-react").snapshot({ name });
  }
};

//- CRUD-DIALOG
const crudDialog = {
  snap: name => {
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
  }
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
    cy.get(".isRefreshingOutPost").should("not.be.visible");
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
