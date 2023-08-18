// describe('template spec', () => {
//   it('passes', () => {
//     cy.visit('https://example.cypress.io')
//   })
// })

describe("Calculator", () => {
  beforeEach(() => {
    cy.visit("https://nmwolfe.github.io/calculator/");
  });

  it("should have a heading with the correct text", () => {
    const heading = cy.get("h1");

    heading.should("contain", "Calculator");
  });

  it("should display scientific calc when button is clicked", () => {
    cy.get("#scientific-switch").click();

    cy.get(".extended").should("have.class", "show");
  });

  it("should add two numbers together", () => {
    const numArray = cy.get(".keypad__value");

    const opArray = cy.get(".keypad__operator");
  });
});
