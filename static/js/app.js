// from fifa.js
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


var fifa_search_filters = {}

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
  
  function filterTable() {
      let fifafilteredData = tableData;
      Object.entries(fifa_search_filters).forEach(([key, value]) => {
      fifafilteredData = fifafilteredData.filter(row => row[key] === value);
    });
    
    buildTable(fifafilteredData);
  }
  
  //d3.selectAll("input").on("change", updateFilters);

  buildTable(tableData);
