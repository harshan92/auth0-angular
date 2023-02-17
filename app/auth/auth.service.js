(function(){
    angular.module('app').service('authService', authService);

    authService.$inject=['$state','angularAuth0','$timeout'];
    function authService($state, angularAuth0, $timeout){
        function login(){
            angularAuth0.authorize();
        }

        function handleAuthentication(){
            angularAuth0.parseHash(function(err, authResult){
                if(authResult && authResult.accessToken && authResult.idToken){
                    setSession(authResult);
                    // console.log(authResult);
                    $timeout(function(){
                        $state.go('home');
                    });
                }
            })
        }

        function setSession(authResult){
            var expiresAt=JSON.stringify((authResult.expiresIn * 1000)+new Date().getTime());
            var profile={
                name:authResult.idTokenPayload.name,
                nickname:authResult.idTokenPayload.nickname,
                picture:authResult.idTokenPayload.picture
            }
            localStorage.setItem('access_token',authResult.accessToken);
            localStorage.setItem('id_token',authResult.idToken);
            localStorage.setItem('expires_at',expiresAt);
            localStorage.setItem('profile',JSON.stringify(profile));
        }

        function logout(){
            localStorage.removeItem('access_token');
            localStorage.removeItem('id_token');
            localStorage.removeItem('expires_at');
        }

        function isAuthenticated(){
            var expires_at=JSON.parse(localStorage.getItem('expires_at'));
            return new Date().getTime()<expires_at;
        }

        return {
            login: login,
            handleAuthentication: handleAuthentication,
            logout: logout,
            isAuthenticated: isAuthenticated
        };
    }
})();