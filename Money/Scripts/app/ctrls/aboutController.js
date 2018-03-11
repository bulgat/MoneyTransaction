angular.module('app.aboutController', [])
    .controller("aboutController", ['$scope', '$routeParams', 'utilService','reportService', function ($scope, $routeParams, utilService, reportService) {

        $scope.CheckId = 0;
        $scope.modalStandartAsk = "/Scripts/app/cutHtml/modalStandartAsk.html";
        $scope.SlaveCheckId;

        $scope.initializeController = function () {

            $scope.CheckId = utilService.GetParameterByName("CheckId");
           

            reportService.GetCneckOne($scope.CheckId, function (response, status) {

                $scope.MasterCheck = response;
                //alert("g $scope.MasterCheck =" + $scope.MasterCheck );
                
                //$scope.checkAccountWeb_ar = response;

                $scope.$apply();

            }, $scope.ResponceError);
            reportService.GetCheckAllAccount( function (response, status) {

                // alert("gd==fgdf " + response);
                $scope.checkAccountWeb_ar = response;

                $scope.$apply();

            }, $scope.ResponceError);
        }
        $scope.SelectCheck = function (checkWebId) {
             
            utilService.openModal('#ModalStandartAsk');
            $scope.ModalStandartAskNameBreak = "No";
            $scope.ModalStandartAskNameConfirm = "Ok";
            $scope.ModalStandartHeadAsk = "Перевести на другой счет";
            $scope.ModalStandartMessage = "Перевести на другой счет?";
            $scope.SlaveCheckId = checkWebId;
        }
        $scope.ModalStandartAskConfirm = function (value) {
            var TransferWebModel = {};
            TransferWebModel.MasterCheckId = $scope.MasterCheck.Id;
            TransferWebModel.SlaveCheckId = $scope.SlaveCheckId;
            TransferWebModel.Money = value;

            //alert(TransferWebModel.MasterCheckId + "gd==fgdf " + TransferWebModel.SlaveCheckId);
            //alert(value + "  Id =Money= " + TransferWebModel.Money);
            reportService.TransferCheckAccount(TransferWebModel,function (response, status) {

                  //alert("gd==fgdf " + response);
                //$scope.checkAccountWeb_ar = response;

                //$scope.$apply();
                window.location.reload();

            }, $scope.ResponceError);


        }
        $scope.CloseModal = function (name) {
            utilService.closeModal(name);
        }
    }]);