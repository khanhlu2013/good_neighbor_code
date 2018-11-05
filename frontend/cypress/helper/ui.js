import { tab } from "./_private_ui/tab";
import { connectionUi } from "./_private_ui/ui_connection";
import { inPostUi } from "./_private_ui/ui_inPost";
import { outPostUi } from "./_private_ui/ui_outPost";

const ui = {
  connection: connectionUi,
  inPost: inPostUi,
  outPost: outPostUi,
  app: {
    snap: snapName => {
      cy.get("#app-react #LoadingIcon-react").should("not.be.visible");
      cy.get("#app-react").snapshot({ name: snapName });
    },
    logout: () => {
      cy.get("#tabSelector-profile-react").click();
      cy.get("#appLogOutBtn-react").click();
      cy.get("#appPublic-react").should("be.visible");
    }
  }
};

export { tab, ui };
