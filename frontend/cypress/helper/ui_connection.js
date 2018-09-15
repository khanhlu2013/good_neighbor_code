// const getSearchLoadingIcon = () =>
//   cy.get("#SearchByEmail-react #LoadingIcon-react");

const connectionTree = {
  tab: {
    focus: () => {
      cy.get("#TabSelector_Connection").click();
    }
  },
  snap: name => {
    cy.get("#ConnectionManagement-react #LoadingIcon-react").should(
      "not.be.visible"
    );
    cy.get("#ConnectionManagement-react").snapshot({ name });
  },
  snapRightAway: name => {
    cy.get("#ConnectionManagement-react").snapshot({ name });
  },
  search: {
    exe: email => {
      cy.get("#SearchByEmail-react>form>input:text")
        .clear()
        .type(`${email}{enter}`);
    },
    snap: name => {
      cy.get("#SearchByEmail-react #LoadingIcon-react").should(
        "not.be.visible"
      );
      cy.get("#SearchByEmail-react").snapshot({ name });
    },
    snapRightAway: name => {
      cy.get("#SearchByEmail-react").snapshot({ name });
    },
    getSearchBtnLoadingIcon: () =>
      cy.get("#SearchByEmail-react form #LoadingIcon-react"),
    getInviteBtnLoadingIcon: () =>
      cy.get("#CrudConnectionControlPanel-react #LoadingIcon-react"),
    getCreateConnectionBtn: () => cy.get("#createConnectionBtn")
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
