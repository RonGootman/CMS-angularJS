(function(){
  'use strict';

  var app = angular.module('blogApp');

  app.factory('dataService', ['$log', '$q', '$http', 'utils',function($log, $q, $http, utils){
    $log.debug('dataService');

    /**
		 * Fetch posts data
		 */

    var defer = $q.defer(),
        dataCache = {},
        postsPromise = defer.promise;

    $http.get('data/posts.json')
    .success(function(data, status){
      dataCache.posts = data.posts;
      defer.resolve(dataCache);
    })
    .error(function (data, status){
      console.error(data, status);
    });

    /**
    * Data API
    */
    return {
      /**
			 * Get all posts or single post data
			 * `get()` - Will get all of the data
			 *
			 * @returns {Object} A Promise
			 */
      get: function(){
        return postsPromise;
      },
      getById: function(id){
        var defer = $q.defer();

        // Make sure the data is ready
        // This will run if the data has been fetched
        postsPromise.then(function(data){

          var cleanId = utils.cleanTitle(id),
              existingPost = false;

          $.each(data.posts, function(index, post){
            if (utils.cleanTitle(post.title) === cleanId) {
              existingPost = true;

              defer.resolve(post);

              // Stop and exist the loop
              return false;
            }
          }); //each

          if (!existingPost) {
            defer.reject(id);
          }

        });

        return defer.promise;
      }
    };

  }]);

}());
