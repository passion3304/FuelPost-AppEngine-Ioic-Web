var FPApp = angular.module("FPApp", ["ionic"]);
var app = angular.module('ionicApp', ['ionic'])

FPApp.service("FPSvc", ["$http", "$rootScope"]);

FPApp.controller("FPCtrl",
    ["$scope", "$sce",
     "$ionicLoading", "$ionicListDelegate", "$ionicPlatform",
     "FPSvc"]);

function FPCtrl($scope, $sce, $ionicLoading, $ionicListDelegate, $ionicPlatform, FPSvc) {

    $ionicLoading.show({template: "Loading blogs..."});

    $scope.deviceReady = false;

    $ionicPlatform.ready(function() {
        $scope.$apply(function() {
            $scope.deviceReady = true;
        });
    });

    $scope.blogs = [];
    $scope.params = {};

    $scope.$on("FPApp.blogs", function(_, result) {
        result.posts.forEach(function(b) {
            $scope.blogs({
                name: b.author.name,
                /*avatar_URL: b.author.avatar_URL,
                title: $sce.trustAsHtml(b.title),
                URL: b.URL,
                excerpt: $sce.trustAsHtml(b.excerpt),
                featured_image: b.featured_image*/
            });
        });

        $scope.params.before = result.date_range.oldest;

        $scope.$broadcast("scroll.infiniteScrollComplete");
        $scope.$broadcast("scroll.refreshComplete");
        $ionicLoading.hide();
    });

    $scope.loadMore = function() {
        FPSvc.loadBlogs($scope.params);
    }
    $scope.reload = function() {
        $scope.blogs = [];
        $scope.params = {};
        FPSvc.loadBlogs();
    }

    $scope.show = function($index) {
        cordova.InAppBrowser.open($scope.blogs[$index].URL, "_blank", "location=no");
    }
    $scope.share = function($index) {
        $ionicListDelegate.closeOptionButtons();
        window.socialmessage.send({
            url: $scope.blogs[$index].URL
        });
    }

}

function FPSvc($http, $rootScope) {
    this.loadBlogs = function(params) {
    //WordPress freshly pressed JSON link https://public-api.wordpress.com/rest/v1/freshly-pressed/
        $http.get("https://script.google.com/macros/s/AKfycbx2tfQe5F4pEOdFpf99DM8rMWtg_B1JguFxugBIUPWz76IbEpk/exec", {
                params: params})
            .success(function(result) {
                $rootScope.$broadcast("FPApp.blogs", result);
            });
    }
}

function refreshPrices(){
/*
  $http.get("https://script.google.com/macros/s/AKfycbx2tfQe5F4pEOdFpf99DM8rMWtg_B1JguFxugBIUPWz76IbEpk/exec")
        .success(function(data){
          $scope.fxnOmc = data;
        })
        .error(function(data){
        alert("failed");
          $scope.err = "Refreshing failed due to bad connection";
        })
        */
  return  $scope.omcs = [{"name":"fake omc 1", "price":23}];
}

//This controller shows and hides details
testFetch.controller("toggleShowCtrl",function($scope) {
                                          $scope.myVar = true;
                                          $scope.toggle = function() {
                                              $scope.myVar = !$scope.myVar;
                                          }
                                          });


testFetch.controller("FuelController", function($scope,$http,$ionicLoading){
  $ionicLoading.show({template:"Loading prices..."});

  //Im puting the main operation outside the function so that it runs immediately
  //setTimeout(this, 3000)
  $http.get("http://127.0.0.1:8888/omcread")
        .success(function(data){
          $scope.omcs = data;
          //alert(omcs[0].name);
          //alert($scope.body);
        })
        .error(function(data){
          $scope.err = "Check Iternet connection";
          alert("Please check your Internet connection and try again");
          //alert("Something went wrong with Array in the function in app.js");
        })
        $ionicLoading.hide();

});
//Putting service here to see if it would work
/*
testFetch.service('OMCService', function($q) {
  return {
    omcs: [{'name':'Shell','petrol':99.0,'diesel':99.0,'kerosene':99.0}],

    getOmcs: function() {
      return this.omcs
    },
    getOmc: function(omcName) {
      var dfd = $q.defer()
      this.omcs.forEach(function(omc) {
        if (omc.name === omcName)
        dfd.resolve(omc)
      })

      return dfd.promise
    }

  }
})
*/

