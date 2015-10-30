angular.module('tracker.app.project.inviteproperty',[]).controller('InvitePropertyController', function($scope,$state,projectService,ngDialog){

$scope.title = 'InvitePropertyController';

$scope.example7settings = {externalIdProp: ''};

$scope.locations = [];

$scope.selectedLocations = [];

$scope.message = null;

$scope.propertySettings = {
    scrollableHeight: '400px',
    scrollable: true,
    enableSearch: true,
    externalIdProp: '',
    displayProp: 'name',
    idProp: '_id'
};

$scope.init = function(){



  projectService.listAllLocationsByProject($scope.$parent.currentProjectId)
  .then(function(result){
      $scope.locations = result;
  }, function(error){
     ngDialog.open({
        template: '<p>Failed to fetch all locations..<p>'
    });
  });
}

$scope.init();

$scope.inviteProperty =  function(){
  var inviteProperty = {
    projectId : $scope.$parent.currentProjectId,
    locations : $scope.selectedLocations,
    templateName : $scope.$parent.currentProjectTemplateName,
    message : $scope.message
  };
  var json = angular.toJson(inviteProperty);
  ngDialog.closeAll();
  projectService.inviteProperty(json)
  .then(function(result){
    ngDialog.open({
       template: '<p>Successfully Invited<p>'
   });
  }, function(error){
     ngDialog.open({
        template: '<p>Failed to invite properties..<p>'
    });
  });


}


})

//Properties Invited controller
.controller('PropertiesInvitedController', function($scope,$state,projectService,ngDialog){

$scope.title = 'PropertiesInvitedController';

$scope.locations = [];
$scope.currentProjectName = null;

$scope.init = function(){
  $scope.currentProjectName = $scope.$parent.currentProjectName;
  projectService.listAllLocationsFilterByProject($scope.$parent.currentProjectId)
  .then(function(result){
      $scope.locations = result;
      if(result.length <=0){
        $scope.noLocations = true;
      }
      else{
        $scope.noLocations = false;
      }

  }, function(error){
     ngDialog.open({
        template: '<p>Failed to fetch locations..<p>'
    });
  });
}

$scope.init();

});
