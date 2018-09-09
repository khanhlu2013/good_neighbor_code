const tree = {
  // ----------------------------------------------
  connection: {
    focusTab: () => {
      cy.get("#react-tabs-4").click();
    }
  },
  // ----------------------------------------------
  outPost: {
    focusTab: () => {
      cy.get("#react-tabs-2").click();
    },
    table: {
      decide: post => {
        cy.get("#OutPostTable-react .OutPostTableRow")
          .then(rows => {
            const row = Array.from(rows).find(row => {
              const text = row.textContent;
              return (
                text.includes(post.title) && text.includes(post.description)
              );
            });
            return cy.wrap(row);
          })
          .find(".OutPostTableRowDecideBtn")
          .click();
      },
      edit: rowIndex => {
        cy.get("#OutPostTable-react .OutPostTableRow")
          .eq(rowIndex)
          .find(".OutPostTableRowEditBtn")
          .click();
      }
    },
    snap: name => {
      cy.get(".isRefreshingOutPost").should("not.be.visible");
      cy.get("#OutPostManagement-react").snapshot({ name });
    },
    crudDialog: {
      open: () => {
        cy.get("#createPostBtn").click();
      },
      snap: name => {
        cy.get("#OutPostCrudDialogForm-react").snapshot({ name });
      },
      fillOut: (title, description, isActive) => {
        cy.get("#OutPostCrudDialogForm-react :text")
          .clear()
          .type(`${title}`);
        cy.get("#OutPostCrudDialogForm-react textarea")
          .clear()
          .type(`${description}`);
        const isActiveCheckBox = cy.get(
          "#OutPostCrudDialogForm-react :checkbox"
        );
        if (isActive) {
          isActiveCheckBox.check();
        } else {
          isActiveCheckBox.uncheck();
        }
      },
      submit: () => {
        cy.get("#OutPostCrudDialogForm-react :submit").click();
      }
    },
    decisionDialog: {
      undoApprove: () => {
        cy.get("#OutPostDecisionDialogUndoApproveBtn").click();
      },
      decide: (user, isApprove) => {
        const btnClassName = isApprove
          ? "OutShareRequestingTableRowApproveBtn"
          : "OutShareRequestingTableRowDenyBtn";
        cy.get("#OutShareRequestingTable .OutShareRequestingTableRow")
          .then(rows => {
            const row = Array.from(rows).find(row =>
              row.textContent.includes(user.email)
            );
            return cy.wrap(row);
          })
          .find(`.${btnClassName}`)
          .click();
      },
      snap: name => {
        cy.get(".isRefreshingOutPost").should("not.be.visible");
        cy.get("#OutPostDecisionDialog-react").snapshot({ name });
      },
      exit: () => {
        cy.get("#OutPostDecisionDialogExitBtn").click();
      }
    }
  },
  // ----------------------------------------------
  inPost: {
    focusTab: () => {
      cy.get("##react-tabs-0").click();
    },
    undoRequesting: post => {
      cy.get("#InShareRequestingTable-react .InShareRequestingTableRow")
        .then(rows => {
          const row = Array.from(rows).find(row => {
            const text = row.textContent;
            return text.includes(post.title) && text.includes(post.description);
          });
          return cy.wrap(row);
        })
        .find(".InShareRequestingTableRowUndoBtn")
        .click();
    },
    request: post => {
      cy.get("#InPostTable-react .InPostTableRow")
        .then(rows => {
          const row = Array.from(rows).find(row => {
            const text = row.textContent;
            return text.includes(post.title) && text.includes(post.description);
          });
          return cy.wrap(row);
        })
        .find(".InPostTableRowBorrowBtn")
        .click();
    },
    snap: name => {
      cy.contains("Refreshing in posts ...").should("not.be.visible");
      cy.get("#InPostManagement-react").snapshot({ name });
    },
    returnBorrowing: post => {
      cy.get("#InShareBorrowingTable-react .InShareBorrowingTableRow")
        .then(rows => {
          const row = Array.from(rows).find(row => {
            const text = row.textContent;
            return text.includes(post.title) && text.includes(post.description);
          });
          return cy.wrap(row);
        })
        .find(".InShareBorrowingTableRowReturnBtn")
        .click();
    }
  }
};

export { tree };
