(function(){
    angular.module('app',['auth0.auth0', 'ui.router','angular-jwt']).config(config);

    config.$inject=['$stateProvider', '$locationProvider', '$urlRouterProvider','$httpProvider', 'angularAuth0Provider','jwtOptionsProvider', '$httpProvider'];

    function config($stateProvider, $locationProvider, $urlRouterProvider, $httpProvider, angularAuth0Provider, jwtOptionsProvider){
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
            scope:'openid profile',
            audience: 'https://harshan-dev-92.com/api'
        });

        jwtOptionsProvider.config({
            tokenGetter:function(){
                return localStorage.getItem("access_token");
            },
            whiteListedDomains:['localhost'],
        });

        $httpProvider.interceptors.push('jwtInterceptor');

        $urlRouterProvider.otherwise('/');

        $locationProvider.hashPrefix('');

        $locationProvider.html5Mode(true);
    }
})();