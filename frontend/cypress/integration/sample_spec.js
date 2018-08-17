describe("My first test", () => {
  const lu = {
    email: "lu@us.com",
    name: "Lu Tran"
  };
  const tu = {
    email: "tu@pr.com",
    name: "Tu Nguyen"
  };

  const snap = name => {
    cy.contains("Refreshing Connection ...").should("not.be.visible");
    cy.get("body").snapshot({ name });
  };

  const click = btnSelector => {
    cy.get(btnSelector).click();
  };

  const search = email => {
    cy.get("#FindByEmail-react form input:text")
      .clear()
      .type(`${email}{enter}`);
    cy.get("#FindByEmail-react input:submit").should("be.enabled"); //wait for search result
  };

  const searchAndSnap = (snapshotName, email) => {
    search(email);
    snap(snapshotName);
  };

  const clickAndSnap = (snapshotName, btnSelector) => {
    cy.get(btnSelector).click();
    snap(snapshotName);
  };

  const logout = () => {
    cy.contains("logout").click();
  };

  const login = email => {
    cy.get("#dummy_login_email").type(`${email}{enter}`);
    cy.get("#Profile-react").should("be.visible"); //wait for login
  };

  const switchAccount = email => {
    logout();
    login(email);
  };

  describe("Profile component", () => {
    beforeEach(() => {
      cy.exec(
        '~/mongo/bin/mongo good-neighboors-test --eval "db.users.deleteMany({})"'
      );
      cy.exec(
        `~/mongo/bin/mongo good-neighboors-test --eval 'db.connections.deleteMany({})'`
      );
      cy.exec(
        `~/mongo/bin/mongo good-neighboors-test --eval 'db.users.insertMany([{"email":"${
          lu.email
        }","name":"${lu.name}"},{"email":"${tu.email}","name":"${tu.name}"}])'`
      );
    });
    afterEach(() => {
      logout();
    });

    // it("-> FindByEmail: can do simple search - without modify connections", () => {
    //   cy.visit("http://localhost:3002");

    //   //test the login page view
    //   snap("Login page");

    //   //login
    //   login(lu.email);

    //   //test the profile page
    //   snap("Profile page");

    //   //SEARCH BY EMAIL - INVALID SEARCH
    //   searchAndSnap("Invalid search: empty email", "");
    //   searchAndSnap("Invalid search: invalid email", "xyz");
    //   searchAndSnap("Invalid search: self search email", lu.email);

    //   //SEARCH BY EMAIL - VALID SEARCH
    //   searchAndSnap("Valid search: email not found", "abc@efg.com");
    //   searchAndSnap("Valid search: email found", tu.email);
    // });

    it("-> FindByEmail: can modify connection", () => {
      cy.visit("http://localhost:3002");

      //login as lu
      login(lu.email);

      //create connection
      search(tu.email);
      clickAndSnap("Created connection", "#createConnectionBtn");
      clickAndSnap("DenyConnectionByFrom", "#denyConnectionByFromBtn");
      clickAndSnap("ApproveConnectionByFrom", "#approveConnectionByFromBtn");

      switchAccount(tu.email);

      searchAndSnap("Searched incomming connection", lu.email);

      clickAndSnap(
        "ApproveConnectionByToFirstTime",
        "#approveConnectionByToFirstTimeBtn"
      );
      clickAndSnap(
        "DenyConnectionByToSecondTime",
        "#denyConnectionByToSecondTimeBtn"
      );
      clickAndSnap(
        "ApproveConnectionByToSecondTime",
        "#approveConnectionByToSecondTimeBtn"
      );

      //search deny by to
      click("#denyConnectionByToSecondTimeBtn");
      switchAccount(lu.email);
      searchAndSnap("SeachDenyByTo", tu.email);
    });
  });
});
