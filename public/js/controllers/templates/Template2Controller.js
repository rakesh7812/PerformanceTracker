angular.module('tracker.app.template2',[]).controller('Template2Controller', function($scope,$state,hotRegisterer,$timeout){

$scope.title = 'Template2Controller';
$scope.init = function () {
    //console.log("parent scope "+$scope.parent.selectedTemplate);
    //$scope.parent.selectedTemplate = "test1"
    //$scope.$parent.child = $scope;
    $scope.$parent.setCurrentChildScope($scope);
}

$scope.init();
//Setup for basic-template-1
//*************************************************************************
$scope.dataTemplateBasic = [
  ["Hotel Name", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "YTD Total", "Q1 Total", "Q2 Total", "Q3 Total", "Q4 Total"],
  ["","","","","","","","","","","","","","","","","","",""],
  ["Total Room Nights","","","","","","","","","","","","","","","","","",""],
  ["# Upsell Room Nights","","","","","","","","","","","","","","","","","",""],
  ["Conversion %","","","","","","","","","","","","","","","","","",""],
  ["","","","","","","","","","","","","","","","","","",""],
  ["Total Room Revenue","","","","","","","","","","","","","","","","","",""],
  ["Upsell Revenue","","","","","","","","","","","","","","","","","",""],
  ["% Upsell Revenue","","","","","","","","","","","","","","","","","",""],
  ["","","","","","","","","","","","","","","","","","",""],
  ["Total ADR","","","","","","","","","","","","","","","","","",""],
  ["Upsell ADR Lift","","","","","","","","","","","","","","","","","",""],
  ["% ADR Lift","","","","","","","","","","","","","","","","","",""],
  ["Per Room Avd Upsell Amount","","","","","","","","","","","","","","","","","",""],
  ["","","","","","","","","","","","","","","","","","",""],
  ["Incentives Paid","","","","","","","","","","","","","","","","","",""],
  ["% Payout","","","","","","","","","","","","","","","","","",""],
  ["Agent Hours","","","","","","","","","","","","","","","","","",""],
  ["$ Increase in Hourly Wage","","","","","","","","","","","","","","","","","",""]
];

$scope.headerRendererBasic = function (instance, td, row, col, prop, value, cellProperties) {
    Handsontable.renderers.TextRenderer.apply(this, arguments);
    td.style.fontWeight = 'bold';
    td.style.textAlign = 'center';
    td.style.color = "#000";
  };

//new renderer
$scope.greyOutRenderer = function (instance, td, row, col, prop, value, cellProperties) {
  Handsontable.renderers.TextRenderer.apply(this, arguments);
  td.style.backgroundColor = '#BDD7EE'
  td.style.fontWeight = 'bold';
  td.style.textAlign = 'center';
  td.style.color = "#000";
  cellProperties.type = 'numeric';
  cellProperties.format = '$0,0.00';
};

$scope.settingsTemplateBasic = {
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
        cellProperties.renderer = $scope.headerRendererBasic;
      }
      if(col == 14 || row == 12){
      //  cellProperties.renderer = $scope.greyOutRenderer;
      }
      if (row == 0 || col == 0) {
        cellProperties.readOnly = true;
        cellProperties.renderer = $scope.headerRendererBasic;
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

  $timeout(function(){
    var tableInstance = hotRegisterer.getInstance('handsonTemplateBasic');
               tableInstance.updateSettings({formulas: true});
               tableInstance.render();
               },10);

//***********Ending Basic template *****************

});
