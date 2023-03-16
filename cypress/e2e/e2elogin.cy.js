const credentials = {
  userCorrect: {
    login: "user1",
    password: "pass1",
  },
  userWithoutPass: {
    login: "user2",
    password: "wrongpassword",
  },
  userWithoutUser: {
    login: "wrongUser",
    password: "pass2",
  },
};

const logInUser = (credential) => {
  cy.get("[data-cy=inputTextName]").type(credential.login);
  cy.get("[data-cy=inputTextPassword]").type(credential.password);
  cy.get("[data-cy=inputSubmit]").click();
};

describe("Checks login", () => {
  beforeEach("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.visit('http://localhost:3000/')
  });

  it("log in correctly without errors", () => {
      logInUser(credentials.userCorrect);
      cy.get('[data-cy=loggedUser]').should('have.text', 'User is successfully logged in')
  });

  it("log in using wrong password", () => {
    logInUser(credentials.userWithoutPass);
    cy.get('[data-cy=errorMsg]').should('have.text', 'invalid password')
  });

  it("log in using wrong password", () => {
    logInUser(credentials.userWithoutUser);
    cy.get('[data-cy=errorMsg]').should('have.text', 'invalid username')
  });

});
