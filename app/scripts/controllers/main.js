'use strict';

angular.module('walletApp')
  .controller('MainCtrl', function ($scope, localStorageService, config, $http) {

    $scope.init = function() {
      // get exchange rates
      $scope.exchangeRates = [
        {currency: 'euro'},
        {currency: 'dollar'},
        {currency: 'rouble'},
      ];
      $scope.getExchangeRates();

      // get transactions
      var transactions = localStorageService.get('transactions');
      if (transactions === null) {
        $scope.transactions = [];
      } else {
        $scope.transactions = transactions;
      }

      // get currency
      var exchangeRate = localStorageService.get('exchangeRate');
      if (exchangeRate === null) {
        $scope.exchangeRate = $scope.exchangeRates[0];
      } else {
        $scope.exchangeRate = exchangeRate;
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

    $scope.reset = function() {
      $scope.transactions = [];
    };

    $scope.updateBalance = function(amount) {
      var balance = 0;
      angular.forEach($scope.transactions, function(transaction) {
        balance += parseFloat(transaction.amount);
      });
      $scope.balance = balance;
    };

    $scope.getExchangeRates = function() {
      angular.forEach($scope.exchangeRates, function(exchangeRate) {
        $http({method:'GET', url:config.api.root+'/exchangeRate/'+exchangeRate.currency}).
          success(function(data) {
            exchangeRate.value = data.exchangeRate;
          });
      });
    };

    $scope.convert = function(exchangeRate) {
      var transactions = $scope.transactions;
      angular.forEach(transactions, function(transaction) {
        transaction.amount = transaction.amount*exchangeRate.value/$scope.exchangeRate.value;
      });

      $scope.exchangeRate = exchangeRate;
      localStorageService.set('exchangeRate', $scope.exchangeRate);
      $scope.transactions = transactions;
    };

    $scope.$watch('transactions', function() {
      localStorageService.set('transactions', $scope.transactions);
      $scope.updateBalance();
    }, true);

    $scope.init();
  });
