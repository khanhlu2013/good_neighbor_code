describe("My first test", () => {
  const lu = {
    email: "lu@us.com",
    name: "Lu Tran"
  };
  const tu = {
    email: "tu@pr.com",
    name: "Tu Nguyen"
  };

  const snapBody = name => {
    cy.get("body").snapshot({ name });
  };

  const searchEmail = (snapshotName, email) => {
    cy.get("#FindByEmail-react form input:text")
      .clear()
      .type(`${email}{enter}`);
    cy.get("#FindByEmail-react input:submit").should("be.enabled"); //wait for search result
    snapBody(snapshotName);
  };

  beforeEach(() => {
    cy.exec(
      '~/mongo/bin/mongo good-neighboors-test --eval "db.dropDatabase()"'
    );
    cy.visit("http://localhost:3002");

    cy.get("#dummy_login_email").type(tu.email);
    cy.get("#dummy_login_name").type(`${tu.name}{enter}`);
    cy.contains("logout").click();

    cy.get("#dummy_login_email").type(lu.email);
    cy.get("#dummy_login_name").type(`${lu.name}{enter}`);
    cy.contains("logout").click();
  });

  it("visit good neighboors", () => {
    cy.visit("http://localhost:3002");

    //test the login page view
    snapBody("Login page");

    //login
    cy.get("#dummy_login_email").type(`${lu.email}{enter}`);
    cy.get("#Profile-react").should("be.visible"); //wait for login

    //test the profile page
    snapBody("Profile page");

    //SEARCH BY EMAIL - INVALID SEARCH
    searchEmail("Invalid search: empty email", "");
    searchEmail("Invalid search: invalid email", "xyz");
    searchEmail("Invalid search: self search email", lu.email);

    //SEARCH BY EMAIL - VALID SEARCH
    searchEmail("Valid search: email not found", "abc@efg.com");
    searchEmail("Valid search: email found", tu.email);
  });
});
