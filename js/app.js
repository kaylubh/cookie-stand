'use strict';

function randomCustomers (min, max) {
  Math.floor(Math.random() * (max - min + 1) + min);
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
