const waitForLoading = () => {
  cy.get("#InPostManagement-react #LoadingIcon-react").should("not.be.visible");
};

const inPostTree = {
  tab: {
    focus: () => {
      cy.get("#TabSelector_InPost").click();
    }
  },
  undoRequest: post => {
    cy.get("#InShareRequestTable-react .InShareRequestTableRow")
      .then(rows => {
        const row = Array.from(rows).find(row => {
          const text = row.textContent;
          return text.includes(post.title);
        });
        return cy.wrap(row);
      })
      .find(".InShareRequestTableRowUndoBtn")
      .click();
  },
  request: post => {
    cy.get("#InPostTable-react .InPostTableRow")
      .then(rows => {
        const row = Array.from(rows).find(row => {
          const text = row.textContent;
          return text.includes(post.title);
        });
        return cy.wrap(row);
      })
      .find(".InPostTableRowBorrowBtn")
      .click();
  },
  snapRightAway: name => {
    cy.get("#InPostManagement-react").snapshot({ name });
  },
  snap: name => {
    waitForLoading();
    cy.get("#InPostManagement-react").snapshot({ name });
  },
  returnBorrowing: post => {
    cy.get("#InShareBorrowingTable-react .InShareBorrowingTableRow")
      .then(rows => {
        const row = Array.from(rows).find(row => {
          const text = row.textContent;
          return text.includes(post.title);
        });
        return cy.wrap(row);
      })
      .find(".InShareBorrowingTableRowReturnBtn")
      .click();
  }
};

export { inPostTree };
