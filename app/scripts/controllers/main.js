'use strict';

angular.module('walletApp')
  .controller('MainCtrl', function ($scope) {
    $scope.transactions = [
      {amount: 90},
      {amount: 70},
      {amount: 10}
    ];

    $scope.add = function(amount) {
      $scope.transactions.push({amount: amount});
    };

    $scope.remove = function(amount) {
      $scope.transactions.push({amount: -amount});
    };
  });
