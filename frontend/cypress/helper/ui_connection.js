// const getSearchLoadingIcon = () =>
//   cy.get("#SearchByEmail-react #LoadingIcon-react");

const waitForLoading = () => {
  cy.get("#SearchByEmail-react #LoadingIcon-react").should("not.be.visible");
};

const connectionUi = {
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
  outConnectionTable: {
    deny: rowIndex => {
      cy.get("#OutFriendTable .ConnectionTableRow")
        .eq(rowIndex)
        .find(".ConnectionTableRowDenyBtn")
        .click();
    },
    snap: name => {
      waitForLoading();
      cy.get("#OutFriendTable").snapshot({ name });
    }
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

export { connectionUi };
