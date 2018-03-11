angular
    .module('app.utilService', [])
    .service("utilService", [  function ($scope) {

        // Счетчик количиства записей на одной странице. И количества закладок для страниц.
        // count - длина массива
        // globalPage - номер страницы
        this.createPage_ar = function (count, globalPage, sizePage) {

            if (sizePage == undefined) {
                sizePage = 100;
            }

            var todos = [];

            // Добавляем ссылку на последнию страницу.
            var viewLast = false;

            for (var i = 0; i < count / sizePage; i++) {



                if (i > globalPage - 10 && i < globalPage + 10) {
                    todos.push({ view: i + 1, page: i, sel: i == globalPage });
                    if (i == Math.round(count / sizePage)) {
                        viewLast = true;
                    }
                }
                // Если длина 1 - не добавлять последнюю страницу.
                if (1 == count / sizePage) {
                    viewLast = true;
                }
            }

            // не добавляли, добавляем на последнюю страницу. 
            if (!viewLast) {
                if (todos.length != 0) {
                    // избегать добавление последней странице, если она уже есть.
                    if (todos[todos.length - 1].page != Math.round(count / sizePage) - 1) {

                        // Чтобы не показывал (-1) когда мало данных.
                        if (count > sizePage - 1) {
                            // Пропуск (точки......)
                            todos.push({ view: '...', page: Math.round(count / sizePage - 1), sel: Math.round(count / sizePage - 1) == globalPage });

                            // И последняя страница.
                            todos.push({ view: Math.round(count / sizePage - 1) + 1 + 1, page: Math.round(count / sizePage - 1), sel: Math.round(count / sizePage - 1) == globalPage });
                        }
                    }
                }
            }

            return todos;
        }
        // Открытие и закрытие модальных окон.
        this.openModal = function (name) {
            $(name).addClass("open");
            $('body').append('<div block-ui="main" class="aside-overlay"></div>');
        }
        this.closeModal = function (name) {
            $(".aside-overlay").remove();
            $(name).removeClass("open");
        }
        // END Открытие и закрытие модальных окон.

        // Мутырный этот Microsoft стандарт json на даты - всяхую фигню оказывается приходится делать. Дать даты.
        this.formatDate = function (value) {
            var pattern = /Date\(([^)]+)\)/;
            var results = pattern.exec(value);
            if (results != null) {
                var dt = new Date(parseFloat(results[1]));
                result = dt.getFullYear() + "." + ('0' + (dt.getMonth() + 1)).slice(-2) + "." + ('0' + dt.getDate()).slice(-2);
                return result;
            }
        };
        // Мутырный этот Microsoft стандарт json на даты - всяхую фигню оказывается приходится делать.
        this.formatDateTime = function (value) {
            var pattern = /Date\(([^)]+)\)/;
            var results = pattern.exec(value);
            var dt = new Date(parseFloat(results[1]));
            result = dt.getFullYear() + "." + ('0' + (dt.getMonth() + 1)).slice(-2) + "." + ('0' + dt.getDate()).slice(-2) + "   " + dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
            return result;
        };


        this.toDateTimeJS = function (value) {
            if (value == undefined) {
                // Что-бы другие методы не ругались, подсовываем сегодняшнею дату.
                return new Date();
            }

            var date;

            if (value.toString().indexOf('.') == -1) {

                date = new Date(value);

            }

            else {

                var arr = value.split(".");
                arr[0] = parseFloat(arr[0]);
                arr[1] = parseFloat(arr[1]) - 1;
                arr[2] = parseFloat(arr[2]);

                date = new Date(arr[0], arr[1], arr[2]);
            }

            return date;

        };
        this.validDate = function (value) {
            var pattern = /Date\(([^)]+)\)/;
            var results = pattern.exec(value);
            var dt = new Date(parseFloat(results[1]));
            var now = new Date();
            var valid = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate() + 10);
            var diff = valid - now;
            diff = Math.round(diff / 86400000);
            //if (diff < 1)
            //    return "Просрочено "+diff*(-1);
            return diff;
        };
        this.dateToString = function (date) {
            var k = date.getDate();
            return (date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear());
        };


        // Выбрасываем лишнею информацию. Оставляем только Id.
        // Понижаем количество передаваемой информации. 
        this.reductArray = function (select_ar) {
            var reduction_ar = Array();
            for (var i = 0; i < select_ar.length; i++) {
                reduction_ar.push(select_ar[i].Id);
            }
            return reduction_ar;
        };


        // Подготавливаем файл к отправке.
        this.packFile = function (namePack) {
            var files = $(namePack).get(0).files;;
            var data = new FormData();
            for (var i = 0; i < files.length; i++) {

                data.append("file" + files[i].name, files[i]);
                //alert(data["file" + files[i].name] + "kkk" + files[i].name);
            }
            return data;
        }
        //************ Элемент автопоиска - автонабора. ****************
        this.AutoOpenSearch = function () {
            angular.element(".customer-search").addClass("active");
        };
        this.AutoCloseSearch = function () {
            angular.element(".customer-search").removeClass("active");
        };
        // Автопоиск в загруженном массиве.
        this.AutoSearchContracts = function (Name, SearchValue, orderContracts, order_ar) {
            orderContracts = [];
            for (var i = 0; i < order_ar.length; i++) {
                if (order_ar[i][Name].indexOf(SearchValue) != -1) {
                    orderContracts.push(order_ar[i]);
                }
            }
            return orderContracts;
        };
        //************** End Элемент автопоиска - автонабора. ************

        // Удалить файл, как только он освободится от закачки.
        this.DeleteFile = function (nameFile) {
            var deleteFileModel = {};
            deleteFileModel.nameFile = nameFile;
            //deleteFileModel.nameFile = "eeeeee";
            /*
            reportService.DeleteFile(deleteFileModel, function (response, status) {
                //alert("delete   photo OKL");
            }, $scope.ResponceError);
            */
        }

        // Храним пока здесь, а то другие страницы пользуются.
        // Тип бронирования. Ид связаны с ProcuratoryCondition, и по идеи мы фильтруем их какие есть условия - есть ли данный пункт в истории заказа. В будущем все может поменяться.
        this.Allocate_ar = [{ Id: 0, Name: "Занято", Help: "Размещение" }, { Id: 2, Name: "Резерв", Help: "Ком. предложение" }];
        //this.Allocate_ar = [{ Id: 0, Name: "Висит", Help: "Размещение" }, { Id: 5, Name: "Продано", Help: "Договор" }, { Id: 2, Name: "Бронь", Help: "Изъятие?" }, { Id: 1, Name: "Резерв", Help: "Ком. предложение" }];

        this.ResponceError = function (response, status) {
            if (response.Notify !== null) {
                if (response.Notify == undefined) {
                   // alertService.DefaultMessage("error", response);

                } else {
                  //  alertService.DefaultMessage(response.Notify.Type, response.Notify.Text);
                }
            }
            else { console.log(response); }
        }

        // Проверка, находимся ли мы на нужной странице, проверка по Url адреса.
        this.urlGet = function (key) {

            var s = window.location.hash;
            if (s.indexOf(key) > 0) {
                return true;
            } else {
                return false;
            }

        }
        this.GetParameterByName = function (name, url) {
            if (!url) { url = window.location.href; }
            name = name.replace(/[\[\]]/g, "\\$&");
            var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
                results = regex.exec(url);
            if (!results) { return null; }
            if (!results[2]) { return ''; };
            return decodeURIComponent(results[2].replace(/\+/g, " "));
        }

        // Обрабытываем полученные данные по поводу созданного Екселя.
        this.ViewCreateExcelDoc = function (response) {
            // Ликвидируем тильду и даем ссылку.
            var downloadLink = response.substring(1);

            // Показываем пользователю сформированный архив.
            window.location.href = downloadLink;
            this.DeleteFile(downloadLink);
        }
        Date.prototype.addDays = function (days) {
            var dat = new Date(this.valueOf());
            dat.setDate(dat.getDate() + days);
            return dat;
        }
        Date.prototype.addMonths = function (value) {
            var n = this.getDate();
            this.setDate(1);
            this.setMonth(this.getMonth() + value);
            this.setDate(Math.min(n, this.getDaysInMonth()));
            return this;
        };
        Date.isLeapYear = function (year) {
            return (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0));
        };

        Date.getDaysInMonth = function (year, month) {
            return [31, (Date.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
        };

        Date.prototype.isLeapYear = function () {
            return Date.isLeapYear(this.getFullYear());
        };

        Date.prototype.getDaysInMonth = function () {
            return Date.getDaysInMonth(this.getFullYear(), this.getMonth());
        };
        // Видимось некоторых элементов меню, в зависимости от прав.
        this.VisibleSalesManFunc = function ($scope) {
            /*
            reportService.VisibleSalesMan(function (response, status) {
                if (response == true) {
                    $scope.VisibleSalesMan = true;
                }

            }, $scope.ResponceError);
            */
        }
    }])