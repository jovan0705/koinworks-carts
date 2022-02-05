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
       imageUrl: 'https://cf.shopee.co.id/file/b8d879bc9554c2c58e77e0688db0c81d',
       createdAt: new Date(),
       updatedAt: new Date()
     },
     {
      name: 'Jeans Polo',
      price: 250000,
      stock: 2,
      imageUrl: 'https://cf.shopee.co.id/file/8e4b84ba09c3715b985deb5d550f6ec3',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'LV Wallet',
      price: 500000,
      stock: 1,
      imageUrl: 'https://eu.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-multiple-wallet-monogram-eclipse-canvas-wallets-and-small-leather-goods--M61695_PM2_Front%20view.jpg',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Calendar',
      price: 10000,
      stock: 100,
      imageUrl: 'https://www.betacalendars.com/uploads/2021/02/2022-Calendar-scaled.jpg',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Termos',
      price: 200000,
      stock: 0,
      imageUrl: 'https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/090/0709015_PE726794_S5.jpg',
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
