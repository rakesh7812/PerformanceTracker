angular.module('trackerApp', ['ui.router','nvd3','chart.js','ngCookies','appRoutes','trackerapp.authentication.service',
'trackerapp.login','ngDialog','tracker.app.project','ui.bootstrap',
'tracker.app.template1','tracker.app.template2','trackerapp.project.service',
'tracker.app.project.inviteproperty','ngHandsontable','angularjs-dropdown-multiselect'
,'trackerapp.property.service','tracker.app.property'])
.config(['ngDialogProvider', function (ngDialogProvider) {
    ngDialogProvider.setDefaults({
        className: 'ngdialog-theme-default',
        plain: true,
        showClose: true,
        closeByDocument: true,
        closeByEscape: true
    });
}])
.run(function ($rootScope,$state,$http,$location,$cookies) {
  if(undefined == $cookies.get('x-access-token-cookie') && ("/login" != $location.url() && "/"!=$location.url())){
    $location.path("/login");
  }
  $rootScope.$on('unauthorized', function() {
        $state.go('login');
  });
  $rootScope.$on('$locationChangeStart', function(obj,newurl) {
        if(undefined == $cookies.get('x-access-token-cookie') && newurl.indexOf("/home") != -1){
          $location.path("/login");
        }
  });
})
.service('APIInterceptor', function($rootScope) {
    var service = this;
    service.responseError = function(response) {
        if (response.status === 403) {
            $rootScope.$broadcast('unauthorized');
        }
        return response;
    };
})
