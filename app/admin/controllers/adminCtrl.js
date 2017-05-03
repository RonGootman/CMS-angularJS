(function(){
  'use strict';

  var app = angular.module('blogApp');

  /**
  * Handle The Admin Panel
  **/

  app.controller('AdminCtrl', ['$scope', '$log', '$route', '$filter', 'appStates', 'postsData',
  function($scope, $log, $route, $filter, appStates, postsData){

    var posts;

    appStates.nav.activeTab = $route.current.activeTab;

    /**
		 * Preapre the posts data
		 */

    //Prepare the pots data
    posts = $filter('sidebarFilters')(postsData.posts);
    $scope.posts = posts;

    console.log('posts from admin area');
    console.log($scope.posts);

  }]);

}());
