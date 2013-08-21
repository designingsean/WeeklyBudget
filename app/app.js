var budget = angular.module("budget", [])
.config(function($locationProvider, $routeProvider) {
    $routeProvider
        .when("/", { controller: "expenses", templateUrl: "app/views/expenses.html" })
        .otherwise({ redirectTo: '/budget' });
})
.factory('expensesApi', ['$http', function($http) {
    return {
        add : function(postDate, amount) {
            return $http.get("/calls/api/?action=addEntry&postDate=" + postDate + "amount=" + amount);
        },
        get : function(startDate, endDate) {
            return $http.get("/calls/api/?action=getEntry&startDate=" + startDate + "endDate=" + endDate);
        },
        update : function(id, postDate, amount) {
            return $http.get("/calls/api/?action=updateEntry&id=" + id);
        },
        delete : function(id) {
            return $http.get("/calls/api/?action=deleteEntry&id=" + id);
        }
    };
}]);