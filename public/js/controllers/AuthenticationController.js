angular.module("trackerapp.login",[]).controller('AuthenticationController', function($scope,$rootScope,authenticationService,ngDialog,$location,$state){

    $scope.showLoader = true;

    $scope.user = {
      email:'', password:''
    }

    $scope.authenticate = function(){
      authenticationService.authenticate($scope.user.email, $scope.user.password)
      .then(function(result){
         authenticationService.getUserDetails()
         .then(function(userDetails){
           $scope.currentUser = userDetails;
           $rootScope.currentUser = userDetails;
           $scope.message = null;
           //ngDialog.open({
            //  template: '<p>'+angular.toJson($scope.currentUser)+'<p>'
          //});
          //$location.path("/home");
          $state.go('home');
         }, function(error){
           $scope.currentUser = null;
           $scope.message = error;
         });
      }, function(error){
        $scope.currentUser = null;
         $scope.message = error;
         ngDialog.open({
            template: '<p>'+error+'<p>'
        });
      })
    }

    $scope.logout = function(){
      authenticationService.logout();
      //$location.path("/");
      $state.go("login");

    }



})
.controller('HomePageController', function($scope){

  $scope.init = function(){
    $scope.$parent.showLoader = false;
  }

  $scope.init();


});
