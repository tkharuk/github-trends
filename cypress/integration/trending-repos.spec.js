import mock from "../fixtures/2022-03-18.json";

describe("Trending github repos", () => {
  it("should show recent trending repos, favorite and unfavorite some, filter table by favorites", () => {
    cy.intercept(/api.github.com\/search*/, { body: mock }).as("getRepos");

    cy.visit("/");

    cy.get("table").should("be.visible");

    cy.get("tbody tr").should("have.length", 30);

    cy.get("label").contains("Only favorites").click();

    cy.get("tbody tr").should("have.length", 0);

    cy.get("label").contains("Only favorites").click();

    cy.get("tbody tr").should("have.length", 30);

    cy.get("tbody tr")
      .first()
      .within(() => {
        cy.get("button").contains("♡").click();
        cy.get("button").contains("♥");
      });

    cy.get("tbody tr")
      .last()
      .within(() => {
        cy.get("button").contains("♡").click();
        cy.get("button").contains("♥");
      });

    cy.get("label").contains("Only favorites").click();

    cy.get("tbody tr").should("have.length", 2);
  });
});
