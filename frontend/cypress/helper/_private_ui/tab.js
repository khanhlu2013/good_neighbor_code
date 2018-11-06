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
  ...tab_generator("tabSelector-inPost-react"),
  all: { ...tab_generator("tabSelector-inPost-all-react") },
  waitingList: { ...tab_generator("tabSelector-inPost-request-react") },
  approve: { ...tab_generator("tabSelector-inPost-approve-react") },
  borrow: { ...tab_generator("tabSelector-inPost-borrow-react") },
  history: { ...tab_generator("tabSelector-inPost-history-react") }
};

const OutPostTab = {
  ...tab_generator("tabSelector-outPost-react"),
  all: { ...tab_generator("tabSelector-outPost-all-react") },
  waitingList: { ...tab_generator("tabSelector-outPost-request-react") },
  borrow: { ...tab_generator("tabSelector-outPost-borrow-react") },
  return: { ...tab_generator("tabSelector-outPost-return-react") },
  history: { ...tab_generator("tabSelector-outPost-history-react") }
};

const ConnectionTab = {
  ...tab_generator("tabSelector-connection-react"),
  friend: { ...tab_generator("tabSelector-connection-friend-react") },
  outConnection: { ...tab_generator("tabSelector-connection-myRequest-react") },
  inConnection: {
    ...tab_generator("tabSelector-connection-friendRequest-react")
  },
  search: { ...tab_generator("tabSelector-connection-search-react") },
  deny: { ...tab_generator("tabSelector-connection-deny-react") }
};

const tab = {
  inPost: InPostTab,
  outPost: OutPostTab,
  connection: ConnectionTab
};

export { tab };
