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


            var p1 = $.ajax({ url: '/Home/GetNameСity', method: 'GET' })
            var p2 = $.ajax({ url: '/Home/GetNameRegion', method: 'GET' })
            var p3 = $.ajax({ url: '/Home/GetNameCountry', method: 'GET' })

            console.log(reportService.GetName + "==i Controller==" + reportService.GetNameСity);

            Promise.all([p1,p2,p3]).then(values => {
                console.log("values = " + values);
                $scope.regionTransaction = {};
                $scope.regionTransaction.City = values[0];
                $scope.regionTransaction.Region = values[1];
                $scope.regionTransaction.Country = values[2];
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