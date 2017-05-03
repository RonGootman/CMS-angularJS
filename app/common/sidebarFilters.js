(function(){
  'use strict';

  var app = angular.module('blogApp');

  app.filter('sidebarFilters', ['$log', '$filter', '$location', 'utils', function($log, $filter, $location, utils){

    return function (data) {
      $log.debug('sidebarFilters');

      // Get the URL query params
			var queryParams = $location.search();

      // Validate input data
			if (!data || !data.length) {
				return data;
			}

      // Filter by Search
			if (queryParams.search) {
				return $filter('filter')(data, queryParams.search);
			}

      // Filter by Category
			if (queryParams.category) {
				return $filter('filter')(data, {
          // see if queryParams.category value matches any of tags inside the data
					tags: queryParams.category
				});
			}

      //Filter by Author
      if (queryParams.author) {
        return data.filter(function(post){
          return utils.cleanTitleLower(post.author) === queryParams.author;
        });
      }

      if (queryParams.month){
        return data.filter(function(post){
          console.log('date:');
          console.log($filter('date')(post.date, 'MMMM-yyyy').toLowerCase());
          return $filter('date')(post.date, 'MMMM-yyyy').toLowerCase() === queryParams.month;
        });
      }
      return data;
    };

  }]);
}());
