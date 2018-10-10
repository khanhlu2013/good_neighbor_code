const waitForMainPageLoadingFinish = () => {
  cy.get("#inPostManagement-react #LoadingIcon-react").should("not.be.visible");
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
  },
  snapRightAway: name => {
    cy.get(`#${listId}`).snapshot({ name });
  },
  snap: name => {
    waitForMainPageLoadingFinish();
    cy.get(`#${listId}`).snapshot({ name });
  }
});

const list = {
  all: _genList("inPostList-all-react"),
  request: _genList("inPostList-request-react"),
  approveNote: _genList("inPostList-approveNote-react"),
  borrow: _genList("inPostList-borrow-react")
};

const inPostUi = {
  list,
  waitForMainPageLoadingFinish,
  snapRightAway: name => {
    cy.get("#inPostManagement-react").snapshot({ name });
  },
  snap: name => {
    waitForMainPageLoadingFinish();
    cy.get("#inPostManagement-react").snapshot({ name });
  }
};

export { inPostUi };
