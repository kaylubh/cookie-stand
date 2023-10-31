'use strict';

let hoursOpen = ['6am', '7am', '8am'];

// calculate random customers for each hour
function randomCustomers (min, max) {
  let customers = [];
  for (let i = 0; i < 14; i++) { // calculate each hour customers
    let randomCustomer = (Math.floor(Math.random() * (max - min + 1) + min));
    customers.push(randomCustomer);
  }
  return customers;
}

// calculate sales for each hour and total for day
function calculateSales (estCustomers, avgSale) { 
  let sales = [];
  let totalSales = 0;
  for (let i = 0; i < 14; i++) { // calculate each hour sales
    sales.push(Math.floor(estCustomers[i] * avgSale));
  }
  for (let i = 0; i < sales.length; i++) { // calculate total day sales
    totalSales += sales[i];
  }
  sales.push(totalSales); // stores total day sales at end of the array
  return sales;
}

/*

*/

let seattle = {
  location: 'Seattle',
  minHourlyCustomers: 23,
  maxHourlyCustomers: 65,
  avgSalePerCustomer: 6.3,
  estCustomers: [],
  estSales: [],
  generateEstCustomers: function () {
    this.estCustomers = randomCustomers(this.minHourlyCustomers, this.maxHourlyCustomers);
  },
  generateEstSales: function () {
    this.estSales = calculateSales(this.estCustomers, this.avgSalePerCustomer);
  }
};

seattle.generateEstCustomers();
seattle.generateEstSales();
