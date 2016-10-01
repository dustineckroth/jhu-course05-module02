(function () {
  'use strict';

  angular.module('ShoppingListCheckOff', [])
         .controller('ToBuyController', ToBuyController)
         .controller('AlreadyBoughtController', AlreadyBoughtController)
         .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];

  function ToBuyController(ShoppingListCheckOffService) {
    var toBuyList = this;

    toBuyList.items = ShoppingListCheckOffService.getToBuyItems();
    toBuyList.message = "Everything is bought!";
    toBuyList.newItemName = "";
    toBuyList.newItemQuantity = "";

    toBuyList.moveToBoughtList = function(index) {
      ShoppingListCheckOffService.moveToBoughtList(index);
    };

    toBuyList.addItem = function() {
      var item = { name: toBuyList.newItemName,
                   quantity: toBuyList.newItemQuantity };

      ShoppingListCheckOffService.addItem(item);
    }
  }

  function AlreadyBoughtController(ShoppingListCheckOffService) {
      var boughtList = this;

      boughtList.items = ShoppingListCheckOffService.getBoughtItems();
      boughtList.message = "Nothing bought yet!";
  }

  function ShoppingListCheckOffService() {
    var service = this;

    var toBuyListItems = [
              { name: "cookies", quantity: 10 },
              { name: "chips", quantity: 2 },
              { name: "breads", quantity: 5 },
              { name: "fruits", quantity: 6 },
              { name: "veggies", quantity: 3 }];

    var boughtListItems = [];

    service.moveToBoughtList = function(index) {
      var item = toBuyListItems[index];
      //console.log(toBuyListItems[index]);

      boughtListItems.push(item);
      toBuyListItems.splice(index,1);
    };

    service.getToBuyItems = function() {
      return toBuyListItems;
    };

    service.getBoughtItems = function() {
      return boughtListItems;
    };

    service.addItem = function(item) {
      toBuyListItems.push(item);
    }
  }


})(); // iife end
