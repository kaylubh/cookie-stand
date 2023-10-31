'use strict';

function randomCustomers (min, max) {
  let customers = [];
  for (let i = 0; i < 14; i++) {
    customers.push(Math.floor(Math.random() * (max - min + 1) + min));
  }
  return customers;
}

function calculateSales (estCustomers, avgSale) {

}

let seattle = {
  location: 'Seattle',
  minHourlyCustomers: 23,
  maxHourlyCustomers: 65,
  avgSalePerCustomer: 6.3,
  estCustomersByHour: [],
  estSalesByHour: [],
  generateEstCustomers: function () {
    this.estCustomersByHour = randomCustomers(this.minHourlyCustomers, this.maxHourlyCustomers);
  },
  generateEstSales: function () {
    this.estSalesByHour = calculateSales(this.estCustomersByHour, this.avgSalePerCustomer);
  }
};
