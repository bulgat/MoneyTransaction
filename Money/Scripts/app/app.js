angular
    .module('app', [
        'ngRoute',
        'app.reportService',
        'app.ajaxService',
        'app.utilService',
        /*
        'blockUI',
        //'720kb.datepicker',

        'app.alertService',
        'app.ajaxService',
        'app.modalService',
        'app.RIMService',
        'app.procuratoryService',
        'app.defaultController',
        'app.accountService',
        */
        'app.aboutController',
        'app.indexController',
        'app.contactController',
        'app.transactionController'
       
    ]).config(['$routeProvider',function ($routeProvider) {
        //Тут конфигурация всех контроллеров!!!!!
        //Тут mainController заменить на mainwidgetctrl или defautlctr
        $routeProvider
            .when('/Contact/:AccountId', {
                templateUrl: '/Home/Contact'
            })
           .otherwise({
                redirectTo: '/'
            });
        // $locationProvider.hashPrefix('');

    }]);