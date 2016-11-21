"use strict";function Router(e,t){e.state("register",{url:"/register",templateUrl:"/templates/register.html",controller:"RegisterController as register"}).state("login",{url:"/login",templateUrl:"/templates/login.html",controller:"LoginController as login"}).state("locationsNew",{url:"/locations/new",templateUrl:"/templates/locationsNew.html",controller:"LocationsNewController as locationsNew"}).state("locationsEdit",{url:"/locations/:id/edit",templateUrl:"/templates/locationsEdit.html",controller:"LocationsEditController as locationsEdit"}).state("home",{url:"/",templateUrl:"/templates/home.html",controller:"LocationsIndexController as locationsIndex"}).state("locationsShow",{url:"/locations/:id",templateUrl:"/templates/locationsShow.html",controller:"LocationsShowController as locationsShow"}).state("budgetPlanner",{url:"/locations/:id/budget",templateUrl:"/templates/budgetPlanner.html",controller:"BudgetPlannerController as budgetPlanner"}).state("budgetTracker",{url:"/trips/:id",templateUrl:"/templates/budgetTracker.html",controller:"BudgetTrackerController as budgetTracker"}).state("profileShow",{url:"/me",templateUrl:"/templates/profileShow.html",controller:"ProfileShowController as profileShow"}).state("adventurersShow",{url:"/adventurer/:id",templateUrl:"/templates/adventurersShow.html",controller:"AdventurersShowController as adventurersShow"}).state("profileEdit",{url:"/me/:id/edit",templateUrl:"/templates/profileEdit.html",controller:"ProfileEditController as profileEdit"}),t.otherwise("/")}function Auth(e){e.loginUrl="/login",e.signupUrl="/register",e.tokenPrefix=""}function AdventurersShowController(e,t,o){var r=this;r.user=e.get(t.params,function(e){r.locations=o.query({user:e._id})})}function RegisterController(e,t,o,r,n,i){function l(){e.signup(a.user).then(function(r){o.localStorage.setItem("token",r.data.token);var l=e.getPayload();o.localStorage.setItem("userId",l._id);var a=n.getTrip();return a?(a.user=r.data.user._id,i.save(a,function(e){console.log("saved trip! ",e)}),t.go("usersShow",{id:r.data.user._id})):void t.go("home")})}var a=this;a.user={},a.submit=l}function LoginController(e,t,o,r,n){function i(){e.login(l.credentials).then(function(i){var l=e.getPayload();o.localStorage.setItem("userId",l._id);var a=r.getTrip();return a?(a.user=i.data.user._id,n.save(a,function(e){console.log("saved trip! ",e)}),t.go("usersShow",{id:i.data.user._id})):void t.go("home")})}var l=this;l.credentials={},l.submit=i}function BudgetPlannerController(e,t,o,r,n,i,l,a){function s(){p.labels=["Flights","Accomodation","Spending Money"],p.data=[p.newTrip.flightCost,p.newTrip.accomCost,p.newTrip.expenses]}function c(){var e=parseFloat(p.newTrip.duration);p.newTrip.returnDate=moment(p.newTrip.departDate).add(e,"days").format("YYYY-MM-DD"),console.log(p.newTrip.returnDate);for(var t=!1,o=0;!t&&o<=31;)r.getPrice(p.newTrip.origin,p.newTrip.destAirportCode,p.newTrip.departDate,p.newTrip.returnDate).then(function(e){var o=e.response.Quotes[0],r=e.response.Carriers[0];return o?(console.log(e),p.newTrip.flightCost=o.MinPrice,p.newTrip.outboundLeg=moment(o.OutboundLeg.DepartureDate).format("Do MMM"),p.newTrip.inboundLeg=moment(o.InboundLeg.DepartureDate).format("Do MMM"),p.newTrip.carrier=r.Name,t=!0):(p.newTrip.noFlightsMsg="We can't find flights for these dates. Try a different date.",void console.log("no flights found"))},function(e){p.newTrip.searchString="Oh dear, there seems to be a problem. Try again later.",console.log(e)}),p.newTrip.departDate=moment(p.newTrip.departDate).add(1,"days").format("YYYY-MM-DD"),p.newTrip.returnDate=moment(p.newTrip.returnDate).add(1,"days").format("YYYY-MM-DD"),o++}function u(){p.newTrip.totalCost=p.newTrip.flightCost+p.newTrip.expenses+p.newTrip.accomCost-p.newTrip.totalSavings,p.newTrip.location=p.location._id;var e=p.isLoggedIn();e?(p.newTrip.user=l.localStorage.getItem("userId"),t.save(p.newTrip,function(e){console.log("saved ",e),o.go("budgetTracker",{id:e._id})})):(i.saveTrip(p.newTrip),alert("You need to be signed in to save a trip"),o.go("register"))}var p=this;p.isLoggedIn=n.isAuthenticated,p.newTrip={},p.location=e.get(o.params),e.get(o.params,function(e){p.newTrip={origin:"LGW",destination:e.closestAirport,destAirportCode:e.airportCode,duration:7,flightCost:0,accomCost:0,expenses:0,totalSavings:0,totalCost:0}}),a.$watchGroup([function(){return p.newTrip.flightCost},function(){return p.newTrip.accomCost},function(){return p.newTrip.expenses}],function(){s()}),p.newTrip.totalCost=p.newTrip.flightCost+p.newTrip.expenses+p.newTrip.accomCost-p.newTrip.totalSavings,p.createTrip=u,p.getFlights=c}function BudgetTrackerController(e,t,o){function r(){return l.pcSaved=l.trip.totalSavings/(l.trip.flightCost+l.trip.expenses+l.trip.accomCost)*100,Math.ceil(l.pcSaved)}function n(){l.labels=["Flights","Accomodation","Spending Money"],l.data=[l.trip.flightCost,l.trip.accomCost,l.trip.expenses]}function i(){l.trip.$update(function(){r()})}var l=this;l.trip=e.get(t.params),l.pcSaved=l.trip.totalSavings/(l.trip.flightCost+l.trip.expenses+l.trip.accomCost)*100,o.$watchGroup([function(){return l.trip.flightCost},function(){return l.trip.accomCost},function(){return l.trip.expenses}],function(){n()}),l.save=i,l.calcPcSaved=r}function FlightService(e){function t(t,o,r,n){return e({method:"GET",url:"/flights",params:{origin:t,destination:o,departDate:r,returnDate:n}}).then(function(e){return e.data},function(e){console.log(e)})}this.getPrice=t}function inputRevealer(){return{restrict:"E",replace:!0,templateUrl:"templates/inputRevealer.html",scope:{type:"@",name:"@",ngModel:"=",onSubmit:"&"},link:function(e,t){t.on("click",function(){e.isEditing||(e.isEditing=!0),e.$apply()}).on("keyup",function(t){13===t.keyCode&&(e.onSubmit(),e.isEditing=!1,e.$apply())})}}}function LocationsIndexController(e){var t=this;t.all=e.query(),console.log(t)}function Location(e){return new e("/locations/:id",{id:"@_id"},{update:{method:"PUT"}})}function LocationsNewController(e,t,o){function r(){n.location.images=[n.location.tempImage.one,n.location.tempImage.two,n.location.tempImage.three,n.location.tempImage.four,n.location.tempImage.five],e.save(n.location,function(){t.go("home")})}var n=this,i=o.getPayload()._id;n.location={tempImage:{}},n.location.user=i,n.createLocation=r}function LocationsEditController(e,t){function o(){e.update({id:r.location._id},r.location,function(){t.go("home",t.params)})}var r=this;r.location=e.get(t.params),this.update=o}function LocationsShowController(e,t,o){var r=this;r.location=e.get(t.params,function(e){r.user=o.query({_id:e.user})})}function MainController(e,t,o,r,n){function i(){e.logout().then(function(){o.localStorage.removeItem("userId"),r.deleteTrip(),t.go("login")})}var l=this;l.isLoggedIn=e.isAuthenticated,l.userId=o.localStorage.getItem("userId"),l.logout=i}function ProfileEditController(e,t){function o(){e.update({id:r.profile._id},r.profile,function(){t.go("profileShow",t.params)})}var r=this;r.profile=e.get(t.params),this.update=o}function ProfileShowController(e,t,o,r,n){var i=this,l=r.getPayload();console.log("-->",l),i.profile=e.get({id:l._id},function(e){console.log("user--->",e),i.trips=o.query({userId:e._id}),i.locations=n.query({user:e._id})})}function Trip(e){return new e("/trips/:id",{id:"@_id"},{update:{method:"PUT"}})}function TripService(e){function t(t){e.localStorage.setItem("tripData",JSON.stringify(t))}function o(){return JSON.parse(e.localStorage.getItem("tripData"))}function r(){return e.localStorage.removeItem("tripData")}this.saveTrip=t,this.getTrip=o,this.deleteTrip=r}function UploadController(){var e=this;e.data={}}function User(e){return new e("/users/:id",{id:"@_id"},{update:{method:"PUT"}})}function UserService(e){function t(t){e.localStorage.setItem("userId",t)}function o(){return e.localStorage.getItem("userId")}this.saveUser=t,this.getUser=o}angular.module("travelApp",["ngResource","ui.router","satellizer","ngMaterial","chart.js"]).config(Router).config(Auth),Router.$inject=["$stateProvider","$urlRouterProvider"],Auth.$inject=["$authProvider"],angular.module("travelApp").controller("AdventurersShowController",AdventurersShowController),AdventurersShowController.$inject=["User","$state","Location"],angular.module("travelApp").controller("RegisterController",RegisterController).controller("LoginController",LoginController),RegisterController.$inject=["$auth","$state","$window","User","TripService","Trip"],LoginController.$inject=["$auth","$state","$window","TripService","Trip"],angular.module("travelApp").controller("BudgetPlannerController",BudgetPlannerController),BudgetPlannerController.$inject=["Location","Trip","$state","FlightService","$auth","TripService","$window","$scope"],angular.module("travelApp").controller("BudgetTrackerController",BudgetTrackerController),BudgetTrackerController.$inject=["Trip","$state","$scope"],angular.module("travelApp").service("FlightService",FlightService),FlightService.$inject=["$http"],angular.module("travelApp").directive("inputRevealer",inputRevealer),angular.module("travelApp").controller("LocationsIndexController",LocationsIndexController),LocationsIndexController.$inject=["Location"],angular.module("travelApp").factory("Location",Location),Location.$inject=["$resource"],angular.module("travelApp").controller("LocationsEditController",LocationsEditController).controller("LocationsNewController",LocationsNewController),LocationsNewController.$inject=["Location","$state","$auth"],LocationsEditController.$inject=["Location","$state"],angular.module("travelApp").controller("LocationsShowController",LocationsShowController),LocationsShowController.$inject=["Location","$state","User"],angular.module("travelApp").controller("MainController",MainController),MainController.$inject=["$auth","$state","$window","TripService","UserService"],angular.module("travelApp").controller("ProfileEditController",ProfileEditController),ProfileEditController.$inject=["User","$state"],angular.module("travelApp").controller("ProfileShowController",ProfileShowController),ProfileShowController.$inject=["User","$state","Trip","$auth","Location"],angular.module("travelApp").factory("Trip",Trip),Trip.$inject=["$resource"],angular.module("travelApp").service("TripService",TripService),TripService.$inject=["$window"],angular.module("travelApp").controller("UploadController",UploadController),angular.module("travelApp").factory("User",User),User.$inject=["$resource"],angular.module("travelApp").service("UserService",UserService),UserService.$inject=["$window"];
//# sourceMappingURL=app.js.map
