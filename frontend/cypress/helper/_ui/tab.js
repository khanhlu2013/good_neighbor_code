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

const InPostTab = {
  ...tab_generator("tabSelector_inPost"),
  all: { ...tab_generator("tabSelector_inPost_all") },
  waitingList: { ...tab_generator("tabSelector_inPost_waitingList") },
  approve: { ...tab_generator("tabSelector_inPost_approve") },
  borrow: { ...tab_generator("tabSelector_inPost_borrow") },
  history: { ...tab_generator("tabSelector_inPost_history") }
};

const OutPostTab = {
  ...tab_generator("tabSelector_outPost"),
  all: { ...tab_generator("tabSelector_outPost_all") },
  waitingList: { ...tab_generator("tabSelector_outPost_waitingList") },
  borrow: { ...tab_generator("tabSelector_outPost_borrow") },
  return: { ...tab_generator("tabSelector_outPost_returnNote") },
  history: { ...tab_generator("tabSelector_outPost_history") }
};

const tab = {
  inPost: InPostTab,
  outPost: OutPostTab,
  connection: { ...tab_generator("tabSelector_connection") }
};

export { tab };
