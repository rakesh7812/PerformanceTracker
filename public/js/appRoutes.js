angular.module('appRoutes',[]).config(['$stateProvider','$urlRouterProvider','$locationProvider','$httpProvider',
function($stateProvider,$urlRouterProvider,$locationProvider,  $httpProvider){

          $httpProvider.interceptors.push('APIInterceptor');

          $urlRouterProvider.otherwise("login");

          $stateProvider
          .state('login', {
            url: "/login",
            templateUrl: "views/main/login.html"
          })
          .state('home', {
            url: "/home",
            templateUrl: "views/main/home.html"
          })
          .state('home.project', {
                url: "^/project",
                templateUrl: "views/main/project.html",
                controller :"ProjectListController"
          })
          .state('home.createProject', {
                url: "^/project/create",
                templateUrl: "views/main/createProject.html",
                controller :"ProjectController"
          })
          .state('home.createProject.template1', {
                url: "^/project/create/template1",
                templateUrl: "views/main/templates/projectTemplate.html",
                controller :"Template1Controller"
          })
          .state('home.createProject.template2', {
                url: "^/project/create/template2",
                templateUrl: "views/main/templates/projectTemplate.html",
                controller :"Template2Controller"
          })
          .state('home.property', {
                url: "^/property",
                templateUrl: "views/main/property.html",
                controller :"PropertyListController"
          })
          .state('home.viewproperty', {
                url: "^/home/viewproperty/:id/:name",
                templateUrl: "views/main/viewproperty.html",
                controller :"PropertyController"
          })
          .state('home.editProject', {
                url: "^/home/editProject/:locationId/:projectId",
                templateUrl: "views/main/projectPerProperty.html",
                controller :"ProjectPerPropertyController"
          })
          .state('home.viewPDForAllLocs', {
                url: "^/home/viewPDForAllLocs/:projectId",
                templateUrl: "views/main/viewPDForAllLocs.html",
                controller :"ProjectForAllPropertyController"
          })
          .state('home.portfolio', {
                url: "^/portfolio",
                templateUrl: "views/main/portfolio.html",
                controller :"PortfolioListController"
          })
          .state('home.projectPortfolioDetails', {
                url: "^/home/projectPortfolioDetails/:projectId",
                templateUrl: "views/main/projectPortfolioDetails.html",
                controller :"ProjectPortfolioDetailsController"
          });




          $locationProvider.html5Mode(true);

        /*  .state('route1.list', {
              url: "/list",
              templateUrl: "views/main/route1.list.html"
          })
          .state('home.route2', {
              url: "/route2",
              templateUrl: "views/main/route2.html"
          })
          .state('route2.list', {
              url: "/list",
              templateUrl: "views/main/route2.list.html",
              controller: function($scope){
                $scope.things = ["A", "Set", "Of", "Things"];
              }
          });



/*
  $routeProvider
      .when('/', {
        templateUrl : "views/login.html",
        controller : 'AuthenticationController'
      })
      .when('/home',{
        templateUrl : "views/home.html"
      })
      .when('/project',{
        templateUrl : "views/project.html"
      })
      .when('/logout',{
        redirectTo: '/'
      })
      .otherwise({
        redirectTo: '/'
      });
*/


}]);
