budget.controller('expenses', function expenses($scope, expensesApi, weekRangeFactory) {
    $scope.weeklyTotal = 180;
    $scope.currentTotal = {};
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
            getTotal();
        });
    }
    function getTotal() {
        var total = 0;
        angular.forEach($scope.expenses, function(value, key) {
            if (value.amount !== null)
                total += Number(value.amount);
        });
        $scope.currentTotal.dollars = $scope.weeklyTotal - total;
        $scope.currentTotal.percent = (($scope.weeklyTotal - total)/$scope.weeklyTotal)*100;
    }
    getExpenses();
});