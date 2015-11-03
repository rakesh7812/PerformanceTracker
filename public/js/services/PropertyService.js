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

    function getValueArrayForPortfolioChart(monthKey,dataPosition,masterDetails,locations){
      var valueArray = [];
      masterDetails.map(function(eachMaster){
          var dataGrid  = eachMaster.data[1];
          valueArray.push({
            x:getLocationNameById(eachMaster.locationId,locations),
            y:dataGrid[dataPosition],
            key:monthKey
          });
      });
      return valueArray;
    }
    services.preparePerfByLocBarChartData =  function(masterDetails, locations){

        var result = [];
        var valueArray = [];

        valueArray = getValueArrayForPortfolioChart("Apr 2015",2,masterDetails,locations);
        result.push({
          key:"Apr 2015",
          values: valueArray
        });

        valueArray = getValueArrayForPortfolioChart("May 2015",3,masterDetails,locations);
        result.push({
          key:"May 2015",
          values: valueArray
        });

        valueArray = getValueArrayForPortfolioChart("Jun 2015",4,masterDetails,locations);
        result.push({
          key:"Jun 2015",
          values: valueArray
        });

        valueArray = getValueArrayForPortfolioChart("Jul 2015",5,masterDetails,locations);
        result.push({
          key:"Jul 2015",
          values: valueArray
        });

        valueArray = getValueArrayForPortfolioChart("Aug 2015",6,masterDetails,locations);
        result.push({
          key:"Aug 2015",
          values: valueArray
        });

        valueArray = getValueArrayForPortfolioChart("Sep 2015",7,masterDetails,locations);
        result.push({
          key:"Sep 2015",
          values: valueArray
        });

        valueArray = getValueArrayForPortfolioChart("Oct 2015",8,masterDetails,locations);
        result.push({
          key:"Oct 2015",
          values: valueArray
        });

        valueArray = getValueArrayForPortfolioChart("Nov 2015",9,masterDetails,locations);
        result.push({
          key:"Nov 2015",
          values: valueArray
        });

        valueArray = getValueArrayForPortfolioChart("Dec 2015",10,masterDetails,locations);
        result.push({
          key:"Dec 2015",
          values: valueArray
        });

        valueArray = getValueArrayForPortfolioChart("Jan 2016",11,masterDetails,locations);
        result.push({
          key:"Jan 2016",
          values: valueArray
        });

        valueArray = getValueArrayForPortfolioChart("Feb 2016",12,masterDetails,locations);
        result.push({
          key:"Feb 2016",
          values: valueArray
        });

        valueArray = getValueArrayForPortfolioChart("Mar 2016",13,masterDetails,locations);
        result.push({
          key:"Mar 2016",
          values: valueArray
        });

        return result;


    /*  return [
          {
            "key": "Jan 2015",
            "values": [
              {
                "x": "Sydney",
                "y": 1.3214710513106702,
                "key": "Jan 2015"
              },
              {
                "x": "India",
                "y": 1.531705920532457,
                "key": "Jan 2015"
              },
              {
                "x": "CA",
                "y": 1.696876610976657,
                "key": "Jan 2015"
              }
            ]
          },
          {
            "key": "Feb 2015",
            "values": [
              {
                "x": "Sydney",
                "y": 0.17641863846073996,
                "key": "Feb 2015"
              },
              {
                "x": "India",
                "y": 0.17857158941857948,
                "key": "Feb 2015"
              },
              {
                "x": "CA",
                "y": 0.20249790885884544,
                "key": "Feb 2015"
              }
            ]
          },
          {
            "key": "Mar 2015",
            "values": [
              {
                "x": "Sydney",
                "y": 0.100868280140793,
                "key": "Mar 2015"
              },
              {
                "x": "India",
                "y": 0.1682723549304544,
                "key": "Mar 2015"
              },
              {
                "x": "CA",
                "y": 0.12409694668585157,
                "key": "Mar 2015"
              }
            ]
          }
        ];*/
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
