describe("Company Page", () => {
  const slug = "microsoft";

  beforeEach(() => {
    cy.visit(`/company/${slug}`);
  });

  it("should display company details", () => {
    cy.get('[data-cy="company-name"]').should("exist");
  });

  it("should display clickable Reddit posts", () => {
    cy.get('[data-cy="reddit-post"]').should("have.length.greaterThan", 0);
    cy.get('[data-cy="reddit-post"]')
      .first()
      .should("have.attr", "href")
      .and("include", "reddit.com");
  });
});
