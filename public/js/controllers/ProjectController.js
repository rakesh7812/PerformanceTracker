angular.module('tracker.app.project',[]).controller('ProjectListController', function($scope,$state,projectService,ngDialog){

$scope.title = 'ProjectListController';

$scope.$parent.showLoader = true;

$scope.allProjects = null;

$scope.init = function(){
  projectService.listAllProject()
  .then(function(result){
      $scope.allProjects = result;
      $scope.$parent.showLoader = false;
  }, function(error){
      $scope.$parent.showLoader = false;
     ngDialog.open({
        template: '<p>Failed to fetch all projects..<p>'
    });
  });
}

$scope.init();

$scope.showInviteProperty =  function(projectId, projectName,templateName){
  $scope.currentProjectId = projectId;
  $scope.currentProjectName = projectName;
  $scope.currentProjectTemplateName = templateName;
  ngDialog.open({
    template: 'template-invite-property',
    plain:false,
    className: 'ngdialog-theme-mine',
    controller : "InvitePropertyController",
    scope : $scope
   });
}

$scope.showPropertiesInvited =  function(projectId, projectName){
  $scope.currentProjectId = projectId;
  $scope.currentProjectName = projectName;
  ngDialog.open({
    template: 'template-properties-invited',
    plain:false,
    //className: 'ngdialog-theme-mine',
    controller : "PropertiesInvitedController",
    scope : $scope
   });
}


})

