'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('walletApp'));

  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  it('should have 3 exchange rates and no transactions', function () {
    expect(scope.exchangeRates.length).toBe(3);
    expect(scope.transactions.length).toBe(0);
  });
});
