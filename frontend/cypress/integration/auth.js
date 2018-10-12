import { createUser } from "../helper/model";
import { ui } from "../helper/ui";

describe("auth", () => {
  const lu = createUser("Lu Tran", "lu@us.com");

  it("allow user to login", () => {
    //login
    cy.setupDb([lu]);
    cy.loadApp();
    cy.login(lu.email);

    ui.app.snap("before refresh");
    cy.reload(); //make sure user still login
    ui.app.snap("after refresh");
  });

  it("allow user to logout", () => {
    //login
    cy.setupDb([lu]);
    cy.loadApp();
    cy.login(lu.email);

    ui.app.snap("login");
    ui.app.logout();
    ui.app.snap("logout - before refresh");
    cy.reload(); //make sure user still logout
    ui.app.snap("logout- after refresh");
  });
});
