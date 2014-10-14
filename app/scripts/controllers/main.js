'use strict';

angular.module('walletApp')
  .controller('MainCtrl', function ($scope) {

    $scope.init = function() {
      $scope.transactions = [
        {amount: 90},
        {amount: 70},
        {amount: 10}
      ];
    };

    $scope.add = function(amount) {
      $scope.transactions.push({amount: amount});
    };

    $scope.remove = function(amount) {
      $scope.transactions.push({amount: -amount});
    };

    $scope.updateBalance = function(amount) {
      var balance = 0;
      angular.forEach($scope.transactions, function(transaction) {
        balance += parseFloat(transaction.amount);
      });
      $scope.balance = balance;
    };

    $scope.$watch('transactions', function() {
      $scope.updateBalance();
    }, true);

    $scope.init();
  });
