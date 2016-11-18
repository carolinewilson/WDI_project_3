angular.module('travelApp')
  .controller('MainController', MainController);

MainController.$inject = ['$auth', '$state', '$window', 'TripService'];
//MainController.$inject = ['$auth', '$state', '$rootScope'];
//function MainController($auth, $state, $rootScope) {

function MainController($auth, $state, $window, TripService) {
  const main = this;

  main.isLoggedIn = $auth.isAuthenticated;
  main.userId = $window.localStorage.getItem('userId');

  function logout() {
    $auth.logout()
      .then(() => {
        localStorage.removeItem('userId');
        TripService.deleteTrip();
        $state.go('login');
      });
  }

  // main.message = null;
  // const protectedStates = ['filmsEdit', 'filmsNew'];
  //
  // function secureState(e, toState) {
  //   main.message = null;
  //   if(!$auth.isAuthenticated() && protectedStates.includes(toState.name)) {
  //     e.preventDefault();
  //     $state.go('login');
  //     main.message = 'You must be logged in to go there!';
  //   }
  // }
  //
  // $rootScope.$on('$stateChangeStart', secureState);

  main.logout = logout;
}
