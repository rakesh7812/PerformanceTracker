angular.module('NerdService',[]).factory('Nerd1', ['$http', function($http){
    return {
        get: function(){
          return $http.get('/api/nerds');
        }
    }
}]);
