const { inPostUi } = require("./ui_inPost");
const { connectionUi } = require("./ui_connection");
const { outpostUi } = require("./ui_outPost");

const tab = {
  inPost: {
    focus: () => {
      cy.get("#TabSelector_InPost").click();
    },
    snap: name => {
      cy.get("#TabSelector_InPost #LoadingIcon-react").should("not.be.visible");
      cy.get("#TabSelector_InPost").snapshot({ name });
    },
    snapRightAway: name => {
      cy.get("#TabSelector_InPost").snapshot({ name });
    }
  },
  outPost: {
    focus: () => {
      cy.get("#TabSelector_OutPost").click();
    },
    snap: name => {
      cy.get("#TabSelector_OutPost #LoadingIcon-react").should(
        "not.be.visible"
      );
      cy.get("#TabSelector_OutPost").snapshot({ name });
    },
    snapRightAway: name => {
      cy.get("#TabSelector_OutPost").snapshot({ name });
    }
  },
  connection: {
    focus: () => {
      cy.get("#TabSelector_Connection").click();
    },
    snap: name => {
      cy.get("#TabSelector_Connection #LoadingIcon-react").should(
        "not.be.visible"
      );
      cy.get("#TabSelector_Connection").snapshot({ name });
    },
    snapRightAway: name => {
      cy.get("#TabSelector_Connection").snapshot({ name });
    }
  }
};

const ui = {
  tab,
  inPostUi,
  connectionUi,
  outpostUi
};

export { ui };
