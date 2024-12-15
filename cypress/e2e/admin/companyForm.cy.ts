describe("Company Form Page", () => {
  const url = "/admin/company/form";

  beforeEach(() => {
    cy.visit(url);
  });

  it("renders all form fields and submit button", () => {
    cy.get("form").should("exist");
    cy.get('[name="name"]').should("exist");
    cy.get('[name="slug"]').should("exist");
    cy.get('[name="website"]').should("exist");
    cy.get('[name="yearFounded"]').should("exist");
    cy.get('[name="numberOfEmployees"]').should("exist");
    cy.get('[name="estimatedRevenue"]').should("exist");
    cy.contains("button", "Add Company").should("exist");
  });

  it("validates required fields", () => {
    cy.get('button[type="submit"]').click();
    cy.contains("Name is required").should("exist");
    cy.contains("Slug is required").should("exist");
  });

  it("validates invalid website URL", () => {
    cy.get('[name="website"]').type("invalid-url");
    cy.get('button[type="submit"]').click();
    cy.contains("Invalid url").should("exist");
  });

  it("should show error when year is less than 1900", () => {
    cy.get('[name="yearFounded"]').type("1800");
    cy.get('button[type="submit"]').click();
    cy.contains("Year must be at least 1900").should("exist");
  });

  it("should show error when year is greater than current year", () => {
    const currentYear = new Date().getFullYear();
    const futureYear = currentYear + 1;
    cy.get('[name="yearFounded"]').type(futureYear.toString());
    cy.get('button[type="submit"]').click();
    cy.contains(`Year cannot be later than ${currentYear}`).should("exist");
  });

  it("should show error when number of employees is negative", () => {
    cy.get('[name="numberOfEmployees"]').type("-500");
    cy.get('button[type="submit"]').click();
    cy.contains("Number must be positive").should("exist");
  });

  it("successfully submits form for new company", () => {
    cy.get('[name="name"]').type("Test Company");
    cy.get('[name="slug"]').should("have.value", "test-company");
    cy.get('[name="website"]').type("https://example.com");
    cy.get('[name="yearFounded"]').type("2000");
    cy.get('[name="numberOfEmployees"]').type("100");
    cy.get('[name="estimatedRevenue"]').select("$100M - $500M", {
      force: true,
    });
    cy.get('button[type="submit"]').click();

    cy.contains("Successfully created company!").should("exist");
  });

  it("renders with existing company data for editing", () => {
    cy.callFirestore("set", "companies/1", {
      id: "1",
      name: "Test Company",
      slug: "test-company",
      website: "https://example.com",
      yearFounded: "2000",
      numberOfEmployees: "100",
      estimatedRevenue: "$100M - $500M",
    });
    cy.visit(`${url}?id=1`);
    cy.get('[name="name"]').should("have.value", "Test Company");
    cy.get('[name="slug"]').should("have.value", "test-company");
    cy.get('[name="website"]').should("have.value", "https://example.com");
    cy.get('[name="yearFounded"]').should("have.value", "2000");
    cy.get('[name="numberOfEmployees"]').should("have.value", "100");
    cy.get('[name="estimatedRevenue"]').should("have.value", "$100M - $500M");
  });
});
