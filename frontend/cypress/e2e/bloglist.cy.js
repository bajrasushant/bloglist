describe("Blog app", function() {
  beforeEach(function() {
    cy.request("POST", "http://localhost:3001/api/testing/reset");
    // const user = {
    //   name: "Sushant test",
    //   username: "test",
    //   password: "test@123",
    // };
    // cy.request("POST", "http://localhost:3001/api/users", user);
    cy.visit("http://localhost:5173/");
  });

  it("Login form is shown", function() {
    cy.contains("login to the application");
    cy.contains("username");
    cy.contains("password");
    cy.contains("login");
  });
});
