angular
    .module('app.ajaxService', [])
    .service("ajaxService", ['$http', function ($http) {

        this.AjaxGet = function (route, successFunction, errorFunction) {

          
            $.ajax({
                type: 'GET',
                url: route
                ,
                contentType: false,
                processData: false,
                //data: data,
                success: function (response) {
                    successFunction(response);
                  
                },
                error: function (response) {
                    errorFunction(response);
                }
            });


        }
        this.AjaxPost = function (data, route, successFunction, errorFunction) {


            $http({
                method: 'POST',
                url: route,
                data: data
            }).then(function successCallback(response) {
                // this callback will be called asynchronously
                // when the response is available
                successFunction(response, status);

            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                errorFunction(response);
            });

            //blockUI.start();
            /*
            $http.post((route), data).success(function (response, status, headers, config) {

                //blockUI.stop();

                successFunction(response, status);
            }).error(function (response) {
                //blockUI.stop();
                errorFunction(response);
                });
                */
            /*
            $.ajax({
                type: 'Post',
                url: route,
                contentType: false,
                processData: false,
                data: data,
                success: function (response) {
                    successFunction(response);
                  
                },
                error: function (response) {
                    errorFunction(response);
                }
            });
            */
        }



    }])