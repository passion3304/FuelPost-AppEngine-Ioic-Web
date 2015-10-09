var FPApp = angular.module("FPApp", ["ionic"]);

FPApp.service("FPSvc", ["$http", "$rootScope", FPSvc]);

FPApp.controller("FPCtrl",
    ["$scope", "$sce",
     "$ionicLoading", "$ionicListDelegate", "$ionicPlatform",
     "FPSvc", FPCtrl]);

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
  $scope.getData = function (){
  //https://script.google.com/macros/s/AKfycbx2tfQe5F4pEOdFpf99DM8rMWtg_B1JguFxugBIUPWz76IbEpk/exec -- this exec public works
  //https://script.googleusercontent.com/macros/echo?user_content_key=ufZ2RGT4ZbIHnlTLxtGnPxhPklcF6s8iXRSpyVLEpriUujW2KCbETKIugf5Q1kWhi-6g39wg8baH0Jc8nww_ZEh8omlitHHCm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnNB6anUFLacWNXkzaa_kPlm3sFhxsxz4ugmmNikkWj5bxz8Rd12PZMwnOFpDL6kfaA&lib=MTJMUDZTypXfnHVya28c7JCwsu2EIHoHF
    /*$http.get("https://script.google.com/macros/s/AKfycbx2tfQe5F4pEOdFpf99DM8rMWtg_B1JguFxugBIUPWz76IbEpk/exec")
      .success(function(data){
        $scope.omcs = data;
        //alert(omcs[0].name);
        //alert($scope.body);
      })
      .error(function(data){
        $scope.omcName = "Errorrrr";
        //alert("Unsuccessful");
        //alert("Something went wrong with Array in the function in app.js");
      })*/
  }

})

//Working on services from this point on so that I can pass data between views


//This is the one that should be working to pull all OMC's from database
FPApp.controller("DieselController", function($scope,$http,$ionicLoading){
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

//This was picked from the services.js from tabs starterpack
FPSvc.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'https://pbs.twimg.com/profile_images/598205061232103424/3j5HUXMY.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'https://pbs.twimg.com/profile_images/578237281384841216/R3ae1n61.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});
;
