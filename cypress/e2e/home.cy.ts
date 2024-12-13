describe("Home Page", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should render the navigation with Home and Companies links", () => {
    cy.get("nav").should("exist");
    cy.get("nav").contains("Home").should("have.attr", "href", "/");
    cy.get("nav")
      .contains("Companies")
      .should("have.attr", "href", "/companies");
  });

  it("should navigate to Companies page when clicking the link", () => {
    cy.get("nav").contains("Companies").click();
    cy.url().should("include", "/companies");
  });
});
