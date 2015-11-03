angular.module('tracker.app.portfolio',[])
.controller('PortfolioListController', function($scope,$state,projectService,ngDialog,propertyService,$stateParams){
$scope.$parent.showLoader = true;
$scope.title = 'PortfolioListController';

$scope.init = function(){
    propertyService.getAllProjectMasterDetails()
    .then(function(result){
        $scope.projectDetails = result;
        $scope.$parent.showLoader = false;
    }, function(error){
      $scope.$parent.showLoader = false;
       ngDialog.open({
          template: '<p>Failed to fetch project details<p>'
      });
    });
}

$scope.init();


})
.controller('ProjectPortfolioDetailsController', function($scope,$state,projectService,ngDialog,propertyService,$stateParams){
$scope.$parent.showLoader = true;
$scope.title = 'ProjectPortfolioDetailsController';

$scope.init = function(){
    propertyService.getProjectDetailsForAllLocations($stateParams.projectId)
    .then(function(result){
        $scope.masterDetails = result.masterDetails;
        $scope.projectDetails = result.projectDetails;
        //get all locations - This has to based on selected project locations..TODO
        projectService.listAllLocationsFilterByProject($stateParams.projectId)
        .then(function(result){
            $scope.locations = result;

            $scope.data = getPortfolioChartData();
            $scope.$parent.showLoader = false;

        }, function(error){
          $scope.$parent.showLoader = false;
           ngDialog.open({
              template: '<p>Failed to fetch locations details..<p>'
          });
        });
    }, function(error){
       ngDialog.open({
          template: '<p>Failed to fetch project details for all locations..<p>'
      });
    });



}

$scope.init();

//***************Chart data starts here*************************

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
             stacked: true,
             xAxis: {
                 axisLabel: 'Month',
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

     function getPortfolioChartData(){
       return propertyService.preparePortfolioChartData($scope.masterDetails,$scope.locations);
     }

     //Chart data ends here

});
