var budget = angular.module("budget", [])
.config(function($locationProvider, $routeProvider) {
    $routeProvider
        .when("/", { controller: "expenses", templateUrl: "app/views/expenses.html" })
        .otherwise({ redirectTo: '/budget' });
})
.factory('expensesApi', ['$http', function($http) {
    return {
        add : function(expense) {
            return $http.get("/budget/api/?action=addEntry&postDate=" + expense.postDate + "&amount=" + expense.amount);
        },
        get : function(dates) {
            return $http.get("/budget/api/?action=getEntry&startDate=" + dates.startDate + "&endDate=" + dates.endDate);
        },
        update : function(id, postDate, amount) {
            return $http.get("/budget/api/?action=updateEntry&id=" + id);
        },
        delete : function(id) {
            return $http.get("/budget/api/?action=deleteEntry&id=" + id);
        },
        monthTotal : function() {
            return $http.get("/budget/api/?action=monthTotal");
        }
    };
}])
.factory('weekRangeFactory', function() {
    return {
        range : function(date) {
            var momentObj = {};
            momentDate = moment(date);
            momentDate.day()===0 ? momentDate.day(-7) : momentDate.startOf('week').day(1);
            momentObj['startDate'] = momentDate.format('YYYY-MM-DD');
            momentObj['endDate']  = moment(momentDate).day(15).format('YYYY-MM-DD');
            return momentObj;
        }
    };
});