'use strict';

let hoursOpen = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'];

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
store object {
  location
  minimum customers per hour
  maximum customers per hour
  average cookie sales per customer
  estimated customers in array
  estimated sales in array [last value in array is total sales for day]
}
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

let tokyo = {
  location: 'Tokyo',
  minHourlyCustomers: 3,
  maxHourlyCustomers: 24,
  avgSalePerCustomer: 1.2,
  estCustomers: [],
  estSales: [],
  generateEstCustomers: function () {
    this.estCustomers = randomCustomers(this.minHourlyCustomers, this.maxHourlyCustomers);
  },
  generateEstSales: function () {
    this.estSales = calculateSales(this.estCustomers, this.avgSalePerCustomer);
  }
};

tokyo.generateEstCustomers();
tokyo.generateEstSales();

let dubai = {
  location: 'Dubai',
  minHourlyCustomers: 11,
  maxHourlyCustomers: 38,
  avgSalePerCustomer: 3.7,
  estCustomers: [],
  estSales: [],
  generateEstCustomers: function () {
    this.estCustomers = randomCustomers(this.minHourlyCustomers, this.maxHourlyCustomers);
  },
  generateEstSales: function () {
    this.estSales = calculateSales(this.estCustomers, this.avgSalePerCustomer);
  }
};

dubai.generateEstCustomers();
dubai.generateEstSales();

let paris = {
  location: 'Paris',
  minHourlyCustomers: 20,
  maxHourlyCustomers: 38,
  avgSalePerCustomer: 2.3,
  estCustomers: [],
  estSales: [],
  generateEstCustomers: function () {
    this.estCustomers = randomCustomers(this.minHourlyCustomers, this.maxHourlyCustomers);
  },
  generateEstSales: function () {
    this.estSales = calculateSales(this.estCustomers, this.avgSalePerCustomer);
  }
};

paris.generateEstCustomers();
paris.generateEstSales();

let lima = {
  location: 'Lima',
  minHourlyCustomers: 2,
  maxHourlyCustomers: 16,
  avgSalePerCustomer: 4.6,
  estCustomers: [],
  estSales: [],
  generateEstCustomers: function () {
    this.estCustomers = randomCustomers(this.minHourlyCustomers, this.maxHourlyCustomers);
  },
  generateEstSales: function () {
    this.estSales = calculateSales(this.estCustomers, this.avgSalePerCustomer);
  }
};

lima.generateEstCustomers();
lima.generateEstSales();

