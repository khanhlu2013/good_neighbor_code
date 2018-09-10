const inPostTree = {
  focusTab: () => {
    cy.get("##react-tabs-0").click();
  },
  undoRequesting: post => {
    cy.get("#InShareRequestingTable-react .InShareRequestingTableRow")
      .then(rows => {
        const row = Array.from(rows).find(row => {
          const text = row.textContent;
          return text.includes(post.title) && text.includes(post.description);
        });
        return cy.wrap(row);
      })
      .find(".InShareRequestingTableRowUndoBtn")
      .click();
  },
  request: post => {
    cy.get("#InPostTable-react .InPostTableRow")
      .then(rows => {
        const row = Array.from(rows).find(row => {
          const text = row.textContent;
          return text.includes(post.title) && text.includes(post.description);
        });
        return cy.wrap(row);
      })
      .find(".InPostTableRowBorrowBtn")
      .click();
  },
  snap: name => {
    cy.get(".isRefreshingInPosts").should("not.be.visible");
    cy.get("#InPostManagement-react").snapshot({ name });
  },
  returnBorrowing: post => {
    cy.get("#InShareBorrowingTable-react .InShareBorrowingTableRow")
      .then(rows => {
        const row = Array.from(rows).find(row => {
          const text = row.textContent;
          return text.includes(post.title) && text.includes(post.description);
        });
        return cy.wrap(row);
      })
      .find(".InShareBorrowingTableRowReturnBtn")
      .click();
  }
};

export { inPostTree };