//Working on services from this point on so that I can pass data between views


testFetch.controller("DieselController", function($scope,$http,$ionicLoading){
  $ionicLoading.show({template:"Loading prices..."})
  //Im puting the main operation outside the function so that it runs immediately
  // Apps script sample data JSON Beta link https://script.google.com/macros/s/AKfycbx2tfQe5F4pEOdFpf99DM8rMWtg_B1JguFxugBIUPWz76IbEpk/exec
  $http.get("http://localhost:8888/omcsave")
        .success(function(data){
          $scope.omcs = data;
          //alert(omcs[0].name);
          //alert($scope.body);
        })
        .error(function(data){
          $scope.omcName = "Errorrrr";
          //alert("Unsuccessful");
          //alert("Something went wrong with Array in the function in app.js");
        })
        $ionicLoading.hide();
  }

)

//I've created this controller to try and see if I can use it to pull a single OMC by Name

testFetch.controller("AllOMCController", function($scope,list){
/*
    var objarr = [];
    //objarr = list;
    $scope.fill = omcdata;
    //$scope.fs = omcdata.getOmcData;
    alert($scope.fill[0]);
    */
var makehttp = function(){
    list.getFuelCompanies(data)
        .then(function(data){
            return data;
        }, function(error){
            return "Error";
        })
    };
    alert(makehttp);
  }
);

testFetch.controller("SingleOMCController", function($scope, omc){
    $scope.oneStation = omc;
  }
);

testFetch.factory('list',function($http, $q){
    //return [{'name':'Shell','petrol':99.0,'diesel':99.0,'kerosene':99.0}];
    /*
    var obj = {}
    obj.getAll =  $http.get("http://localhost:8888/omcread")
                                               .success(function(dataobj){
                                                   return dataobj;
                                                   })
                                               .error(function(dataobj){
                                               });
    return obj;
    */
    //based on example from http://andyshora.com/promises-angularjs-explained-as-cartoon.html
    return {
        getFuelCompanies: function(){
                                        return $http.get('http://localhost:8888/omcread')
                                            .then(function(response){
                                                if (typeof response === 'object') {
                                                        return $q.resolve(response);

                                                    } else {
                                                        // invalid response
                                                        return $q.reject(response.data);
                                                    }
                                            }, function(response){
                                                //something went wrong
                                                return $q.reject(response);
                                            })

                                    }

    }
});

testFetch.service('TodosService', function($q) {
  return {
    todos: [
      {
        id: '1',
        name: 'Pick up apples',
        done: false
      },
      {
        id: '2',
        name: 'Mow the lawn',
        done: true
      }
    ],
    getTodos: function() {
      return this.todos
    },
    getTodo: function(todoId) {
      var dfd = $q.defer()
      this.todos.forEach(function(todo) {
        if (todo.id === todoId) dfd.resolve(todo)
      })

      return dfd.promise
    }

  }
});



/*
testFetch.service('omcdata', function($http){
    return{
            omcs: function(){
                            var stuff = [{"name":"fake omc 1", "price":23}];
                            $http.get("http://localhost:8888/omcread")
                                    .success(function(dataobj){
                                        var stuff = dataobj;
                                        })
                                    .error(function(dataobj){
                                    }),
            getOmcs: function(){
                        return this.omcs
                    },

            getOmc: function (omcId){
                        var dfd = $q.defer()
                        this.omcs.forEach(function (omc){
                            if(omc.name === omcId) dfd.resolve(omc)
                        })
                        return dfd.promise
                    }
                        }

    }
    //var fillings=[{'name':'Shell','petrol':99.0,'diesel':99.0,'kerosene':99.0}];
    /*
    fillings.getAllOmcs = function(){
        $http.get("http://localhost:8888/omcread")
        .success(function(dataobj){
            var omcs = dataobj;
            return dataobj;
            })
        .error(function(dataobj){
        })
    };
    */
    //return fillings;
//});



