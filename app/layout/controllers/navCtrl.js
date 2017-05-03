(function(){
  'use strict';

  var app = angular.module('blogApp');

  /**
  * Handle The Nav Panel
  **/

  app.controller('NavCtrl', ['$scope', '$log', 'appStates', function($scope, $log, appStates){
    $log.debug('NavCtrl');

    /**
  		 * Setup
  		 */

    $scope.tabs = [
      {
        name: 'Posts',
        code: 'posts'
      },
      {
        name: 'Admin',
        code: 'admin'
      }
    ];

    // setting a scope for appStates.nav
    $scope.states = appStates.nav;

  }]);

}());
