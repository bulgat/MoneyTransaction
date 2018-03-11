angular.module('app.indexController', [])
    
    .controller("indexController", ['$scope', 'reportService','utilService', function ($scope, reportService, utilService) {

        $scope.modalStandartAccount = "/Scripts/app/cutHtml/modalStandartAccount.html";

        $scope.initializeController = function () {
            
            $scope.LoadName ();
        }
        $scope.LoadName = function () {
            
       
            reportService.GetName(function (response, status) {
               // $scope.ViewExcelStatistic = response;
                $scope.accountWeb_ar = response;
                $scope.$apply();
            }, $scope.ResponceError);
            /*
            reportService.GetClient(data,function (response, status) {
                // $scope.ViewExcelStatistic = response;
                //alert("gd==fgdf " + response);
                $scope.accountWeb_ar = response;
                
                //$scope.$apply();

            }, $scope.ResponceError);
            */

        }
        $scope.SelectClient = function (AccountWeb) {
            
            window.location.href = "/Home/Contact?AccountId=" + AccountWeb.Id;
        }
        $scope.AddAccount = function () {
            utilService.openModal('#ModalStandartAccount');
            $scope.ModalStandartAskNameBreak = "No";
            $scope.ModalStandartAskNameConfirm = "Ok";
            $scope.ModalStandartHeadAsk = "Завести новый счет";
            $scope.ModalStandartMessage = "Завести новый счет?";
        }
        $scope.ModalStandartAskConfirm = function (NameInput, AddressInput) {
            utilService.closeModal('#ModalStandartAccount');
            reportService.SaveAccount(NameInput, AddressInput, function (response, status) {

                alert( "=MoneyInput  Id $$$== ");
       
                window.location.reload();

                $scope.$apply();

            }, $scope.ResponceError);
        }

    }]);