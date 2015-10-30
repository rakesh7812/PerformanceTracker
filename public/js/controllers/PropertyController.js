angular.module('tracker.app.property',[])
.controller('PropertyListController', function($scope,$state,projectService,ngDialog,propertyService){

$scope.title = 'PropertyListController';

$scope.init = function(){
  projectService.listAllLocations()
  .then(function(result){
      $scope.locations = result;
  }, function(error){
     ngDialog.open({
        template: '<p>Failed to fetch all locations..<p>'
    });
  });

  projectService.listAllProject()
  .then(function(result){
      $scope.projects = result;
  }, function(error){
     ngDialog.open({
        template: '<p>Failed to fetch all projects..<p>'
    });
  });
}

$scope.init();

})
.controller('PropertyController', function($scope,$state,projectService,ngDialog,propertyService,$stateParams){

$scope.title = 'PropertyController';

$scope.assignedProjects = null;

$scope.init = function(){
  //console.log("Location id is "+$stateParams.id);
  //console.log("$stateParams.name "+$stateParams.name);
  $scope.locationId = $stateParams.id;
  $scope.locationName =$stateParams.name;
  //get all projects by
  propertyService.listAllLocationsByProject($stateParams.id)
  .then(function(result){
      $scope.assignedProjects = result;
  }, function(error){
     ngDialog.open({
        template: '<p>Failed to fetch all projects..<p>'
    });
  });

}

$scope.init();


})
.controller('ProjectPerPropertyController', function($scope,$state,projectService,ngDialog,propertyService,$stateParams,$timeout,hotRegisterer){

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
          console.log($scope.isTemplate1);

        }
        else{
          $scope.isTemplate1 = false;
        }
        $scope.data = getChartData();

    }, function(error){
       ngDialog.open({
          template: '<p>Failed to fetch project details..<p>'
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
    //  var tableInstance = hotRegisterer.getInstance('handson-template-table');
      //var tableData = JSON.stringify(tableInstance.getData());
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

$scope.headerRendererBasicTemplate1 = function (instance, td, row, col, prop, value, cellProperties) {
    Handsontable.renderers.TextRenderer.apply(this, arguments);
    td.style.fontWeight = 'bold';
    td.style.textAlign = 'center';
    td.style.color = "#000";
  };

//new renderer
$scope.greyOutRendererTemplate1 = function (instance, td, row, col, prop, value, cellProperties) {
  Handsontable.renderers.TextRenderer.apply(this, arguments);
  td.style.backgroundColor = '#BDD7EE'
  td.style.fontWeight = 'bold';
  td.style.textAlign = 'center';
  td.style.color = "#000";
  cellProperties.type = 'numeric';
  cellProperties.format = '$0,0.00';
};

$scope.settingsTemplate1 = {
    height: 396,
    fixedRowsTop: 1,
    colHeaders: true,
    rowHeaders: true,
    formulas: true,
    comments: true,
    manualColumnResize:true,
    contextMenu : true,
    colWidths: [120, 100, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85,130],

    cells: function (row, col, prop) {
      var cellProperties = {};
      if (row === 0) {
        cellProperties.renderer = $scope.headerRendererBasicTemplate1;
      }
      if(col == 14 || row == 12){
      //  cellProperties.renderer = $scope.greyOutRenderer;
      }
      if (row == 0 || col == 14 || row == 12) {
        cellProperties.readOnly = true;
      }
      if(row==0 && col==14){
      //  cellProperties.renderer = $scope.greyOutRenderer;
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
  }


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
               tableInstance.updateSettings({formulas: true});
               tableInstance.render();
               },10);



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
