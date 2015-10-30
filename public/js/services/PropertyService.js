angular.module('trackerapp.property.service',[]).factory('propertyService',function($http,$q, $window){

    var services = {};

    services.listAllLocationsByProject =  function(locationId){
      var deferred = $q.defer();
        $http.get("/api/listAllProjectsByLocation/"+locationId)
        .then(function(result){
          deferred.resolve(result.data);
        }, function(error){
            deferred.reject(error);
        });
        return deferred.promise;
    }

    services.getProjectDetailsByLocation =  function(locationId,projectId){
      var deferred = $q.defer();
        $http.get("/api/getProjectDetailsByLocation/"+locationId+"/"+projectId)
        .then(function(result){
          console.log(result);
          deferred.resolve(result.data);
        }, function(error){
            deferred.reject(error);
        });
        return deferred.promise;
    }

    services.updateMasterData = function (master){
      var deferred = $q.defer();
      $http.post("/api/updateMasterData", master). then(function(result){
          if(result.data.success){
          //  console.log(result.data);
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

    services.prepareChartData =  function(masterDetails,isTemplate1){
      var result = [];
      console.log(isTemplate1);
      if(isTemplate1){

          var data =  masterDetails.data[1];
          result.push({
              label: new Date(2015,3),
              value : data[2]
          });
          result.push({
              label: new Date(2015,4),
              value : data[3]
          });
          result.push({
              label: new Date(2015,5),
              value : data[4]
          });
          result.push({
              label: new Date(2015,6),
              value : data[5]
          });
          result.push({
              label: new Date(2015,7),
              value : data[6]
          });
          result.push({
              label: new Date(2015,8),
              value : data[7]
          });
          result.push({
              label: new Date(2015,9),
              value : data[8]
          });
          result.push({
              label: new Date(2015,10),
              value : data[9]
          });
          result.push({
              label: new Date(2015,11),
              value : data[10]
          });
          result.push({
              label: new Date(2016,0),
              value : data[11]
          });
          result.push({
              label: new Date(2016,1),
              value : data[12]
          });
          result.push({
              label: new Date(2016,2),
              value : data[13]
          });

      }
console.log(result);
    return result;

    }

    services.prepareChartBaseLineData =  function(masterDetails,isTemplate1){
      var result = [];
      if(isTemplate1){

          var data =  masterDetails.data[1];
          result.push({
              label: new Date(2015,3),
              value : data[1]
          });
          result.push({
              label: new Date(2015,4),
              value : data[1]
          });
          result.push({
              label: new Date(2015,5),
              value : data[1]
          });
          result.push({
              label: new Date(2015,6),
              value : data[1]
          });
          result.push({
              label: new Date(2015,7),
              value : data[1]
          });
          result.push({
              label: new Date(2015,8),
              value : data[1]
          });
          result.push({
              label: new Date(2015,9),
              value : data[1]
          });
          result.push({
              label: new Date(2015,10),
              value : data[1]
          });
          result.push({
              label: new Date(2015,11),
              value : data[1]
          });
          result.push({
              label: new Date(2016,0),
              value : data[1]
          });
          result.push({
              label: new Date(2016,1),
              value : data[1]
          });
          result.push({
              label: new Date(2016,2),
              value : data[1]
          });

      }

    return result;

    }


    return services;

});
