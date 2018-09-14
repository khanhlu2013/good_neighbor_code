const connectionTree = {
  tab: {
    focus: () => {
      cy.get("#react-tabs-4").click();
    }
  },
  snap: name => {
    cy.get("#ConnectionManagement-react .LoadingIcon-react").should(
      "not.be.visible"
    );
    cy.get("#ConnectionManagement-react").snapshot({ name });
  },
  search: email => {
    cy.get("#SearchByEmail-react>form>input:text")
      .clear()
      .type(`${email}{enter}`);

    cy.get("#SearchByEmail-react>form>input:submit").should("be.enabled"); //wait for search result
  },

  outRequests_deny: rowIndex => {
    cy.get("#OutFriendTable .ConnectionTableRow")
      .eq(rowIndex)
      .find(".ConnectionTableRowDenyBtn")
      .click();
  },

  inRequests_approve: rowIndex => {
    cy.get("#InFriendTable .ConnectionTableRow")
      .eq(rowIndex)
      .find(".ConnectionTableRowApproveBtn")
      .click();
  },

  inRequests_deny: rowIndex => {
    cy.get("#InFriendTable .ConnectionTableRow")
      .eq(rowIndex)
      .find(".ConnectionTableRowDenyBtn")
      .click();
  },

  denyRequests_approve: rowIndex => {
    cy.get("#DenyFriendTable .ConnectionTableRow")
      .eq(rowIndex)
      .find(".ConnectionTableRowApproveBtn")
      .click();
  },

  friends_deny: rowIndex => {
    cy.get("#FriendTable .ConnectionTableRow")
      .eq(rowIndex)
      .find(".ConnectionTableRowDenyBtn")
      .click();
  }
};

export { connectionTree };
