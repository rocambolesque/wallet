'use strict';

angular.module('walletApp')
  .controller('MainCtrl', function ($scope, localStorageService) {

    $scope.init = function() {
      var transactions = localStorageService.get('transactions');

      if (transactions === null) {
        $scope.transactions = [];
      } else {
        $scope.transactions = transactions;
      }
    };

    $scope.add = function(amount) {
      $scope.transactions.push({amount: amount});
      $scope.amountAdd = ''; // clear input
    };

    $scope.remove = function(amount) {
      $scope.transactions.push({amount: -amount});
      $scope.amountRemove = ''; // clear input
    };

    $scope.updateBalance = function(amount) {
      var balance = 0;
      angular.forEach($scope.transactions, function(transaction) {
        balance += parseFloat(transaction.amount);
      });
      $scope.balance = balance;
    };

    $scope.$watch('transactions', function() {
      localStorageService.set('transactions', $scope.transactions);
      $scope.updateBalance();
    }, true);

    $scope.init();
  });
