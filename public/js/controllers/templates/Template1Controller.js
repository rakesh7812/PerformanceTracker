angular.module('tracker.app.template1',[]).controller('Template1Controller', function($scope,$state,hotRegisterer,$timeout){

  $scope.init = function () {
      //console.log("parent scope "+$scope.parent.selectedTemplate);
      //$scope.parent.selectedTemplate = "test1"
  $scope.$parent.setCurrentChildScope($scope);
  }

  $scope.init();

$scope.title = 'Template1Controller';

//Setup for basic-template
//*************************************************************************
$scope.dataTemplateBasic = [
  ["Implementation Date", "Baseline Performance", "*START APR 15", "May 15", "Jun 15", "Jul 15", "Aug 15", "Sep 15", "Oct 15", "Nov 15", "Dec 15", "Jan 16", "Feb 16", "Mar 16", "Rolling 12 Month Impact"],
  ["","","","","","","","","","","","","","","=SUM(C2:N2)"],
  ["","","","","","","","","","","","","","","=SUM(C3:N3)"],
  ["","","","","","","","","","","","","","","=SUM(C4:N4)"],
  ["","","","","","","","","","","","","","","=SUM(C5:N5)"],
  ["","","","","","","","","","","","","","","=SUM(C6:N6)"],
  ["","","","","","","","","","","","","","","=SUM(C7:N7)"],
  ["","","","","","","","","","","","","","","=SUM(C8:N8)"],
  ["","","","","","","","","","","","","","","=SUM(C9:N9)"],
  ["","","","","","","","","","","","","","","=SUM(C10:N10)"],
  ["","","","","","","","","","","","","","","=SUM(C11:N11)"],
  ["","","","","","","","","","","","","","","=SUM(C12:N12)"],
  ["","=SUM(B2:B12)","=SUM(C2:C12)","=SUM(D2:D12)","=SUM(E2:E12)","=SUM(F2:F12)","=SUM(G2:G12)","=SUM(H2:H12)","=SUM(I2:I12)","=SUM(J2:J12)","=SUM(K2:K12)","=SUM(L2:L12)","=SUM(M2:M12)","=SUM(N2:N12)","=SUM(O2:O12)"]
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
    colWidths: [120, 100, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85,130],

    cells: function (row, col, prop) {
      var cellProperties = {};
      if (row === 0) {
        cellProperties.renderer = $scope.headerRendererBasic;
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
  };

  $timeout(function(){
    var tableInstance = hotRegisterer.getInstance('handsonTemplateBasic');
               tableInstance.updateSettings({formulas: true});
               tableInstance.render();
               },10);

//***********Ending Basic template *****************

});
