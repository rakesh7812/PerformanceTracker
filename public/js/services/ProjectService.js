angular.module('trackerapp.project.service',[]).factory('projectService',function($http,$q, $window){

    var services = {};

    services.listAllProject =  function(){
      var deferred = $q.defer();
        $http.get("/api/listAllProject")
        .then(function(result){
          deferred.resolve(result.data);
        }, function(error){
            deferred.reject(error);
        });
        return deferred.promise;
    }

    services.listAllLocationsByProject =  function(projectId){
      var deferred = $q.defer();
        $http.get("/api/listAllLocationsByProject/"+projectId)
        .then(function(result){
          deferred.resolve(result.data);
        }, function(error){
            deferred.reject(error);
        });
        return deferred.promise;
    }

    services.listAllLocationsFilterByProject =  function(projectId){
      var deferred = $q.defer();
        $http.get("/api/listAllLocationsFilterByProject/"+projectId)
        .then(function(result){
          deferred.resolve(result.data);
        }, function(error){
            deferred.reject(error);
        });
        return deferred.promise;
    }

    services.listAllLocations =  function(){
      var deferred = $q.defer();
        $http.get("/api/listAllLocations")
        .then(function(result){
          deferred.resolve(result.data);
        }, function(error){
            deferred.reject(error);
        });
        return deferred.promise;
    }

    services.createProject = function (project){
      var deferred = $q.defer();
      $http.post("/api/createProject", project). then(function(result){
          if(result.data.success){
            console.log(result.data);
            deferred.resolve(result.data.success);
          }
          else{
            deferred.reject(false);
          }
      }, function(error){
          console.log(error);
          deferred.reject(error);
      });
      return deferred.promise;
    }


    services.inviteProperty = function (data){
      var deferred = $q.defer();
      $http.post("/api/inviteProperty", data). then(function(result){
          if(result.data.success){
            console.log(result.data);
            deferred.resolve(result.data.success);
          }
          else{
            deferred.reject(false);
          }
      }, function(error){
          console.log(error);
          deferred.reject(error);
      });
      return deferred.promise;
    }

    return services;

});
