'use strict';

var app = angular.module('walletApp');

app.directive('transactions', function() {

  return {
    restrict: 'E',
    replace: true,
    scope: {
      transactions: '=',
      balance: '=',
      currency: '='
    },
    templateUrl: 'partials/transactions.html',
    link: function(scope, element) {
    }
  };
});
