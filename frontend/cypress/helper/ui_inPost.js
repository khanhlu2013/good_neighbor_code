const waitForMainPageLoadingFinish = () => {
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
    waitForMainPageLoadingFinish();
    cy.get("#InPostManagement-react").snapshot({ name });
  },
  returnBorrow: post => {
    cy.get("#InShareBorrowTable-react .InShareBorrowTableRow")
      .then(rows => {
        const row = Array.from(rows).find(row => {
          const text = row.textContent;
          return text.includes(post.title);
        });
        return cy.wrap(row);
      })
      .find(".InShareBorrowTableRowReturnBtn")
      .click();
  },
  waitForMainPageLoadingFinish
};

export { inPostTree };
