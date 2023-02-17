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
        }).state('profile',
        {
            url:'/profile',
            controller:'ProfileController',
            templateUrl:'app/profile/profile.html',
            controllerAs: 'vm'
        });

        angularAuth0Provider.init({
            clientID:'Y4ViN6UJGrp9kb2fU8bhDuQa9WB6WB6E',
            domain:'dev-oc4r10h8h01y4zn6.us.auth0.com',
            responseType:'token id_token',
            redirectUri:'http://localhost:4200/callback',
            scope:'openid profile'
        });

        $urlRouterProvider.otherwise('/');

        $locationProvider.hashPrefix('');

        $locationProvider.html5Mode(true);
    }
})();