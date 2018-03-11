angular.module('app.contactController', [])
    .controller("contactController", ['$scope', '$routeParams', 'utilService','reportService', function ($scope, $routeParams, utilService, reportService) {

        $scope.AccountId = 0;
        $scope.modalStandartAsk = "/Scripts/app/cutHtml/modalStandartAsk.html";
        $scope.MoneyInput = 0;

        $scope.initializeController = function () {

            $scope.AccountId = utilService.GetParameterByName("AccountId");
       
            reportService.GetCneckAccount($scope.AccountId, function (response, status) {
         
               
                $scope.checkAccountWeb_ar = response;

                $scope.$apply();

            }, $scope.ResponceError);

        }
        $scope.AddCheck = function (AccountId) {
            
            utilService.openModal('#ModalStandartAsk');
            $scope.ModalStandartAskNameBreak = "No";
            $scope.ModalStandartAskNameConfirm = "Ok";
            $scope.ModalStandartHeadAsk = "Завести новый счет";
            $scope.ModalStandartMessage = "Завести новый счет?";
        }
        $scope.ModalStandartAskConfirm = function (value) {
            
            reportService.SaveCneckAccount($scope.AccountId,value, function (response, status) {

                
                //$scope.checkAccountWeb_ar = response;
                window.location.reload();

                $scope.$apply();

            }, $scope.ResponceError);


        }
        $scope.CloseModal = function (name) {
            utilService.closeModal(name);
        }
        $scope.SelectCheck = function (checkWebId) {
            //alert( "=Mov   Id == " + checkWebId);
            window.location.href = "/Home/About?CheckId=" + checkWebId;
            
        }
    }]);