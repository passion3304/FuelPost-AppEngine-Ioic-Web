// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
var testFetch = angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    }
  })

  .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html'
        }
      }
    })
  .state('app.playlists', {
    url: '/petrol',
    views: {
      'menuContent': {
        templateUrl: 'templates/petrol.html',
        //controller: 'PlaylistsCtrl'
        controller: 'FuelController'
      }
    }
  })
  .state('app.diesel', {
     url: '/diesel',
     views: {
       'menuContent': {
       templateUrl: 'templates/diesel.html',
       //controller: 'PlaylistsCtrl'
       controller: 'FuelController'
       }
     }
  })
  .state('app.kerosene', {
  url: '/kerosene',
  views: {
     'menuContent': {
       templateUrl: 'templates/kerosene.html',
       //controller: 'PlaylistsCtrl'
       controller: 'FuelController'
      }
    }
  })
  .state('app.single', {
    url: '/playlists/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }
  })
  /*
  .state('app.omcs', {
      url: '/omcs',
      controller: 'AllOMCController',
      templateUrl: 'templates/omcs.html',

      resolve: {
        omcs: function(OMCService) {
          return OMCService.getOmcs()
        }
      }

    })
    */
    .state('todos', {
        url: '/todos',
        controller: 'TodosCtrl',
        templateUrl: 'templates/omcs.html',
        resolve: {
          todos: function(TodosService) {
            return TodosService.getTodos()
          }
        }
      })
      .state('todo', {
        url: '/todos/:todoId',
        controller: 'TodoCtrl',
        templateUrl: 'templates/omc.html',
        resolve: {
          todo: function($stateParams, TodosService) {
            return TodosService.getTodo($stateParams.todoId)
          }
        }
      })
    .state('app.omc', {
      url: '/omcs/:name',
      controller: 'SingleOMCController',
      templateUrl: 'templates/omc.html',
      resolve: {
        todo: function($stateParams, OMCService) {
          return OMCService.getOmcs($stateParams.name)
        }
      }
    })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/petrol');
});

