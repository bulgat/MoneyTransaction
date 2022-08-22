angular.module('app.transactionController', [])
    .controller("transactionController", ['$scope', '$routeParams', 'utilService', 'reportService',
        function ($scope, $routeParams, utilService, reportService) {

        var TransactionWebFull_ar = Array();

        $scope.initializeController = function () {

            console.log("==transactionController==");
            reportService.GetAllTransaction( function (response, status) {

//alert("gd==      f ");
                $scope.TransactionWeb_ar = TransactionWebFull_ar = response;

                $scope.$apply();

            }, $scope.ResponceError);

        }
        $scope.FormatDateTime = function (value) {
            return utilService.formatDateTime(value);
        }
        // Примитивный фильтр. Параметр и тип фильтра. 
        $scope.selectSortButton = function (model, nameParam) {
            if (model == "" || model == undefined) {
                $scope.TransactionWeb_ar = TransactionWebFull_ar;
                return;
            }
            var newActivityLog_ar = Array();
            for (var i = 0; i < TransactionWebFull_ar.length; i++) {

                var c = TransactionWebFull_ar[i][nameParam].toString();

                if (c.indexOf(model) != -1) {
                    newActivityLog_ar.push(TransactionWebFull_ar[i]);
                }
            }
            $scope.TransactionWeb_ar = newActivityLog_ar;
            }
            /*
        // Действия на нажатие кнопки сортировки.
        $scope.sortBy = function (propertyName) {

            $scope.reverse = (propertyName !== null && $scope.propertyName === propertyName)
                ? !$scope.reverse : false;
            $scope.propertyName = propertyName;

            $scope.technicks = orderBy($scope.TransactionWeb_ar, $scope.propertyName, $scope.reverse);
        };
          */
            $scope.sortBy = function (propertyName) {
                $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
                $scope.propertyName = propertyName;
            };


    }]);