'use strict';

const hoursOpen = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'];
const salesForm = document.getElementById('addStoreForm');
const updateSalesForm = document.getElementById('updateStoreForm');
const updateFormDropdownList = document.getElementById('updateLocationNameList');
const salesTable = document.getElementById('salesDataTable');
const initialStores = [['Seattle', 23, 65, 6.3], ['Tokyo', 3, 24, 1.2], ['Dubai', 11, 38, 3.7], ['Paris', 20, 38, 2.3], ['Lima', 2, 16, 4.6]];
let storeObjects = [];

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
function renderSalesDataTableHeader() {
  const header = addElement('thead', salesTable);
  const headerRow = addElement('tr', header);
  addElement('th', headerRow, 'Locations');
  for (let i = 0; i < hoursOpen.length; i++) {
    let hour = hoursOpen[i];
    addElement('th', headerRow, hour);
  }
  addElement('th', headerRow, 'Location Totals');
}

// create sales data table rows
function renderSalesDataTableRows() {
  let body = document.querySelector('tbody');

  if (body) {
    body.innerHTML = '';
  } else {
    body = addElement('tbody', salesTable);
  }

  for (let i = 0; i < storeObjects.length; i++) {
    let currentStore = storeObjects[i];
    let locationName = currentStore.location;
    let sales = currentStore.estSales;
    const dataRow = addElement('tr', body);
    addElement('td', dataRow, locationName);
    for (let j = 0; j < sales.length - 1; j++) {
      addElement('td', dataRow, sales[j]);
    }
    addElement('th', dataRow, sales[sales.length - 1]);
  }
}

