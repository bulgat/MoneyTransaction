angular
    .module('app.reportService', [])
    .service("reportService", ['ajaxService', function (ajaxService) {

        this.GetAllTransaction = function (successFunction, errorFunction) {
            ajaxService.AjaxGet("/Home/GetAllTransaction", successFunction, errorFunction);
        };
        this.GetCneckOne = function (CheckId, successFunction, errorFunction) {
            ajaxService.AjaxGet("/Home/GetCneckOne?CheckId=" + CheckId, successFunction, errorFunction);
        };

        this.SaveAccount = function (AccountName, Address, successFunction, errorFunction) {
            ajaxService.AjaxGet("/Home/SaveAccount?AccountName=" + AccountName + "&Address=" + Address, successFunction, errorFunction);
        };
        this.SaveCneckAccount = function (AccountId,Money, successFunction, errorFunction) {
            ajaxService.AjaxGet("/Home/SaveCneckAccount?AccountId=" + AccountId + "&Money=" + Money, successFunction, errorFunction);
        };
        this.GetCheckAllAccount = function ( successFunction, errorFunction) {
            ajaxService.AjaxGet("/Home/GetCheckAllAccount", successFunction, errorFunction);
        };
        this.GetCneckAccount = function (AccountId, successFunction, errorFunction) {
            ajaxService.AjaxGet("/Home/GetCneckAccount?AccountId=" + AccountId, successFunction, errorFunction);
        };
        this.TransferCheckAccount = function (model, successFunction, errorFunction) {
            ajaxService.AjaxPost(model,"/Home/TransferCheckAccount", successFunction, errorFunction);
        };


        this.GetName = function (successFunction, errorFunction) {
            ajaxService.AjaxGet("/Home/GetName", successFunction, errorFunction);
        };
        this.GetClient = function (Procuratory, successFunction, errorFunction) {
            ajaxService.AjaxPost(Procuratory, "/Home/GetClient", successFunction, errorFunction);
        };

    }])