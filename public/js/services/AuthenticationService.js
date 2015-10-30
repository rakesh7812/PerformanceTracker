

angular.module('trackerapp.authentication.service',[]).factory('authenticationService',function($cookies,$http,$q,$window){
    var LOCAL_TOKEN_KEY = 'tracker-token-key';
    var userInfo;
    var services = {};

    services.authenticate = function (email, password){
      var deferred = $q.defer();
      $http.post("/api/authenticate", {
        email:email,password:password
      }). then(function(result){
          if(result.data.success){
            window.localStorage.setItem(LOCAL_TOKEN_KEY, result.data.token);
            $http.defaults.headers.common['x-access-token'] = result.data.token;
           $cookies.put('x-access-token-cookie', result.data.token);
            deferred.resolve(result.data.message);
          }
          else{
            deferred.reject(result.data.message);
          }
      }, function(error){
        console.log(error);
          deferred.reject(error);
      });
      return deferred.promise;
    }

    services.getUserDetails = function(){
      var deferred = $q.defer();
        $http.get("/api/getUserDetails")
        .then(function(result){
          deferred.resolve(result.data);
        }, function(error){
            deferred.reject(error);
        });
        return deferred.promise;
    }

    services.logout = function(){
      window.localStorage.removeItem(LOCAL_TOKEN_KEY);
      $http.defaults.headers.common['x-access-token'] = undefined;
      $cookies.remove("x-access-token-cookie");
    }

    return services;

});