function renderSalesDataTableFooter() {
  let footer = document.querySelector('tfoot');

  if (footer) {
    footer.innerHTML = '';
  } else {
    footer = addElement('tfoot', salesTable);
  }

  const footerRow = addElement('tr', footer);
  addElement('th', footerRow, 'Hourly Totals for All Locations');
  for (let i = 0; i <= hoursOpen.length; i++) {
    let totalHourSales = 0;
    for (let j = 0; j < storeObjects.length; j++) {
      let currentStore = storeObjects[j];
      let storeSales = currentStore.estSales;
      totalHourSales += storeSales[i];
    }
    addElement('th', footerRow, totalHourSales);
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

// Store object constructor function
function Store(location, minHourlyCustomers, maxHourlyCustomers, avgSalePerCustomer) {
  this.location = location;
  this.minHourlyCustomers = minHourlyCustomers;
  this.maxHourlyCustomers = maxHourlyCustomers;
  this.avgSalePerCustomer = avgSalePerCustomer;
  this.estCustomers = this.generateEstCustomers();
  this.estSales = this.generateEstSales();
}

// Store object methods
Store.prototype.generateEstCustomers = function () {
  return randomCustomers(this.minHourlyCustomers, this.maxHourlyCustomers);
};
Store.prototype.generateEstSales = function () {
  return calculateSales(this.estCustomers, this.avgSalePerCustomer);
};

// Create initial Store instances
function createInitialStores() {
  for (let i = 0; i < initialStores.length; i++) {
    const currentStore = initialStores[i];
    const newStore = new Store(currentStore[0], currentStore[1], currentStore[2], currentStore[3]);
    storeObjects.push(newStore);
  }
  renderSalesDataTableRows();
  renderSalesDataTableFooter();
  createUpdateFormDropdownList();
}

// add new Stores
function createAdditionalStore(event) {
  event.preventDefault();
  const location = event.target.locationNameInput.value;
  let minHourlyCustomers = event.target.minCustomerInput.value;
  minHourlyCustomers = parseInt(minHourlyCustomers);
  let maxHourlyCustomers = event.target.maxCustomerInput.value;
  maxHourlyCustomers = parseInt(maxHourlyCustomers);
  let avgSalePerCustomer = event.target.avgCookieInput.value;
  avgSalePerCustomer = parseFloat(avgSalePerCustomer);
  const newStore = new Store(location, minHourlyCustomers, maxHourlyCustomers, avgSalePerCustomer);
  storeObjects.push(newStore);
  salesForm.reset();
  renderSalesDataTableRows();
  renderSalesDataTableFooter();
  createUpdateFormDropdownList();
}

// update existing Store
function updateExistingStore(event) {
  event.preventDefault();
  const location = event.target.updateLocationNameList.value;
  let minHourlyCustomers = event.target.minCustomerUpdate.value;
  minHourlyCustomers = parseInt(minHourlyCustomers);
  let maxHourlyCustomers = event.target.maxCustomerUpdate.value;
  maxHourlyCustomers = parseInt(maxHourlyCustomers);
  let avgSalePerCustomer = event.target.avgCookieUpdate.value;
  avgSalePerCustomer = parseFloat(avgSalePerCustomer);
  for (let i = 0; i < storeObjects.length; i++) {
    let currentStore = storeObjects[i];
    let currentStoreLocation = currentStore.location;
    if (currentStoreLocation === location) {
      currentStore.minHourlyCustomers = minHourlyCustomers;
      currentStore.maxHourlyCustomers = maxHourlyCustomers;
      currentStore.avgSalePerCustomer = avgSalePerCustomer;
      currentStore.estCustomers = currentStore.generateEstCustomers();
      currentStore.estSales = currentStore.generateEstSales();
    }
  }
  updateSalesForm.reset();
  renderSalesDataTableRows();
  renderSalesDataTableFooter();
}

// generate list of existing Stores for update form
function createUpdateFormDropdownList() {
  updateFormDropdownList.innerHTML = '';
  const initialOption = addElement('option', updateFormDropdownList, '---Select a Store---');
  initialOption.setAttribute('selected', true);

  for (let i = 0; i < storeObjects.length; i++) {
    let currentStore = storeObjects[i];
    let locationName = currentStore.location;
    let locationOption = addElement('option', updateFormDropdownList, locationName);
    locationOption.setAttribute('value', locationName);
  }
}

// display current Store sales data on update form inputs
function updateFormSalesData() {
  const location = updateFormDropdownList.value;
  const updateMinCustomerInput = document.getElementById('minCustomerUpdate');
  const updateMaxCustomerInput = document.getElementById('maxCustomerUpdate');
  const updateAvgCookieInput = document.getElementById('avgCookieUpdate');

  for (let i = 0; i < storeObjects.length; i++) {
    const currentStore = storeObjects[i];
    const currentStoreLocation = currentStore.location;
    const currentStoreMinCustomer = currentStore.minHourlyCustomers;
    const currentStoreMaxCustomer = currentStore.maxHourlyCustomers;
    const currentStoreAvgSale = currentStore.avgSalePerCustomer;

    if (location === currentStoreLocation) {
      updateMinCustomerInput.setAttribute('placeholder', currentStoreMinCustomer);
      updateMinCustomerInput.removeAttribute('disabled');
      updateMaxCustomerInput.setAttribute('placeholder', currentStoreMaxCustomer);
      updateMaxCustomerInput.removeAttribute('disabled');
      updateAvgCookieInput.setAttribute('placeholder', currentStoreAvgSale);
      updateAvgCookieInput.removeAttribute('disabled');
    } else if (location === '---Select a Store---') {
      updateMinCustomerInput.setAttribute('disabled', 'true');
      updateMinCustomerInput.setAttribute('placeholder', '1');
      updateMaxCustomerInput.setAttribute('disabled', 'true');
      updateMaxCustomerInput.setAttribute('placeholder', '1');
      updateAvgCookieInput.setAttribute('disabled', 'true');
      updateAvgCookieInput.setAttribute('placeholder', '1.0');
    }
  }
}

salesForm.addEventListener('submit', createAdditionalStore);
updateSalesForm.addEventListener('submit', updateExistingStore);
updateFormDropdownList.addEventListener('input', updateFormSalesData);

renderSalesDataTableHeader();
createInitialStores();
