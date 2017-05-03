(function(){
  'use strict';

  var app = angular.module('blogApp');

  app.controller('SidebarCtrl',
  ['$log', '$rootScope', '$scope', '$location', 'appStates', 'dataService', 'utils',
  function($log, $rootScope, $scope, $location, appStates, dataService, utils){
    $log.debug('SidebarCtrl');

    /**
    * Handle active Sidebar Filter when the URL changes
    **/

    var filterParams;

    $scope.appStates = appStates;

    /**
    * get the sidebar data
    **/

    function prepareSidebarData(){
      var posts = $scope.posts;
      $scope.categories = utils.getTags(posts);
      $scope.authors = utils.getAuthors(posts);
      $scope.dates = utils.getDates(posts);
    }

    /**
    * Search and Submit
    **/

    $scope.search = function(query) {
      $location.search('');

      if (query) {
        // Set '?search='querysearch' and the end of the url string
        $location.search('search', query);
        console.warn($location);
      }
    };

    /**
    * Get the posts data from dataService
    **/

    dataService.get()
      .then(function(data){
        var posts = data.posts;

        $scope.posts = posts;
        prepareSidebarData();
      });

    // This array matches any of the keys inside the curr.param values
    filterParams = ['category', 'author', 'month', 'search'];



    $rootScope.$on('$routeChangeSuccess', function (e, curr, prev){
      console.log('event: ', e);
      console.log('current: ', curr);
      console.warn(curr.params.search);
      console.log('previous: ', prev);

      // Populate the Search input if the search query param exists
			$scope.searchQuery = curr.params.search || null;

      // Under these conditions, show no active filter
      // if it has title key then it is in the post page
      // if serach has been used
			if (curr.params.title || $scope.searchQuery) {
				$scope.selectedFilter = null;
				return;
			}

      $.each(filterParams, function (index, val) {
        //if curr.params exists
        if (curr.params[val]) {
          // if there is no curr.params with the search key
          if (!curr.params.search) {
            //set the selectedFiter the the param of the route
            $scope.selectedFilter = curr.params[val];
            console.info('selectedFilter: ', $scope.selectedFilter);
          }

        //stop the loop
        return false;
        }

      // If reached the end and no param matched
      if (index === filterParams.length - 1) {
        $scope.selectedFilter = 'all';
        return false;
      }

      });


    });

  }]);

}());
