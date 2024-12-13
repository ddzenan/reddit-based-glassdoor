describe("Companies Page", () => {
  beforeEach(() => {
    cy.visit("/companies");
  });

  it("should display a list of company cards", () => {
    cy.get('[data-cy="company-card"]').should("have.length.greaterThan", 0);
  });

  it("should navigate to the correct company page when a card is clicked", () => {
    cy.get('[data-cy="company-card"]').first().click();
    cy.url().should("include", "/company/");
  });

  it("should have working navigation links", () => {
    cy.get("nav").contains("Home").click();
    cy.url().should("eq", `${Cypress.config("baseUrl")}/`);
  });
});
