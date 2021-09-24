// Import the data from data.js using const
const tableData = data;

//Reference the HTML table using D3. Point out our data to our HTML page.Declare a variable, tbody
//Use d3.select to tell JavaScript to look for the <tbody> tags in the HTML
var tbody = d3.select("tbody");

// Start a new function 
function buildTable(data) {
    // First, clear out any existing data. tbody.html references the table. ("") is an empty string. This line terlls Java to use an empty string when creating the table
    // It creates a blank canvas
    tbody.html("");
  
    // Next, loop through each object in the data
    // and append a row and cells for each value in the row
    data.forEach((dataRow) => {
      // Create a variable that will append a row to the table body
      let row = tbody.append("tr");
  
      // Loop through each field in the dataRow and add
      // each value as a table cell (td)
      // The val arguments represents each item in the object, such as the location, shape or duration
      Object.values(dataRow).forEach((val) => {
        let cell = row.append("td");
        cell.text(val);
        }
      );
    });
  }
// 1. Create a variable to keep track of all the filters as an object.
var filters = {}

// 3. Use this function to update the filters. 
function updateFilters() {

    // 4a. Save the element that was changed as a variable.
    let changedElement = d3.select(this);

    // 4b. Save the value that was changed as a variable.
    let elementValue = changedElement.property("value");
    console.log(elementValue);

    // 4c. Save the id of the filter that was changed as a variable.
    let filterId = changedvalue.attr("id");
    console.log(filterId);

    // 5. If a filter value was entered then add that filterId and value
    // to the filters list. Otherwise, clear that filter from the filters object.
    if (elementValue) {
        filters[filterId] = elementValue;
    }
    else {
        delete filters[filterId];
    }
  
    // 6. Call function to apply all filters and rebuild the table
    filterTable();
  
  }
  
  // 7. Use this function to filter the table when data is entered.
  function filterTable() {
  
    // 8. Set the filtered data to the tableData.
    var filteredData = tableData;
  
    // 9. Loop through all of the filters and keep any data that
    // matches the filter values
    Object.entries(filters).forEach(([key, value]) => {
        filteredData = filteredData.filter(row => row[key] === value);
      });
  
  
    // 10. Finally, rebuild the table using the filtered data
    buildTable(filteredData);
  }
  
  // 2. Attach an event to listen for changes to each filter
  d3.selectAll("input").on("change", updateFilters);
  
  // Build the table when the page loads
  buildTable(tableData);