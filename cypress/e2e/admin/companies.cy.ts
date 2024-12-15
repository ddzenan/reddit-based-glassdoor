describe("AdminCompaniesPage - Search functionality", () => {
  beforeEach(() => {
    cy.callFirestore("set", "companies/1", {
      id: "1",
      name: "Some Company",
      slug: "some-company",
    });
    cy.visit("/admin/companies");
  });

  it("should display loading state when searching", () => {
    cy.get('[data-cy="search-bar-by-name"]').type("Some Company");
    cy.get('[data-cy="search-by-name-button"]').click();
    cy.get('[data-cy="loading-companies"]').should("be.visible");
  });

  it("should show search results when there are matches", () => {
    cy.get('[data-cy="search-bar-by-name"]').type("Some Company");
    cy.get('[data-cy="search-by-name-button"]').click();

    cy.get('[data-cy="company-card-1"]').should("have.length", 1);
    cy.get('[data-cy="company-card-1"]').contains("Some Company");
  });

  it("should show no results when no company matches", () => {
    cy.get('[data-cy="search-bar-by-name"]').type("Nonexistent Company");
    cy.get('[data-cy="search-by-name-button"]').click();

    cy.get('[data-cy="company-card-1"]').should("not.exist");
    cy.get('[data-cy="no-companies"]').should("be.visible");
  });
});

describe("AdminCompaniesPage - Delete functionality", () => {
  beforeEach(() => {
    cy.callFirestore("set", "companies/1", {
      id: "1",
      name: "Delete Company",
      slug: "delete-company",
    });

    cy.visit("/admin/companies");

    cy.get('[data-cy="search-bar-by-name"]').type("Delete Company");
    cy.get('[data-cy="search-by-name-button"]').click();
    cy.get('[data-cy="company-card-1"]')
      .contains("Delete Company")
      .get("button")
      .contains("Delete")
      .click();
  });

  it("should show confirmation dialog when delete button is clicked", () => {
    cy.get('[data-cy="alert-dialog-content"]').should("be.visible");
    cy.get('[data-cy="alert-dialog-content"]').contains("Are you sure?");
    cy.get('[data-cy="alert-dialog-action-button"]').should("be.visible");
    cy.get('[data-cy="alert-dialog-cancel-button"]').should("be.visible");
  });

  it('should delete company when "Yes" is clicked in the confirmation dialog', () => {
    cy.get('[data-cy="alert-dialog-action-button"]').click();

    cy.get('[data-cy="company-card-1"]').should("not.exist");
    cy.contains("Company deleted successfully!").should("exist");
  });

  it('should not delete company when "Cancel" is clicked in the confirmation dialog', () => {
    cy.get('[data-cy="alert-dialog-content"]').contains("Cancel").click();

    cy.callFirestore("get", "companies/1").then((doc) => {
      cy.wrap(doc).its("name").should("eq", "Delete Company");
    });

    cy.get('[data-cy="company-card-1"]').should("exist");
  });
});