.controller('ProjectController', function($scope,$state,hotRegisterer,$timeout,projectService,ngDialog){

$scope.showSpinner = false;

$scope.title = 'ProjectController';

var spinningClass = "glyphicon glyphicon-refresh spinning";

$scope.project = {};

$scope.assignTemplate = function(template){
  $scope.project.templateName = template
}

$scope.setCurrentChildScope = function (childScope) {
    $scope.childScope = childScope;
}

$scope.saveProject = function(){
  $scope.project.templateData = $scope.childScope.dataTemplateBasic;
 $scope.showSpinner = true;
  projectService.createProject($scope.project)
  .then(function(result){
      $state.go("home.project");
  }, function(error){
     ngDialog.open({
        template: '<p>Failed to save project..<p>'
    });
  });
}








$scope.settings = {contextMenu:true, autoColumnSize: {syncLimit: 300},rowHeaders:true,colHeaders:true,minSpareRows:1,
minCols:5,minRows:3,autoRowSize: {syncLimit: 300},autoWrapCol:true,autoWrapRow:true,copyable:true,copyPaste:true,
manualColumnResize:true,manualColumnMove:true,manualRowMove:true,manualRowResize:true,mergeCells:true,
multiSelect:true,outsideClickDeselects:true,wordWrap:true,formulas:true};

$scope.hiData = Handsontable.helper.createSpreadsheetData(2,2);

$scope.items = [
  {
    "id": 1,
    "name": {
      "first": "John",
      "last": "Schmidt"
    },
    "address": "45024 France",
    "price": 760.41,
    "isActive": "Yes",
    "product": {
      "description": "Fried Potatoes",
      "options": [
        {
          "description": "Fried Potatoes",
          "image": "//a248.e.akamai.net/assets.github.com/images/icons/emoji/fries.png"
        },
        {
          "description": "Fried Onions",
          "image": "//a248.e.akamai.net/assets.github.com/images/icons/emoji/fries.png"
        }
      ]
    }
  },
  //more items go here

];
//this table goes in notes section
//handsontable for real template

$timeout(function(){
  var tableInstance = hotRegisterer.getInstance('my-handsontable');
             tableInstance.updateSettings({formulas: true});
             tableInstance.render();
             },10);

$scope.headerRenderer = function (instance, td, row, col, prop, value, cellProperties) {
    Handsontable.renderers.TextRenderer.apply(this, arguments);
    td.style.fontWeight = 'bold';
    td.style.textAlign = 'center';
  };
  $scope.diffRenderer = function (instance, td, row, col, prop, value, cellProperties) {
  Handsontable.cellTypes['formula'].renderer.apply(this, arguments);
  //Handsontable.renderers.NumericRenderer.apply(this, arguments);
    td.style.backgroundColor = '#c3f89c';
    td.style.fontWeight = (col === 13 ? 'bold' : 'normal');
  };

   $scope.incomeOrExpensesRenderer = function (instance, td, row, col, prop, value, cellProperties) {
    Handsontable.renderers.TextRenderer.apply(this, arguments);
    td.style.fontWeight = 'bold';
    td.style.textAlign = 'left';
    td.style.backgroundColor = '#BDD7EE'
  };

  $scope.boldAndAlignRenderer = function (instance, td, row, col, prop, value, cellProperties) {
    Handsontable.renderers.TextRenderer.apply(this, arguments);
    td.style.fontWeight = 'bold';
    td.style.verticalAlign = 'middle';
    td.style.textAlign = 'left';
  };

  $scope.personalData = [
    ["","JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC","Total"],
    ["Total Incomes","=SUM(B7:B12)","=SUM(C7:C12)","=SUM(D7:D12)","=SUM(E7:E12)","=SUM(F7:F12)","=SUM(G7:G12)","=SUM(H7:H12)","=SUM(I7:I12)","=SUM(J7:J12)","=SUM(K7:K12)","=SUM(L7:L12)","=SUM(M7:M12)","=SUM(B2:M2)"],
    ["Total Expenses","=SUM(B17:B43)","=SUM(C17:C43)","=SUM(D17:D43)","=SUM(E17:E43)","=SUM(F17:F43)","=SUM(G17:G43)","=SUM(H17:H43)","=SUM(I17:I43)","=SUM(J17:J43)","=SUM(K17:K43)","=SUM(L17:L43)","=SUM(M17:M43)","=SUM(B3:M3)"],
    ["NET (Income - Expenses)",'=B2-B3',"=C2-C3","=D2-D3","=E2-E3","=F2-F3","=G2-G3","=H2-H3","=I2-I3","=J2-J3","=K2-K3","=L2-L3","=M2-M3","=N2-N3", ""],
    ["","","","","","","","","","","","","",""],
    ["Income","","","","","","","","","","","","",""],
    ["Salary",11370,11370,11370,11370,11370,11370,11370,11370,11370,11370,11370,11370,""],
    ["Interest income",56,56,56,56,56,56,56,56,56,56,56,56,""],
    ["Public assistance","-  ","-  ","-  ","-  ","-  ","-  ","-  ","-  ","-  ","-  ","-  ","-  ",""],
    ["Dividends","-  ","-  ","-  ","-  ","-  ","-  ","-  ","-  ","-  ","-  ","-  ","-  ",""],
    ["Gifts",300,300,300,300,300,300,300,300,300,300,300,300,""],
    ["Other",1200,1200,1200,1200,1200,1200,1200,1200,1200,1200,1200,1200,""],
    ["","","","","","","","","","","","","",""],
    ["Expenses","","","","","","","","","","","","",""],
    ["Living","","","","","","","","","","","","",""],
    ["","","","","","","","","","","","","",""],
    ["Rent/Mortgage",3200,3200,3200,3200,3200,3200,3200,3200,3200,3200,3200,3200,""],
    ["Electricity",160,160,160,160,160,160,160,160,160,160,160,160,""],
    ["Water/Gas/Sewer",80,80,80,80,80,80,80,80,80,80,80,80,""],
    ["TV/Internet/Phone",50,50,50,50,50,50,50,50,50,50,50,50,""],
    ["Maintenance",260,260,260,260,260,260,260,260,260,260,260,260,""],
    ["Obligations","","","","","","","","","","","","",""],
    ["","","","","","","","","","","","","",""],
    ["Loans",1500,1500,1500,1500,1500,1500,1500,1500,1500,1500,1500,1500,""],
    ["Credit cards",120,120,120,120,120,120,120,120,120,120,120,120,""],
    ["Taxes","450","450","450","450","450","450","450","450","450","450","450","450",""],
    ["Insurance","140","140","140","140","140","140","140","140","140","140","140","140",""],
    ["Daily expenses","","","","","","","","","","","","",""],
    ["","","","","","","","","","","","","",""],
    ["Food",1200,1200,1200,1200,1200,1200,1200,1200,1200,1200,1200,1200,""],
    ["Clothing",350,350,350,350,350,350,350,350,350,350,350,350,""],
    ["Personal supplies",120,120,120,120,120,120,120,120,120,120,120,120,""],
    ["Health care",320,320,320,320,320,320,320,320,320,320,320,320,""],
    ["Education",540,540,540,540,540,540,540,540,540,540,540,540,""],
    ["Entertainment",210,210,210,210,210,210,210,210,210,210,210,210,""],
    ["Transportation",220,220,220,220,220,220,220,220,220,220,220,220,""],
    ["Other","","","","","","","","","","","","",""],
    ["","","","","","","","","","","","","",""],
    ["Donations",80,80,80,80,80,80,80,80,80,80,80,80,""],
    ["Savings",500,500,500,500,500,500,500,500,500,500,500,500,""],
    ["Gifts",200,200,200,200,200,200,200,200,200,200,200,200,""],
    ["Retirement",800,800,800,800,800,800,800,800,800,800,800,800,""],
    ["Other",150,150,150,150,150,150,150,150,150,150,150,150,""]
  ];


$scope.settingsnew = {
    height: 396,
    fixedRowsTop: 1,
    colHeaders: true,
    rowHeaders: true,
    formulas: true,
    comments: true,
    colWidths: [200, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85],

    cells: function (row, col, prop) {
      var cellProperties = {};

      if (row === 0) {
        cellProperties.renderer = $scope.headerRenderer;
      } else if (row === 3) {
        cellProperties.renderer = this.diffRenderer;
      } else if (row === 5) {
        cellProperties.renderer = $scope.incomeOrExpensesRenderer;
      } else if (row === 13) {
        cellProperties.renderer = $scope.incomeOrExpensesRenderer;
      } else if (row === 14) {
        cellProperties.renderer = $scope.boldAndAlignRenderer;
      } else if (row === 21) {
        cellProperties.renderer = $scope.boldAndAlignRenderer;
      } else if (row === 27) {
        cellProperties.renderer = $scope.boldAndAlignRenderer;
      } else if (row === 36) {
        cellProperties.renderer = $scope.boldAndAlignRenderer;
      }

      if ([1, 2, 3].indexOf(row) !== -1 && col >= 1) {
        cellProperties.readOnly = true;
      }

      if ([1, 2, 3, 6, 7, 8, 9, 10, 11, 16, 17, 18, 19, 20, 23, 24, 25, 26, 29, 30, 31, 32, 33, 34, 35, 38, 39, 40, 41, 42].indexOf(row) !== -1 && col >= 1) {
        cellProperties.type = 'numeric';
        cellProperties.format = '$0,0.00';
      }

      return cellProperties;
    },
    mergeCells: [
      {row: 5, col: 0, rowspan: 1, colspan: 14},
      {row: 13, col: 0, rowspan: 1, colspan: 14},
      {row: 14, col: 0, rowspan: 2, colspan: 14},
      {row: 21, col: 0, rowspan: 2, colspan: 14},
      {row: 27, col: 0, rowspan: 2, colspan: 14},
      {row: 36, col: 0, rowspan: 2, colspan: 14}
    ]
  };



});
