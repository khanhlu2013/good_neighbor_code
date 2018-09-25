const tab_generator = id => ({
  focus: () => {
    cy.get(`#${id}`).click();
  },
  snap: name => {
    cy.get(`#${id}`)
      .find("#LoadingIcon-react")
      .should("not.be.visible");
    cy.get(`#${id}`).snapshot({ name });
  },
  snapRightAway: name => {
    cy.get(`#${id}`).snapshot({ name });
  }
});

export { tab_generator };
