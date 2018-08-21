const snap = name => {
  cy.contains("Refreshing Connection ...").should("not.be.visible");
  cy.get("body").snapshot({ name });
};

const search = email => {
  cy.get("#SearchByEmail-react form input:text")
    .clear()
    .type(`${email}{enter}`);
  cy.get("#SearchByEmail-react input:submit").should("be.enabled"); //wait for search result
};

const searchAndSnap = (snapshotName, email) => {
  search(email);
  snap(snapshotName);
};

const clickAndSnap = (snapshotName, btnSelector) => {
  cy.get(btnSelector).click();
  snap(snapshotName);
};

export { snap, search, searchAndSnap, clickAndSnap };
