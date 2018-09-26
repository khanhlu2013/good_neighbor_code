const waitForMainPageLoadingFinish = () => {
  cy.get("#InPostManagement-react #LoadingIcon-react").should("not.be.visible");
};

const _genList = listId => ({
  request: post => {
    cy.get(`#${listId} #inPost-item-react`)
      .then(items => {
        const item = Array.from(items).find(item =>
          item.textContent.includes(`title: ${post.title}`)
        );
        return cy.wrap(item);
      })
      .find("#outPostItem-requestBtn-react")
      .click();
  },
  undoRequest: post => {
    cy.get(`#${listId} #inPost-item-react`)
      .then(items => {
        const item = Array.from(items).find(item =>
          item.textContent.includes(`title: ${post.title}`)
        );
        return cy.wrap(item);
      })
      .find("#outPostItem-undoRequestBtn-react")
      .click();
  },
  awareApprove: post => {
    cy.get(`#${listId} #inPost-item-react`)
      .then(items => {
        const item = Array.from(items).find(item =>
          item.textContent.includes(`title: ${post.title}`)
        );
        return cy.wrap(item);
      })
      .find("#outPostItem-awareApproveBtn-react")
      .click();
  },
  return: post => {
    cy.get(`#${listId} #inPost-item-react`)
      .then(items => {
        const item = Array.from(items).find(item =>
          item.textContent.includes(`title: ${post.title}`)
        );
        return cy.wrap(item);
      })
      .find("#outPostItem-returnBtn-react")
      .click();
  }
});

const list = {
  all: _genList("inPostList-all-react"),
  request: _genList("inPostList-request-react"),
  approveNote: _genList("inPostList-approveNote-react"),
  borrow: _genList("inPostList-borrow-react")
};

const inPostUi = {
  // undoRequest: post => {
  //   cy.get("#InShareRequestTable-react .InShareRequestTableRow")
  //     .then(rows => {
  //       const row = Array.from(rows).find(row => {
  //         const text = row.textContent;
  //         return text.includes(post.title);
  //       });
  //       return cy.wrap(row);
  //     })
  //     .find(".InShareRequestTableRowUndoBtn")
  //     .click();
  // },
  // request: post => {
  //   cy.get("#InPostTable-react .InPostTableRow")
  //     .then(rows => {
  //       const row = Array.from(rows).find(row => {
  //         const text = row.textContent;
  //         return text.includes(post.title);
  //       });
  //       return cy.wrap(row);
  //     })
  //     .find(".InPostTableRowBorrowBtn")
  //     .click();
  // },

  // awareApprove: post => {
  //   cy.get("#InShareBorrowTable-react .InShareBorrowTableRow")
  //     .then(rows => {
  //       const row = Array.from(rows).find(row => {
  //         const text = row.textContent;
  //         return text.includes(post.title);
  //       });
  //       return cy.wrap(row);
  //     })
  //     .find(".InShareBorrowTableRowAwareBtn")
  //     .click();
  // },
  // returnBorrow: post => {
  //   cy.get("#InShareBorrowTable-react .InShareBorrowTableRow")
  //     .then(rows => {
  //       const row = Array.from(rows).find(row => {
  //         const text = row.textContent;
  //         return text.includes(post.title);
  //       });
  //       return cy.wrap(row);
  //     })
  //     .find(".InShareBorrowTableRowReturnBtn")
  //     .click();
  // },
  list,
  waitForMainPageLoadingFinish,
  snapRightAway: name => {
    cy.get("#InPostManagement-react").snapshot({ name });
  },
  snap: name => {
    waitForMainPageLoadingFinish();
    cy.get("#InPostManagement-react").snapshot({ name });
  }
};

export { inPostUi };
