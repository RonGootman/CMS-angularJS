(function(){
  'use strict';

  var app = angular.module('blogApp');

  app.factory('utils', ['$filter', '$location', function($filter, $location){

    return{
      /**
      * Replace all word delimiters into on '-', between each word
      *
      * @param {string} title Dirty string
      * @return {string}      Clean string
      **/
      cleanTitle: function(title) {
        return title.replace(/[^a-z0-9]+/gi, '-');
      }, //cleanTitile
      /**
      * Replace all word delimiters into on '-', between each word
      * Transform string to lowercase
      *
      * @param {string} title Dirty string
      * @return {string}      Clean string
      **/
      cleanTitleLower: function (title) {
        return this.cleanTitle(title).toLowerCase();
      }, //cleanTitleLower
      /**
      *
      *
      * @param {Object} obj List of data
      **/
      objToArr: function(obj) {

        // Make sure this is within the return and not the global scope
        var that = this;

        return $.map(obj, function(val,key){
          return {
            name: key,
            count: val,
            cleanName: that.cleanTitleLower(key)
          };
        });
      }, //objToArr
      /**
      *
      * Get post tags, and count each
      *
      * @param {Array} posts Posts data
      * @return {Array|Null} Tags data
      *
      **/
      getTags: function(posts) {
        var prop = {};
        // if no posts return nothing - defensive coding
        if (!posts){
          return null;
        }
        // iterate through each post in posts
        $.each(posts, function(index, post){
          // iterate through tags in each post
          $.each(post.tags, function(index, tag){
            // if there is no such a tag property in the prop object
            if (typeof prop[tag] === 'undefined') {
              // create one and assign its value to 0
              prop[tag] = 0;
            }
            // increment its value by 1
            prop[tag]++;
          });
        });
        return this.objToArr(prop);
      }, //getTags
      /**
      *
      * Get post authors, and count each
      *
      * @param {Array} posts Posts data
      * @return {Array|Null} Authors data
      *
      **/
      getAuthors: function(posts) {
        var prop = {};
        // if no posts return nothing - defensive coding
        if (!posts) {
          return null;
        }
        // iterate through each post in posts
        $.each(posts, function(index,post){
          var author = post.author;
          // if there is no author value in prop object create on and assign to 0 counter
          if (typeof prop[author] === 'undefined') {
            prop[author] = 0;
          }
          // increment its value by 1
          prop[author]++;
        });
        return this.objToArr(prop);
      }, //getAuthors
      getDates: function(posts){
        var props = {},
            that = this;


        if (!posts){
          return null;
        }

        $.each(posts, function(index, post){
          var date = post.date;
          var year = $filter('date')(date, 'yyyy');
					var month = $filter('date')(date, 'MMMM');

					if (typeof props[year] === 'undefined') {
						props[year] = {};
					}
					if (typeof props[year][month] === 'undefined') {
						props[year][month] = {
							count: 0
						};
					}

          // Increment number of times that date is associated with a post
					props[year][month].count++;
					props[year][month].date = date;
        });

        return $.map(props, function (months, year) {
					return {
						year: year,
						months: that.objToArr(months)
					};
				});
      }, //getDates
      /**
      *If location url has '?' -
      *
      * @return {string|null} Query params
      **/
      getQueryUrl: function() {
        var url = $location.url();

        if (url.indexOf('?') > -1){
          console.log('url: ', url.slice(url.indexOf('?')));
          return url.slice(url.indexOf('?'));
        }
      } //getQueryUrl

    }; //return


  }]);
}());
