angular.module('trackerapp.property.service',[]).factory('propertyService',function($http,$q, $window){

    var services = {};


    services.getAllProjectMasterDetails =  function(){
      var deferred = $q.defer();
        $http.get("/api/getAllProjectMasterDetails")
        .then(function(result){
          deferred.resolve(result.data);
        }, function(error){
            deferred.reject(error);
        });
        return deferred.promise;
    }

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
          //console.log(result);
          deferred.resolve(result.data);
        }, function(error){
            deferred.reject(error);
        });
        return deferred.promise;
    }

    services.getProjectDetailsForAllLocations =  function(projectId){
      var deferred = $q.defer();
        $http.get("/api/getProjectDetailsForAllLocations/"+projectId)
        .then(function(result){
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

    function getLocationNameById(locationId, locations){
      var locName;
        locations.map(function(loc){
            if(angular.equals(locationId,loc._id)){
              locName = loc.name;
            }
        });
        return locName;
    }

    services.preparePortfolioChartData =  function(masterDetails, locations){

      var result = [];

      masterDetails.map(function(eachMaster){
        var locationKey = getLocationNameById(eachMaster.locationId, locations);
        var valuesArray = []
        var dataGrid  = eachMaster.data[1];

        valuesArray.push({
          x: "Apr 2015",
          y: dataGrid[2],
          key: locationKey
        });

        valuesArray.push({
          x: "May 2015",
          y: dataGrid[3],
          key: locationKey
        });
        valuesArray.push({
          x: "Jun 2015",
          y: dataGrid[4],
          key: locationKey
        });
        valuesArray.push({
          x: "Jul 2015",
          y: dataGrid[5],
          key: locationKey
        });
        valuesArray.push({
          x: "Aug 2015",
          y: dataGrid[6],
          key: locationKey
        });
        valuesArray.push({
          x: "Sep 2015",
          y: dataGrid[7],
          key: locationKey
        });
        valuesArray.push({
          x: "Oct 2015",
          y: dataGrid[8],
          key: locationKey
        });
        valuesArray.push({
          x: "Nov 2015",
          y: dataGrid[9],
          key: locationKey
        });
        valuesArray.push({
          x: "Dec 2015",
          y: dataGrid[10],
          key: locationKey
        });
        valuesArray.push({
          x: "Jan 2016",
          y: dataGrid[11],
          key: locationKey
        });
        valuesArray.push({
          x: "Feb 2016",
          y: dataGrid[12],
          key: locationKey
        });
        valuesArray.push({
          x: "Mar 2016",
          y: dataGrid[13],
          key: locationKey
        });
        result.push({
          key:locationKey,
          values:valuesArray
        });

      });
      return result;

    }

    services.prepareChartData =  function(masterDetails,isTemplate1){
      var result = [];
      //console.log(isTemplate1);
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
//console.log(result);
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
