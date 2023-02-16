(function(){
    angular.module('app',['auth0.auth0', 'ui.router']).config(config);

    config.$inject=['$stateProvider', '$locationProvider', '$urlRouterProvider', 'angularAuth0Provider'];

    function config($stateProvider, $locationProvider, $urlRouterProvider, angularAuth0Provider){
        $stateProvider.state('home',{
            url:'/',
            controller:'HomeController',
            templateUrl:'app/home/home.html',
            controllerAs: 'vm'
        }).state('callback',
        {
            url:'/callback',
            controller:'CallbackController',
            templateUrl:'app/callback/callback.html',
            controllerAs: 'vm'
        });

        $urlRouterProvider.otherwise('/');

        $locationProvider.hashPrefix('');

        $locationProvider.html5Mode(true);
    }
})();