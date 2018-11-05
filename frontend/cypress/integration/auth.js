import { createUser } from "../helper/model";
import { ui } from "../helper/ui";

describe("auth", () => {
  const lu = createUser("Lu Tran", "lu@us.com");

  it("can log user in and stay login after refresh to make sure user is login on the backend", () => {
    //login
    cy.setupDb([lu]);
    cy.loadApp();
    cy.login(lu.email);

    ui.app.snap("user logged in; before refresh");
    cy.reload(); //make sure user still login
    ui.app.snap("after refresh, user still logged in");
  });

  it("can log user out and stay logout after refresh to make sure user is logout on the backend", () => {
    //login
    cy.setupDb([lu]);
    cy.loadApp();
    cy.login(lu.email);

    ui.app.snap("user logged in");
    ui.app.logout();
    ui.app.snap("user logged out; before refresh");
    cy.reload(); //make sure user still logout
    ui.app.snap("after refresh, user still logged out");
  });
});
