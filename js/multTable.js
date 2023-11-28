/*
File: multTable.js
GUI Assignment: Creating an Interactive Dynamic Table
Aaron Pratt, Created on October 25, 2023
Email: aaron_pratt@student.uml.edu
Description: Contains all java script code for recieving user input and generating multiplication table
*/

// wait for the DOM to be ready before accessing elements
$(document).ready(function () {
  // get references to the HTML elements
  const minColumnInput = $('#min-column');
  const maxColumnInput = $('#max-column');
  const minRowInput = $('#min-row');
  const maxRowInput = $('#max-row');
  const table = $('#multiplication-table');
  const submitButton = $('#submit-button');

  // add validation method for columns
  $.validator.addMethod('minMaxColumns', function () {
    const minColumn = parseInt(minColumnInput.val());
    const maxColumn = parseInt(maxColumnInput.val());
    return minColumn <= maxColumn;
  }, 'Minimum column value must be less than or equal to maximum column value');

  // add validation method for rows
  $.validator.addMethod('minMaxRows', function () {
    const minRow = parseInt(minRowInput.val());
    const maxRow = parseInt(maxRowInput.val());
    return minRow <= maxRow;
  }, 'Minimum row value must be less than or equal to maximum row value');

  // validation rules
  $("#table-form").validate({
    rules: {
      'min-column': {
        required: true,
        range: [-50, 50]
      },
      'max-column': {
        required: true,
        range: [-50, 50],
        minMaxColumns: true
      },
      'min-row': {
        required: true,
        range: [-50, 50]
      },
      'max-row': {
        required: true,
        range: [-50, 50],
        minMaxRows: true
      }
    },
    messages: {
      'min-column': {
        required: "Please enter a value",
        range: "Value must be between -50 and 50"
      },
      'max-column': {
        required: "Please enter a value",
        range: "Value must be between -50 and 50",
        minMaxColumns: "Minimum column value must be less than or equal to maximum column value"
      },
      'min-row': {
        required: "Please enter a value",
        range: "Value must be between -50 and 50"
      },
      'max-row': {
        required: "Please enter a value",
        range: "Value must be between -50 and 50",
        minMaxRows: "Minimum row value must be less than or equal to maximum row value"
      }
    },
    submitHandler: function (form) {
      generateTable();
    }
  });

  // event listener for the button to generate the table
  submitButton.on('click', function () {
    // manually trigger validation
    $("#table-form").valid();
  });

  function generateTable() {
    // retrieve input values
    const minColumn = parseInt(minColumnInput.val());
    const maxColumn = parseInt(maxColumnInput.val());
    const minRow = parseInt(minRowInput.val());
    const maxRow = parseInt(maxRowInput.val());

    table.html('');

    // generate table only if the form is valid
    if ($("#table-form").valid()) {
      for (let i = minRow - 1; i <= maxRow; i++) {
        // creates a new row
        const row = $('<tr>');
  
        for (let j = minColumn - 1; j <= maxColumn; j++) {
          // creates a new element in the table
          const element = $('<td>');
  
          if (i === minRow - 1 && j === minColumn - 1) {
            // set the top-left cell to empty
            element.text('');
          } else if (i === minRow - 1) {
            // if in the first row (except the top-left cell), set to j
            element.text(j);
          } else if (j === minColumn - 1) {
            // if in the first column (except the top-left cell), set to i
            element.text(i);
          } else {
            // set other cells to i * j
            element.text(i * j);
          }
  
          // add element to row
          row.append(element);
        }
  
        // add row to table
        table.append(row);
      }
    }
  }
});
