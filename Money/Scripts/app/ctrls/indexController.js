angular.module('app.indexController', [])
    
    .controller("indexController", ['$scope', 'reportService','utilService', function ($scope, reportService, utilService) {

        $scope.modalStandartAccount = "/Scripts/app/cutHtml/modalStandartAccount.html";

        

        $scope.initializeController = function () {

            console.log("==LoadName==");
            $scope.GetAllPromise();

            $scope.LoadName ();
        }
        $scope.LoadName = function () {
            
            

            reportService.GetName(function (response, status) {

                console.log("==$scope.accountWeb_ar==" + $scope.accountWeb_ar);

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
        $scope.GetAllPromise = function () {


            var p1 = new Promise((resolve, reject) => {
                //setTimeout(resolve, 1000, "one");
                $scope.GetNameСity(resolve);
            });


            console.log(reportService.GetName + "==i Controller==" + reportService.GetNameСity);

            Promise.all([$scope.GetNameСity]).then(values => {
                console.log("values = "+values);
            }, reason => {
                console.log("reason = " +reason)
            });


            console.log("==SelectClient==");

        }
        $scope.GetNameСity = function (resolve) {
            reportService.GetNameСity(function (response, status) {

                console.log("00000000==$scope.account ==" + response);

                return response;
            }, $scope.ResponceError);
        }
        $scope.SelectClient = function (AccountWeb) {
            
            window.location.href = "/Home/Contact?AccountId=" + AccountWeb.Id;
        }
        $scope.AddAccount = function () {

            console.log("==AddAccount==");

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