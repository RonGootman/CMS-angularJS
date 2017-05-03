(function () {
  'use strict';

  var app = angular.module('blogApp', ['ngRoute', 'ngSanitize']);

  app.config(function ($routeProvider){

    $routeProvider
			.when('/', {
				redirectTo: '/posts'
			})
      .when('/posts/:page?', {
        templateUrl: 'app/posts/templates/posts.html',
        controller: 'PostsCtrl',
        activeTab: 'posts',
        resolve: {
          postsData: ['dataService', function(dataService){
            return dataService.get();
          }]
        }
      })
      .when('/post/:title', {
        templateUrl: 'app/posts/templates/post.html',
        controller: 'PostCtrl',
        activeTab: 'posts',
        resolve: {
          postData: ['$route', 'dataService' ,function($route, dataService){
            var title = $route.current.params.title;
            return dataService.getById(title);
          }]
        }
      })
      .when('/admin', {
        templateUrl: 'app/admin/templates/admin.html',
        controller: 'AdminCtrl',
        activeTab: 'admin',
        resolve: {
          postsData: ['dataService', function(dataService){
            return dataService.get();
          }]
        }
      })
      .otherwise({
        redirectTo: '/'
      });
  });
}());
