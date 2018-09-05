const tree = {
  outPost: {
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
      snap: name => {
        cy.contains("refreshing out posts ...").should("not.be.visible");
        cy.get("#OutPostManagement-react").snapshot({ name });
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
        cy.contains("refreshing out posts ...").should("not.be.visible");
        cy.get("#OutPostDecisionDialog-react").snapshot({ name });
      },
      exit: () => {
        cy.get("#OutPostDecisionDialogExitBtn").click();
      }
    }
  },
  inPost: {
    requestingTable_undo: post => {
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
    }
  }
};

export { tree };
