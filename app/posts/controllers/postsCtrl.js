(function(){
  'use strict';

  var app = angular.module('blogApp');

  /**
  * Handle The Admin Panel
  **/

  app.controller('PostsCtrl',
  ['$scope', '$log', '$route', '$routeParams', '$filter', '$location', 'appStates', 'postsData', 'utils',
  function($scope, $log, $route, $routeParams, $filter, $location, appStates, postsData, utils){
    $log.debug('PostsCtrl');
    $log.info('locationURL: ',$location.url());
    $log.info('routeParam: ' ,$routeParams.search);

    var posts,
      // Limit the number of visible posts
      limit = 3,

      pageNum = parseInt($routeParams.page, 10) || 1;

      console.log('page: ', pageNum);

    //current route: look up its activeTab value and set it to appStates.nav.activeTab
    // change appStates.nav.activeTab from null to post
    appStates.nav.activeTab = $route.current.activeTab;

    $scope.limit = limit;
    $scope.pageNum = pageNum;

    //Set the helpers so it can be accessed from the view
    $scope.utils = utils;

    //Get current query of params
    $scope.queryParams = utils.getQueryUrl();
    // Get `search` query param
    $scope.searchQuery = $routeParams.search;

    /**
    * Perpare the posts data
    */


    posts = $filter('sidebarFilters')(postsData.posts);
    // order posts by date
    posts = $filter('orderBy')(posts, '-date');


    $scope.posts = posts;


  }]);

}());
