(function(){
  'use strict';

  var app = angular.module('blogApp');

  app.factory('appStates',function ($log) {
		$log.debug('appStates');

		return {
			nav: {
				activeTab: null
			}
		};
	});

}());
