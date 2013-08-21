budget.controller('expenses', function expenses($scope, expensesApi, weekRangeFactory) {
    $scope.newExpense = {
        postDate:moment().format("YYYY-MM-DD")
    };
    var weekRange = weekRangeFactory.range(moment());
    $scope.addExpense = function() {
        expensesApi.add($scope.newExpense).then(function(response) {
            $scope.newExpense.amount = '';
            getExpenses();
        });
    };
    function getExpenses() {
        expensesApi.get(weekRange).then(function(response) {
            $scope.expenses = response.data;
        });
    }
    getExpenses();
});