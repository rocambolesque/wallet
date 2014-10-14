'use strict';

var app = angular.module('walletApp');

app.directive('transactions', function() {

  return {
    restrict: 'E',
    replace: true,
    scope: {
      transactions: '='
    },
    templateUrl: 'partials/transactions.html',
    link: function(scope, element) {
      scope.balance = 0;
      angular.forEach(scope.transactions, function(transaction) {
        scope.balance += transaction.amount;
      });
    }
  };
});
