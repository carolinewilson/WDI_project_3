"use strict";function Router(t,e){t.state("register",{url:"/register",templateUrl:"/templates/register.html",controller:"RegisterController as register"}).state("login",{url:"/login",templateUrl:"/templates/login.html",controller:"LoginController as login"}).state("home",{url:"/",templateUrl:"/templates/home.html",controller:"LocationsIndexController as locationsIndex"}).state("locationsShow",{url:"/locations/:id",templateUrl:"/templates/locationsShow.html",controller:"LocationsShowController as locationsShow"}).state("budgetPlanner",{url:"/locations/:id/budget",templateUrl:"/templates/budgetPlanner.html",controller:"BudgetPlannerController as budgetPlanner"}),e.otherwise("/")}function Auth(t){t.loginUrl="/login",t.signupUrl="/register",t.tokenPrefix=""}function RegisterController(t,e){function o(){t.signup(r.user).then(function(){e.go("locations")})}var r=this;r.user={},r.submit=o}function LoginController(t,e){function o(){t.login(r.credentials).then(function(){e.go("locations")})}var r=this;r.credentials={},r.submit=o}function BudgetPlannerController(t,e,o,r,n,i){function l(){s.newTrip.flightCost=500}function a(){s.newTrip.totalCost=s.newTrip.flightCost+s.newTrip.expenses+s.newTrip.accomCost-s.newTrip.totalSavings,s.newTrip.location=s.location._id,console.log(s.newTrip);var t=s.isLoggedIn();t?(console.log("Logged in!"),s.newTrip.$update(function(){console.log(s.newTrip)})):(console.log("Logged out!"),i.saveTrip(s.newTrip),alert("You need to be signed in to save a trip"),o.go("register"))}var s=this;s.isLoggedIn=n.isAuthenticated,s.newTrip={},t.get(o.params,function(t){s.newTrip={departDate:"2017-01-01",returnDate:"2017-01-20",origin:"LGW",destination:t.closestAirport,duration:1,flightCost:0,accomCost:0,expenses:0,totalSavings:0,totalCost:0}}),s.newTrip.totalCost=s.newTrip.flightCost+s.newTrip.expenses+s.newTrip.accomCost-s.newTrip.totalSavings,s.createTrip=a,s.getFlights=l}function FlightService(t){function e(e,o,r,n){return t({method:"GET",url:"/flights",params:{origin:e,destination:o,departDate:r,returnDate:n}}).then(function(t){return t.data},function(t){console.log(t)})}this.getPrice=e}function LocationsIndexController(t){var e=this;e.all=t.query(),console.log(e)}function Location(t){return new t("/locations/:id",{id:"@_id"},{update:{method:"PUT"}})}function LocationsShowController(t,e){var o=this;o.location=t.get(e.params),console.log(o.location)}function MainController(t,e){function o(){t.logout().then(function(){e.go("login")})}var r=this;r.isLoggedIn=t.isAuthenticated,r.logout=o}function Trip(t){return new t("/trips/:id",{id:"@_id"},{update:{method:"PUT"}})}function TripService(t){function e(e){t.localStorage.setItem("tripData",JSON.stringify(e))}function o(){return JSON.parse(t.localStorage.getItem("tripData"))}function r(){return t.localStorage.removeItem("tripData")}this.saveTrip=e,this.getTrip=o,this.deleteTrip=r}angular.module("travelApp",["ngResource","ui.router","satellizer"]).config(Router).config(Auth),Router.$inject=["$stateProvider","$urlRouterProvider"],Auth.$inject=["$authProvider"],angular.module("travelApp").controller("RegisterController",RegisterController).controller("LoginController",LoginController),RegisterController.$inject=["$auth","$state"],LoginController.$inject=["$auth","$state"],angular.module("travelApp").controller("BudgetPlannerController",BudgetPlannerController),BudgetPlannerController.$inject=["Location","Trip","$state","FlightService","$auth","TripService"],angular.module("travelApp").service("FlightService",FlightService),FlightService.$inject=["$http"],angular.module("travelApp").controller("LocationsIndexController",LocationsIndexController),LocationsIndexController.$inject=["Location"],angular.module("travelApp").factory("Location",Location),Location.$inject=["$resource"],angular.module("travelApp").controller("LocationsShowController",LocationsShowController),LocationsShowController.$inject=["Location","$state"],angular.module("travelApp").controller("MainController",MainController),MainController.$inject=["$auth","$state"],angular.module("travelApp").factory("Trip",Trip),Trip.$inject=["$resource"],angular.module("travelApp").service("TripService",TripService),TripService.$inject=["$window"];
//# sourceMappingURL=app.js.map