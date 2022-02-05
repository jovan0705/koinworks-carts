'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert('Products', [
     {
       name: 'Tamiya',
       price: 100000,
       stock: 5,
       createdAt: new Date(),
       updatedAt: new Date()
     },
     {
      name: 'Jeans Polo',
      price: 250000,
      stock: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'LV Wallet',
      price: 500000,
      stock: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
   ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Products', null, {});
  }
};
