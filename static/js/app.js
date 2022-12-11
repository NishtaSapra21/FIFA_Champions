// from data.js
const tableData = data;

// get table references
var tbody = d3.select("tbody");

function buildTable(data) {
  // First, clear out any existing data
  tbody.html("");

  // Next, loop through each object in the data
  // and append a row and cells for each value in the row
  data.forEach((dataRow) => {
    // Append a row to the table body
    let row = tbody.append("tr");

    // Loop through each field in the dataRow and add
    // each value as a table cell (td)
    Object.values(dataRow).forEach((val) => {
      let cell = row.append("td");
      cell.text(val);
    });
  });
}

// 1. Create a variable to keep track of all the filters as an object.
var fifa_search_filters = {}

// 3. Use this function to update the filters. 
function updateFilters() {
  
    // 4a. Save the element that was changed as a variable.
    let changedfilterElement = d3.select("this");

    // 4b. Save the value that was changed as a variable.
    let changedelementValue = changedfilterElement.property("value");
    console.log(changedelementValue);

    // 4c. Save the id of the filter that was changed as a variable.
    let changedfilterID = changedfilterElement.attr("id");
    console.log(changedfilterID);

    // 5. If a filter value was entered then add that filterId and value
    // to the filters list. Otherwise, clear that filter from the filters object.
    if (changedelementValue) {
      fifa_search_filters[changedfilterID] = changedelementValue;
    } else {
      delete fifa_search_filters[changedfilterID];
    }

    // 6. Call function to apply all filters and rebuild the table
    filterTable();
  
  }
  function EnterYear(e) {
    var UserOptionId = e.options[e.selectedIndex]
    console.log(UserOptionId)
    var UserOption = e.options[e.selectedIndex].textContent;
    console.log(UserOption);
    if (UserOption) {
      fifa_search_filters['Year'] = UserOption;
    } else {
      delete fifa_search_filters['Year'];
    }
    filterTable();
  }
  // 7. Use this function to filter the table when data is entered.
  function filterTable() {
  
    // 8. Set the filtered data to the tableData.
    let fifafilteredData = tableData;
  
    // 9. Loop through all of the filters and keep any data that
    // matches the filter values
    Object.entries(fifa_search_filters).forEach(([key, value]) => {
      fifafilteredData = fifafilteredData.filter(row => row[key] === value);
    });

    // 10. Finally, rebuild the table using the filtered data
    buildTable(fifafilteredData);
  }
  
  // 2. Attach an event to listen for changes to each filter
  d3.selectAll("input").on("change", updateFilters);

  // Build the table when the page loads
  buildTable(tableData);
