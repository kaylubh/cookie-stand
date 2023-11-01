'use strict';

const hoursOpen = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'];

// calculate random customers for each hour
function randomCustomers(min, max) {
  let customers = [];
  for (let i = 0; i < hoursOpen.length; i++) { // calculate each hour customers
    let randomCustomer = (Math.floor(Math.random() * (max - min + 1) + min));
    customers.push(randomCustomer);
  }
  return customers;
}

// calculate sales for each hour and total for day
function calculateSales(estCustomers, avgSale) {
  let sales = [];
  let totalSales = 0;
  for (let i = 0; i < hoursOpen.length; i++) { // calculate each hour sales
    sales.push(Math.floor(estCustomers[i] * avgSale));
  }
  for (let i = 0; i < sales.length; i++) { // calculate total day sales
    totalSales += sales[i];
  }
  sales.push(totalSales); // stores total day sales at end of the array
  return sales;
}

// function to create html elements easier
function addElement(elementTag, appendTo, textContent) {
  const element = document.createElement(elementTag);
  appendTo.appendChild(element);
  if (textContent !== undefined) {
    element.textContent = textContent;
  }
  return element;
}

// create sales data table header
function renderSalesDataTableHeader () {
  const container = document.getElementById('salesDataTable');
  const headerContainer = addElement('tr', container);
  addElement('th', headerContainer, 'Locations');
  for (let i = 0; i < hoursOpen.length; i++) {
    let hour = hoursOpen[i];
    addElement('th', headerContainer, hour);
  }
  addElement('th', headerContainer, 'Location Totals');
}
renderSalesDataTableHeader();

// create sales data table row
function renderSalesDataTableRow (location, sales) {
  const container = document.getElementById('salesDataTable');
  const rowContainer = addElement('tr', container);
  addElement('td', rowContainer, location);
  for (let i = 0; i < sales.length; i++) {
    addElement('td', rowContainer, sales[i]);
  }
}

/*
store object {
  location
  minimum customers per hour
  maximum customers per hour
  average cookie sales per customer
  estimated customers in array
  estimated sales in array [last value in array is total sales for day]
}
*/

// Store object shape
function Store(location, minHourlyCustomers, maxHourlyCustomers, avgSalePerCustomer) {
  this.location = location;
  this.minHourlyCustomers = minHourlyCustomers;
  this.maxHourlyCustomers = maxHourlyCustomers;
  this.avgSalePerCustomer = avgSalePerCustomer;
  this.estCustomers = this.generateEstCustomers();
  this.estSales = this.generateEstSales();
  this.render = this.renderSalesDataTableRow();
}

// Store object methods
Store.prototype.generateEstCustomers = function () {
  return randomCustomers(this.minHourlyCustomers, this.maxHourlyCustomers);
};

Store.prototype.generateEstSales = function () {
  return calculateSales(this.estCustomers, this.avgSalePerCustomer);
};

Store.prototype.renderSalesDataTableRow = function () {
  renderSalesDataTableRow(this.location, this.estSales);
};

// Create Store instances
const seattle = new Store('Seattle', 23, 65, 6.3);
const tokyo = new Store('Tokyo', 3, 24, 1.2);
const dubai = new Store('Dubai', 11, 38, 3.7);
const paris = new Store('Paris', 20, 38, 2.3);
const lima = new Store('Lima', 2, 16, 4.6);


// display store sales data on sales.html
function displaySalesData(store) {
  let containerElement = document.getElementById('salesData');

  let title = document.createElement('h2');
  containerElement.appendChild(title);
  title.textContent = store.location;

  let list = document.createElement('ul');
  containerElement.appendChild(list);

  for (let i = 0; i < hoursOpen.length; i++) {
    let hourlySalesListItem = document.createElement('li');
    list.appendChild(hourlySalesListItem);
    hourlySalesListItem.textContent = `${hoursOpen[i]}: ${store.estSales[i]} cookies`;
  }

  let salesTotalIndex = hoursOpen.length;
  let salesTotal = store.estSales[salesTotalIndex];
  let salesTotalListItem = document.createElement('li');
  list.appendChild(salesTotalListItem);
  salesTotalListItem.textContent = `Total: ${salesTotal} cookies`;
}

displaySalesData(seattle);
displaySalesData(tokyo);
displaySalesData(dubai);
displaySalesData(paris);
displaySalesData(lima);
