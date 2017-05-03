(function() {
  'use strict';

  var app = angular.module('blogApp');

  app.controller('PostCtrl',
  ['$log', '$scope', '$http', '$route', 'postData', 'appStates', 'utils',
  function($log, $scope, $http, $route, postData, appStates, utils){
    $log.debug('PostCtrl');

    //current route: look up its activeTab value and set it to appStates.nav.activeTab
    // change appStates.nav.activeTab from null to post
    appStates.nav.activeTab = $route.current.activeTab;

    $scope.utils = utils;
    $scope.post = postData;

    //dynamicall add the data of the post with it's html path
    $http.get(postData.htmlPath)
      .success(function(data){
        $scope.postHtml = data;
      });


  }]);

}());
