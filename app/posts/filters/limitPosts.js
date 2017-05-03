(function(){
  'use strict';

  var app = angular.module('blogApp');

  /**
  * Filter posts depending on the page number and posts number limit
  **/

  app.filter('limitPosts', function(){

    return function(data, limit, pageNum){
      // If there is not data inserted or it data is not in array form
      // dont filter anything just return the data as it is
      if(!data || !angular.isArray(data)){
        return data;
      }

      // Get end index
      var end = pageNum * limit;
      // Get start index
      var start = end - limit;

      return data.slice(start,end);

    };

  });
}());
