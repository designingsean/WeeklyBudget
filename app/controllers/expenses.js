budget.controller('expenses', function expenses($scope, expensesApi, weekRangeFactory) {
    $scope.currentTotal = {};
    $scope.newExpense = {
        postDate:moment().format("YYYY-MM-DD")
    };

    var weeklyTotal = 180;
    var monthlyTotal = (weeklyTotal/7)*(moment().daysInMonth());
    var currentMonthlyTotal;
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
            expensesApi.monthTotal().then(function(response) {
                currentMonthlyTotal = response.data;
                getTotal();
            });
        });
    }
    function getTotal() {
        var total = 0;
        angular.forEach($scope.expenses, function(value, key) {
            total += Number(value.amount);
            value.postDate = value.postDate + "T06:00-0400";
        });
        $scope.currentTotal.month = monthlyTotal - parseFloat(currentMonthlyTotal[0].total);
        $scope.currentTotal.dollars = weeklyTotal - total;
        $scope.currentTotal.percent = ((weeklyTotal - total)/weeklyTotal)*100;
    }

    getExpenses();
});