angular.module('tracker.app.property',[])
.controller('ProjectForAllPropertyController', function($scope,$state,projectService,ngDialog,propertyService,$stateParams,$filter){
$scope.$parent.showLoader = true;
$scope.title = 'ProjectForAllPropertyController';

$scope.init = function(){
    propertyService.getProjectDetailsForAllLocations($stateParams.projectId)
    .then(function(result){
        $scope.masterDetails = result.masterDetails;
        $scope.projectDetails = result.projectDetails;
        //get all locations - This has to based on selected project locations..TODO
        projectService.listAllLocationsFilterByProject($stateParams.projectId)
        .then(function(result){
            $scope.locations = result;

            $scope.data = getBarChartData();
            $scope.$parent.showLoader = false;

        }, function(error){
          $scope.$parent.showLoader = false;
           ngDialog.open({
              template: '<p>Failed to fetch locations details..<p>'
          });
        });
    }, function(error){
      $scope.$parent.showLoader = false;
       ngDialog.open({
          template: '<p>Failed to fetch project details for all locations..<p>'
      });
    });

}

$scope.init();

//***********Chart data goes here***********

//$scope.labels = ['Apr 2015', 'May 2015', 'Jun 2015', 'Jul 2015', 'Aug 2015', 'Sep 2015', 'Oct 2015', "Nov 2015","Dec 2015", "Jan 2016", "Feb 2016". "Mar 2016"];


$scope.options = {
         chart: {
             type: 'multiBarChart',
             height: 450,
             margin : {
                 top: 20,
                 right: 20,
                 bottom: 45,
                 left: 45
             },
             clipEdge: true,
             //staggerLabels: true,
             transitionDuration: 500,
             stacked: false,
             xAxis: {
                 axisLabel: 'Property',
                 showMaxMin: false,
                 tickFormat: function(d){

                     return d;
                 }
             },
             yAxis: {
                 axisLabel: 'Revenue',
                 axisLabelDistance: -20,
                 tickFormat: function(d){
                     return d3.format(',.1f')(d);
                 }
             }
         }
     };


//$scope.series = ['Apr 2015', 'May 2015', 'Jun 2015', 'Jul 2015', 'Aug 2015', 'Sep 2015', 'Oct 2015', 'Nov 2015','Dec 2015', 'Jan 2016', 'Feb 2016', 'Mar 2016'];

  /*function getBarChartLabels(){
    var labels = [];
    $scope.masterDetails.map(function(eachMaster){
        var locName = getLocationNameById(eachMaster.locationId);
        labels.push(locName);
    });
    return labels;
  }*/

  /*function getLocationNameById(locationId){
    var locName;
      $scope.locations.map(function(loc){
          if(angular.equals(locationId,loc._id)){
            locName = loc.name;
          }
      });
      return locName;
  }*/

  function getBarChartData(){
    return propertyService.preparePerfByLocBarChartData($scope.masterDetails, $scope.locations);
  }

  /*function getBarChartData1(){
    var result = [];

    for(var i=2; i<=13;i++){
      var dataArray = [];
      $scope.masterDetails.map(function(eachMaster){
        var dataGrid = eachMaster.data[1];
        //push jan data of all masters in first array
        dataArray.push(dataGrid[i]);
      });
      result.push(dataArray);
    }

    $scope.labels = getBarChartLabels();
    return result;

  }
*/

//************Chart data ends here


})
.controller('PropertyListController', function($scope,$state,projectService,ngDialog,propertyService){

$scope.title = 'PropertyListController';

$scope.$parent.showLoader = true;

$scope.init = function(){
  projectService.listAllLocations()
  .then(function(result){
      $scope.locations = result;
  }, function(error){
      $scope.$parent.showLoader = false;
     ngDialog.open({
        template: '<p>Failed to fetch all locations..<p>'
    });
  });

  projectService.listAllProject()
  .then(function(result){
      $scope.projects = result;
      $scope.$parent.showLoader = false;
  }, function(error){
    $scope.$parent.showLoader = false;
     ngDialog.open({
        template: '<p>Failed to fetch all projects..<p>'
    });
  });


}

$scope.init();

})
.controller('PropertyController', function($scope,$state,projectService,ngDialog,propertyService,$stateParams){

$scope.title = 'PropertyController';
$scope.$parent.showLoader = true;

$scope.assignedProjects = null;

$scope.init = function(){
  $scope.locationId = $stateParams.id;
  $scope.locationName =$stateParams.name;
  //get all projects by
  propertyService.listAllLocationsByProject($stateParams.id)
  .then(function(result){
      $scope.assignedProjects = result;
      $scope.$parent.showLoader = false;
  }, function(error){
    $scope.$parent.showLoader = false;
     ngDialog.open({
        template: '<p>Failed to fetch all projects..<p>'
    });
  });

}

$scope.init();


})
.controller('ProjectPerPropertyController', function($scope,$state,projectService,ngDialog,propertyService,$stateParams,$timeout,hotRegisterer){
$scope.$parent.showLoader = true;
  $scope.title = 'ProjectPerPropertyController';
  $scope.init = function(){
    $scope.locationId = $stateParams.locationId;
    $scope.projectId =$stateParams.projectId;
    //get project details passing projectId and locationId
    propertyService.getProjectDetailsByLocation($scope.locationId,$scope.projectId)
    .then(function(result){
        $scope.projectDetails = result.projectDetails;
        $scope.masterDetails = result.masterDetails;
        $scope.locationDetails = result.locationDetails;
        if($scope.projectDetails.templateName == "Increase Revenue w/ baseline") {
          $scope.isTemplate1 = true;
        }
        else{
          $scope.isTemplate1 = false;
        }
        $scope.data = getChartData();

        $scope.$parent.showLoader = false;

    }, function(error){
      $scope.$parent.showLoader = false;
       ngDialog.open({
          template: '<p>Failed to fetch project dailetails..<p>'
      });
    });

    //get all projects in that location and populate in drop down
    propertyService.listAllLocationsByProject($scope.locationId)
    .then(function(result){
        $scope.projectList = result;
    }, function(error){
       ngDialog.open({
          template: '<p>Failed to fetch all projects..<p>'
      });
    });

  }
  $scope.showSpinner = false;

  $scope.saveData = function(){
    //get total revenue evaluating formula
      var tableInstance = hotRegisterer.getInstance('handson-template-table');
      //var tableData = JSON.stringify(tableInstance.getData());
      var item = tableInstance.plugin.matrix.getItem(tableInstance.plugin.utils.translateCellCoords({row: 1, col: 14}));
      var newValue = tableInstance.plugin.parse(item.formula, {row: 1, col: 14, id: tableInstance.plugin.utils.translateCellCoords({row: 1, col: 14})});
      //console.log(newValue.result);
      $scope.masterDetails.totalRevenue = newValue.result;

    $scope.showSpinner = true;
    propertyService.updateMasterData($scope.masterDetails)
    .then(function(result){
      $scope.showSpinner = false;
      $scope.data = getChartData();
      ngDialog.open({
         template: '<p>Data saved successfully<p>'
     });
    }, function(error){
       ngDialog.open({
          template: '<p>Failed to save data..<p>'
      });
    });
  }


//code for handson table template1 starts here

$scope.headerRendererBasic1 = function (instance, td, row, col, prop, value, cellProperties) {
    Handsontable.renderers.TextRenderer.apply(this, arguments);
    td.style.fontWeight = 'bold';
    td.style.textAlign = 'center';
    td.style.color = "#000";
  };

//new renderer
$scope.greyOutRenderer1 = function (instance, td, row, col, prop, value, cellProperties) {
  Handsontable.cellTypes['formula'].renderer.apply(this, arguments);
  td.style.backgroundColor = '#D9DDDE'
  cellProperties.type = 'numeric';
  cellProperties.format = '$0,0.00';
  td.style.fontWeight = ((col == 14 && row==0) ? 'bold' : 'normal');
  if(col == 14 && row==0){
    td.style.color="#000"
  }

};

$scope.greyOutHeaderRenderer1 = function (instance, td, row, col, prop, value, cellProperties) {
  Handsontable.renderers.TextRenderer.apply(this, arguments);
  td.style.backgroundColor = '#5C9096';
  td.style.color="#FFF";
  td.style.fontWeight  = 'normalgoo';
};

$scope.dataCellRenderer1 = function (instance, td, row, col, prop, value, cellProperties) {
  Handsontable.cellTypes['formula'].renderer.apply(this, arguments);
  td.style.backgroundColor = "#DFEDF5";
  //'#C3EAF7';
  cellProperties.type = 'numeric';
  cellProperties.format = '$0,0.00';

};

$scope.settingsTemplate1 = {
    height: 350,
    colHeaders: false,
    stretchH: 'all',
    fixedRowsTop: 0,
    rowHeaders: false,
    formulas: true,
    comments: true,
    manualColumnResize:true,
    contextMenu : true,
    colWidths: [120, 100, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85,130],

    cells: function (row, col, prop) {
      var cellProperties = {};
      if (row === 0) {
        cellProperties.renderer = $scope.headerRendererBasic1;
      }
      if(col == 14 || row == 12){
        cellProperties.renderer = $scope.greyOutRenderer1;
      }
      if (row == 0 || col == 14 || row == 12) {
        cellProperties.readOnly = true;
      }
      if(row==0){
        cellProperties.renderer = $scope.greyOutHeaderRenderer1;
      }
      if(row!=0 && row !=12){
        if(col>=2 && col<=13){
          cellProperties.renderer = $scope.dataCellRenderer1;
        }
      }


      if(row>=1){
        cellProperties.type = 'numeric';
        cellProperties.format = '$0,0.00';
      }
      if(row >=1 && col==0){
        cellProperties.type = 'date';
        cellProperties.format = 'MM/dd/YYYY';
      }
      //cellProperties.readOnly = true;
      return cellProperties;
    }
  };


//*****************Ends*********************

//**************Template2 starts here
$scope.headerRendererBasicTemplate2 = function (instance, td, row, col, prop, value, cellProperties) {
    Handsontable.renderers.TextRenderer.apply(this, arguments);
    td.style.fontWeight = 'bold';
    td.style.textAlign = 'center';
    td.style.color = "#000";
  };

//new renderer
$scope.greyOutRendererTemplate2 = function (instance, td, row, col, prop, value, cellProperties) {
  Handsontable.renderers.TextRenderer.apply(this, arguments);
  td.style.backgroundColor = '#BDD7EE'
  td.style.fontWeight = 'bold';
  td.style.textAlign = 'center';
  td.style.color = "#000";
  cellProperties.type = 'numeric';
  cellProperties.format = '$0,0.00';
};

$scope.settingsTemplate2 = {
    height: 396,
    fixedRowsTop: 1,
    colHeaders: true,
    rowHeaders: true,
    formulas: true,
    comments: true,
    manualColumnResize:true,
    contextMenu : true,
    colWidths: [180, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 100,100,100,100,100],

    cells: function (row, col, prop) {
      var cellProperties = {};
      if (row === 0) {
        cellProperties.renderer = $scope.headerRendererBasicTemplate2;
      }
      if(col == 14 || row == 12){
      //  cellProperties.renderer = $scope.greyOutRenderer;
      }
      if (row == 0 || col == 0) {
        cellProperties.readOnly = true;
        cellProperties.renderer = $scope.headerRendererBasicTemplate2;
      }
      if(row==0 && col==14){
      //  cellProperties.renderer = $scope.greyOutRenderer;
      }
      if(row>=1){
        cellProperties.type = 'numeric';
        cellProperties.format = '$0,0.00';
      }

      //cellProperties.readOnly = true;
      return cellProperties;
    }
  };

//********************Template2 ends

  $scope.init();

  $timeout(function(){
    var tableInstance = hotRegisterer.getInstance('handson-template-table');
               tableInstance.updateSettings($scope.settingsTemplate1);
               tableInstance.render();
             },500);



//**************Chart program code starts here*****************
$scope.options = {
            chart: {
                type: 'lineChart',

                height: 450,
                margin : {
                    right: 40
                },
                x: function(d){ return d.label; },
                y: function(d){ return d.value; },
                useInteractiveGuideline: true,
                dispatch: {
                    stateChange: function(e){ console.log("stateChange"); },
                    changeState: function(e){ console.log("changeState"); },
                    tooltipShow: function(e){ console.log("tooltipShow"); },
                    tooltipHide: function(e){ console.log("tooltipHide"); }
                },
                xAxis: {
                    axisLabel: 'Month',
                    tickFormat: function(d) {
                        return d3.time.format('%b-%Y')(new Date(d))
                    },
                    //rotateLabels : -45,
                    showMaxMin: true
                },
                yAxis: {
                    axisLabel: 'Revenue'
                },
                callback: function(chart){
                    console.log("!!! lineChart callback !!!");
                }
            },
            title: {
                enable: true,
                text: 'Performance revenue chart w/ Baseline'
            }

        };




      function getChartData() {

       return [
           {
              // values: dataValues,      //values - represents the array of {x,y} data points
              values : propertyService.prepareChartData($scope.masterDetails,$scope.isTemplate1),
               key: 'Revenue', //key  - the name of the series.
               color: '#ff7f0e'  //color - optional: choose your own line color.
           },
           {
               //values: baseLineDataValues,      //values - represents the array of {x,y} data points
               values:propertyService.prepareChartBaseLineData($scope.masterDetails,$scope.isTemplate1),
               key: 'Baseline', //key  - the name of the series.
               color: 'blue'  //color - optional: choose your own line color.
           }
       ];

      }


//**************Chart program code ends here*****************

});
