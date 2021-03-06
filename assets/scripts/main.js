
if (localStorage.accessToken == undefined) {
    window.location.href = 'login.html'
}
setInterval(function () {
    if (localStorage.accessToken == undefined) {
        window.location.href = 'login.html';
    }
}, 500)
var app = angular.module('myApp', ['angular.filter', 'ngDraggable']);
app.directive("sidebar", function () {
    return {
        scope: true,
        restrict: 'AE',
        replace: 'true',
        template: '<ng-include src="template1"/>',
        link: function (scope, elem, attrs) {
            scope.$watch(function () {
                scope.template1 = 'modules/' + scope.side;
            });
        }
    }
});

app.controller('myCtrl', ['$scope', '$http', '$timeout', '$filter', '$interval', '$compile', '$window', function ($scope, $http, $timeout, $filter, $interval, $compile, $window) {
    // 'use strict';
    $scope.host = $(location).attr('pathname') + "/api";
    $scope.tableView = true;
    $scope.minimizedFolder = [];
    $scope.host.indexOf(1);
    $scope.host.toLowerCase();
    $scope.host = $scope.host.split("/")[1];
    var myhost = "/" + $scope.host + "/api";
    $scope.subSystemcontainer = [];
    $scope.securityCheck = false;
    if (localStorage.accessToken == undefined) {
        window.location.href = 'login.html'
        $scope.securityCheck = false;
    }
    else {
        $scope.securityCheck = true;
    }

    $interval(function () {
        if (localStorage.accessToken == undefined) {
            window.location.href = 'login.html';
            $scope.securityCheck = false;

        }
    }, 500)
    //theme functions
    $http.get("data/theme.json")
        .then(function (response) {
            $scope.testfont = response.data.testfont;
            $scope.tableFont = response.data.tableFont;
            $scope.numberType = response.data.numberType;
            $scope.time = response.data.screensaver;
            $scope.name = response.data.name;
            $scope.img = response.data.img;
            $scope.gendar = response.data.gendar;
            $scope.userColor = response.data.userColor;
            $scope.userSubColor = response.data.userSubColor;
            $scope.userSystemColor = response.data.userSystemColor;
            if (localStorage.userColor != undefined) {
                $scope.userColor = localStorage.userColor;
                $scope.userSubColor = localStorage.userSubColor;
                $scope.userSystemColor = localStorage.userSystemColor;
            }
            if (localStorage.font != undefined) {
                $scope.testfont = JSON.parse(localStorage.font);
            }
            var timeout;
            $(document).on("mousemove keydown click", function () {
                $(".loading-login1").fadeOut(1000)
                clearTimeout(timeout);
                timeout = setTimeout(function () {
                    $(".loading-login1").fadeIn(1000);
                }, $scope.time * 60);
            }).click();
        }).catch(function () {
            $scope.error[0] = "خطا در برقراری ارتباطات";
            $("#error").modal();
        })
    // log in demo log in. it should be removed later

    $scope.logout = function () {
        window.localStorage.removeItem('accessToken');
        window.location.href = 'login.html';
    };
    // theme elman to select 
    $scope.themeEleman = 1;
    $scope.themeElemanChange = function (x) {
        $scope.themeEleman = x;
    }
    // document page data loader it may have changes in back-end matching level
    $http.get("data/document.json").then(function (response) {
        var debtSum = 0;
        var creditSum = 0;
        $scope.document = response.data.document;
        for (var i = 0; i < $scope.document.length; i++) {
            debtSum = debtSum + $scope.document[i].debt;
            creditSum = creditSum + $scope.document[i].credit;
            $scope.document[i].credit = $scope.numberFormat($scope.document[i].credit.toString()) + "/" + $scope.float($scope.document[i].credit);
            $scope.document[i].debt = $scope.numberFormat($scope.document[i].debt.toString()) + "/" + $scope.float($scope.document[i].debt);
        }
        $("#documentDebt").html($scope.numberFormat(debtSum.toString()) + "/" + $scope.float(debtSum));
        $("#documentCredit").html($scope.numberFormat(creditSum.toString()) + "/" + $scope.float(creditSum));
    })
    $scope.number = "modules/example1.html";
    $scope.limitedNote = [];

    $scope.reading = 0;
    $http.get("data/error.json")
        .then(function (response) {
            $scope.error = response.data.error;
        })
    $scope.calendarsubmit = function (start, finish, title) {
        var calendar = {
            title: "",
            start: "",
            end: ""
        }
        calendar.title = title;
        calendar.start = $("#start1").val();
        calendar.finish = $("#finish1").val();
        $scope.events.push(calendar);
        localStorage.setItem('event', JSON.stringify($scope.events));
    }
    $scope.lookupFlag = false;
    $scope.lookUping = function () {
        $("#producer-type").toggleClass("hide");
    }
    $scope.producers = [];
    $scope.producerCheck = function (x, id) {
        if ($("#producer" + id).is(":checked")) {
            $scope.producers.push($scope.sendMails[x]);
        }
        else {
            for (var i = 0; i < $scope.producers.length; i++) {
                if (id == $scope.producers[i].id) {
                    $scope.producers.splice(i, 1);
                }
            }
        }
    }
    $scope.removingProducer = function (x, id) {
        $scope.producers.splice(x, 1);
        $("#producer" + id).attr('checked', false);

    }
    // cartable json load and number of unread message
    $http.get("data/cartable.json")
        .then(function (response) {
            $scope.reciveMails = response.data.cartable;
            $scope.cartable = $scope.reciveMails;
            for (var x = 0; x < $scope.cartable.length; x++) {
                if ($scope.cartable[x].read == false) {
                    $scope.reading = $scope.reading + 1;
                }
                else {
                    $("check" + $scope.cartable[x].id).removeClass("hide");
                }
            }
            if ($scope.reading == 0) {
                $(".badge").css("opacity", "0");
            }
        })
    $scope.send = function () {
        $http.get("data/sendmail.json")
            .then(function (response) {
                $scope.sendMails = response.data.cartable;
                $scope.cartable = $scope.sendMails;
                $scope.emailLoader = false;
                $scope.emailType = "sent";
            })
    }
    $scope.recive = function (x) {
        $scope.cartable = $scope.reciveMails;
        $scope.emailLoader = false;
        $scope.myFav = x;
        $scope.emailType = "recive";
    }
    // cartable message on click to show
    $scope.showContext = function () {
        $scope.emailLoader = false;
    }
    // closing search results
    $scope.closingSearch = function () {
        if (!$("#search").hasClass("flag")) {
            $scope.searchSystem = []
        }
    }
    // searching in navigation
    $scope.searching = function (x) {
        if ($("#search").val()) {
            $scope.searchSystem = $scope.system;
            $(".searchResult").css({ "display": "block", "background-color": "#f1f2f3" })
            $scope.searchItem = $("#search").val();
        }
        else {
            $scope.searchSystem = [];
            count = 0;
        }
    }
    document.onkeydown = checkKey;
    var count = 0;
    var page = 1;
    $scope.listItems = []
    function checkKey(e) {
        // that works when search get smaller or bigger
        if ($(".searchLink").length != 0) {
            $scope.listItems = $(".searchLink")
        }
        e = e || window.event;
        // it reduce count when kry up is pressed
        if (e.keyCode == '38') {
            if (count < 1) {
                page = Math.floor($scope.listItems.length / 5)
                $('.searchResult').animate({ scrollTop: 300 * page }, 'fast');
                count = ($scope.listItems.length) - 1
            }
            else {
                count--
                if (count % 4 == 0) {
                    if (count - 4 < 1) {
                        $('.searchResult').animate({ scrollTop: 0 }, 'slow');
                        page = 1
                    }
                    else {
                        page--
                        $('.searchResult').animate({ scrollTop: 300 * page }, 'slow');
                    }
                }
            }
        }
        // it increase count when key down is pressed
        else if (e.keyCode == '40') {
            if (count > ($scope.listItems.length) - 2) {
                count = 0
                page = 1;
                $('.searchResult').animate({ scrollTop: 0 }, 'fast');
            }
            else {
                count++
                if (count % 5 == 0 && count != 0) {
                    $('.searchResult').animate({ scrollTop: 300 * page }, 'slow');
                    page++
                }
            }
        }
        // it got executed when enter key is pressed
        else if (e.keyCode == '13') {
            // looking for selected list
            for (var i = 0; i < $scope.listItems.length; i++) {
                if ($($scope.listItems[i]).hasClass("selected")) {
                    for (var i = 0; i < $scope.system.length; i++) {
                        if ($($scope.listItems[i]).attr('value') == $scope.system[i].title) {
                            $scope.gettingSystem($scope.system[i].id, 1)
                        }
                    }
                    // cheking if that is a child leef
                    // if (!$($scope.listItems[i]).hasClass("child")) {
                    //     var valueLink = $($scope.listItems[i]).attr('value')
                    //     $scope.gettingSystem($scope.listItems[i].id, 1)
                    // }
                    // else {
                    //     var valueLink = $($scope.listItems[i]).attr('value');
                    //     var nameLink = $($scope.listItems[i]).attr('name');
                    //     $scope.searchClick($scope.listItems[i].id, nameLink)
                    // }
                }
            }
        }
        // adding selected class 
        $(".searchLink").removeClass("selected")
        $($scope.listItems[count]).addClass("selected")
    }
    // first time list detecting
    $scope.checkingP = function () {
        $(".searchResult").css("overflow-y", "scroll")
        $scope.listItems = $(".searchLink")
        $scope.testing = $(".testing")
        $($scope.listItems[0]).addClass("selected")
        $scope.theme();
    }
    // system page on load to chek if there is any cookie
    $scope.systemToShow = function () {

        $scope.systemIdToLoad = localStorage.getItem("parent_id");
        var load = $http({
            url: myhost + "/system/" + $scope.systemIdToLoad + "/subsystems",
            method: "GET",
            dataType: 'json',
            // type: "HEAD",
            ContentType: 'application/x-www-form-urlencoded',
            headers: authHeaders,
            eventHandlers: {
                progress: function (e) {
                    if (e.lengthComputable) {
                        $scope.progressBar = (e.loaded / e.total) * 100;
                        $scope.progressCounter = $scope.progressBar;
                        $("#myBar").css("top", "20%");
                        $("#loadingImage").removeClass('rotate');
                        $("#myBar").fadeIn();
                        var elem = document.getElementById("inside-progress")
                        // $scope.myinterval = setInterval($scope.myprogressBar(),20)
                        $scope.myinterval = $interval(
                            function () {

                                var elem = document.getElementById("inside-progress");
                                // var width = 1;
                                if ($scope.progressCounter >= 100) {
                                    $interval.cancel($scope.myinterval);
                                    $("#loadingImage").addClass('rotate');

                                    // $("#myBar").css("display", "none");
                                    elem.style.height = $scope.progressCounter + '%';
                                    elem.style.top = 100 - $scope.progressCounter + '%';
                                    $("#myBar").animate({ top: "-20%" });
                                    $("#myBar").fadeOut();
                                    // $("#myBar").animate()
                                } else {
                                    elem.style.height = $scope.progressCounter + '%';
                                    elem.style.top = 100 - $scope.progressCounter + '%';
                                }
                            }, 20);
                    }
                }
            }
        }).then(function (response) {
            $scope.subsystem = response.data;
            for (var i = 0; i < $scope.subsystem.length; i++) {
                var subItem = {
                    "id": $scope.subsystem[i].id,
                    "itemLoaded": 0,
                    "title": $scope.subsystem[i].title,
                    "children": 1
                }
                $scope.subsystem[i].isLoaded = true;
                $scope.subSystemcontainer.push($scope.subsystem[i]);
                $scope.subSystemSituation.push(subItem);
            }
        }).catch(function (xhr, status, error) {
            console.log(xhr);
            if (refreshtoken && xhr.status === 401) {
                $scope.refreshlocal($scope.systemToShow, 0);
            }
        })
    }
    $scope.header = [];

    $scope.childrenLoader = function (parent, id, leaf, title) {
        var headeContainer = {
            "title": title,
            "id": id
        }
        $scope.header.push(headeContainer);
        $scope.subsystem = [];
        for (var i = 0; i < $scope.subSystemcontainer.length; i++) {
            if ($scope.subSystemcontainer[i].parentId == id) {
                $scope.subsystem.push($scope.subSystemcontainer[i]);
            }
        }
        if ($scope.subsystem.length == 0) {
            if (leaf == false) {
                $http({
                    url: myhost + "/system/" + id + "/subsystems",
                    method: "GET",
                    headers: authHeaders,
                }).then(function (response) {
                    $scope.subsystem = response.data
                    for (var i = 0; i < $scope.subsystem.length; i++) {
                        $scope.subSystemcontainer.push($scope.subsystem[i]);
                    }
                }).catch(function (xhr, status, error) {
                    if (refreshtoken && xhr.status === 401) {
                        // $scope.refreshlocal($scope.drop, x);
                    }
                })
            }
            else {
                $http({
                    url: myhost + "/system/" + id + "/pages",
                    method: "GET",
                    headers: authHeaders,
                }).then(function (response) {
                    $scope.subsystem = [];
                    $scope.leaf = response.data
                    for (var i = 0; i < $scope.leaf.length; i++) {
                        $scope.subSystemcontainer.push($scope.leaf[i]);
                    }
                    // for (var i = 0; i < $scope.systemslider.length; i++) {
                    //     if (x == $scope.systemslider[i].id) {
                    //         $scope.systemslider[i].children.push(response.data);
                    //     }
                    // }
                }).catch(function (xhr, status, error) {
                    if (refreshtoken && xhr.status === 401) {
                        $scope.refreshlocal($scope.drop, x);
                    }
                })
            }
        }
    }
    $scope.topNav = function (id, index) {

        if (index + 1 != $scope.header.length) {
            $scope.subsystem = [];
            $scope.leaf = [];
            for (var i = 0; i < $scope.subSystemcontainer.length; i++) {
                if ($scope.subSystemcontainer[i].parentId == id) {
                    $scope.subsystem.push($scope.subSystemcontainer[i]);
                }
            }
            $scope.header = $scope.header.slice(0, index + 1);
        }

    };
    // $scope.pageLoader = function (x) {
    //     $scope.number = "/modules/" + x;
    // }
    $scope.gettingMainSystems = function () {
        $(".system-container").toggleClass("hide");
    }
    // $scope.myprogressBar = function () {
    //     $("#myBar").css("display", "block");
    //     var elem = document.getElementById("myBar");
    //     var width = 1;
    //     if ($scope.progressCounter >= 100) {
    //         clearInterval($scope.myinterval);
    //         $("#myBar").css("display", "none");
    //     } else {
    //         document.getElementById("myBar").style.width = $scope.progressCounter + '%';
    //         $scope.progressCounter ++;
    //     }

    // }
    // $scope.getSearchCookie = function () {
    //     var x = $scope.getCookieValue('searchParent')
    //     var y = $scope.getCookieValue('searchId')
    //     $scope.subsystem = $scope.getCookieValue('SubSystem') ? JSON.parse($scope.getCookieValue('SubSystem')) : []
    //     if (x != 0 && y != 0) {
    //         $scope.subSystem(x, y);
    //     }
    // }
    //    note json loader
    $scope.note = [];
    if (localStorage.note != undefined) {
        $scope.note = JSON.parse(localStorage.note);
    }
    var sliderTime;
    var sliderLength;
    $http.get("data/note.json")
        .then(function (response) {
            // $scope.note = response.data.note;
            $scope.message = response.data.message;
            $scope.alarm = response.data.alarm;
            $scope.sliderAlarm = $scope.alarm[0];
            sliderLength = $scope.alarm.length;
            $scope.carousel();
        });
    // carsoule
    $scope.myslider = 0;
    $scope.carousel = function () {
        if ($scope.myslider > $scope.alarm.length - 2) {
            $scope.myslider = 0;
            // $scope.sliderAlarm = $scope.alarm[slider];
        }
        else if ($scope.myslider < 0) {
            $scope.slider = $scope.alarm.length - 1;

        }
        else {
            $scope.myslider = $scope.myslider + 1;
        }
        $scope.sliderAlarm = $scope.alarm[$scope.myslider];
        sliderTime = $timeout(function () {
            $scope.sliderAlarm = [];
            $scope.carousel();
        }, 5000);
    }
    $scope.slider = function (x) {
        if (x == -1) {
            $scope.myslider = $scope.myslider - 2;
        }
        $timeout.cancel(sliderTime);
        $scope.carousel();
        $(".play").addClass("hide");
        $(".pause").removeClass("hide");
    }
    $scope.pause = function () {
        $timeout.cancel(sliderTime);
        $(".pause").addClass("hide");
        $(".play").removeClass("hide");
    }
    $scope.play = function () {
        $scope.carousel();
        $(".play").addClass("hide");
        $(".pause").removeClass("hide");
    }
    // system data loader
    var SHeight = false;
    var accesstoken = localStorage.getItem('accessToken');
    var refreshtoken = localStorage.getItem('refreshToken');
    var authHeaders = {};
    if (accesstoken) {
        authHeaders.Authorization = 'Bearer ' + accesstoken;
    }
    var setItemToFix = []
    $scope.gettingSystemJson = function () {
        $http({
            url: myhost + "/system",
            method: "GET",
            headers: authHeaders
        }).then(function (response) {
            var key = localStorage.getItem("parent_id")
            SHeight = true;
            $scope.system = response.data;
            for (var i = 0; i < $scope.system.length; i++) {
                if ($scope.system[i].id == key) {
                    $scope.firstsystem = $scope.system[i];
                }
            }
            $scope.blankSystem = $scope.system.length % 3;
            $scope.facebookLoader = 1;
        })
            .catch(function (xhr, status, error) {
                // console.log(xhr)
                if (refreshtoken && xhr.status === 401) {
                    $scope.refreshlocal($scope.gettingSystemJson, 0);
                }
            })
    }
    $scope.refreshlocal = function (x, y) {
        $.ajax({
            url: "/" + $scope.host + "/login",
            data: {
                refresh_token: refreshtoken,
                grant_type: 'refresh_token'
            },
            type: 'POST',
            dataType: 'json',
            ContentType: 'application/x-www-form-urlencoded',
            success: AjaxSucceeded,
            error: AjaxFailed
        })
        function AjaxSucceeded(response) {
            localStorage.setItem('accessToken', response.access_token);
            localStorage.setItem('refreshToken', response.refresh_token);
            refreshtoken = localStorage.getItem('refreshToken');
            accesstoken = localStorage.getItem('accessToken');
            authHeaders.Authorization = 'Bearer ' + accesstoken;
            if (y == 0) {
                x();
            }
            else {
                x(y);
            }
        }
        function AjaxFailed(err, response) {
            // window.location.href = "login.html"
        }
    }
    $scope.getHeight = function () {
        if (SHeight == true) {
            setTimeout(function () {
                $("#chart1").css("height", $(".system-con").height() - 28 + "px");
                $http.get('data/chart.json')
                    .then(function (response) {
                        var users = response.data
                        var data1 = {
                            labels: users.map(function (user) {
                                return user.name;
                            }),
                            series: users.map(function (user) {
                                return user.value;
                            })
                        };
                        new Chartist.Bar('#chart1', data1, {
                            distributeSeries: true
                        });

                    });
            }, 400)

        }
    }
    // $scope.getCookieValue = function (a) {
    //     var b = document.cookie.match('(^|;)\\s*' + a + '\\s*=\\s*([^;]+)');
    //     return b ? b.pop() : '';
    // }
    // cartable deleting message
    $scope.delete = function () {
        if ($("#select").is(":checked")) {
            $scope.cartable = [];
        }
        else {
            $('.cartable-input').each(function (index) {
                if (this.checked == true) {
                    var myid = this.value;
                    for (var i = 0; i < $scope.cartable.length; i++) {
                        if (myid == $scope.cartable[i].id) {
                            $scope.cartable.splice(i, 1);
                        }
                    }
                }
            });
        }
    }
    //deleting form a table and add to that and editing that
    $scope.tableDeleting = function () {

        $('.modal_input').each(function (index) {
            if (this.checked == true) {
                var myid = this.value;
                for (var i = 0; i < $scope.tabledata.length; i++) {
                    if (myid == $scope.tabledata[i].id) {
                        $scope.tabledata.splice(i, 1);
                    }
                }
            }
        })
        $scope.uncheck();
        $scope.tableFormat()
        $scope.pagination(currentpage)
    }
    // system page table adding new row
    $scope.tablePlus = function (x, y, z, v) {
        var item = {
            "title": x,
            "description": y,
            "credit": z,
            "debt": v,
            "decimal": 1,
            "row": 200,
            "situation": '',
            "remain": '',
            "id": x,
            "decimal": 1
        }
        $("#tablePlus").modal();
        $scope.tabledata.push(item)
        var pageNumber;
        $scope.paginationNumber = []
        pageNumber = Math.ceil($scope.tabledata.length / 15);
        for (var conter = 1; conter < pageNumber + 1; conter++) {
            $scope.paginationNumber.push(conter);
        }
        $scope.pagination(currentpage)

    }
    var myid;
    // system page table editing
    $scope.tableEdit = function () {
        $(".editConfirm").css("display", "inline-block")
        $('.modal_input').each(function (index) {
            if (this.checked == true) {
                myid = this.value;
                $("#row" + myid).attr("contentEditable", "true")
                $("#row" + myid).find("td").addClass("editTable")
                // for (var i = 0; i < $scope.cartable.length; i++) {
                //     if (myid == $scope.cartable[i].id) {
                //         $scope.cartable.splice(index, 1);
                //     }
                // }
            }
        });
        $scope.uncheck();
    }
    // system page editing confirm function and canceling that
    $scope.confirmEdit = function () {
        $(".myrow").attr("contentEditable", "false")
        $(".myrow").find("td").removeClass("editTable")
        $(".modal_input").prop("checked", false);
        $(".editConfirm").css("display", "none");
        $scope.uncheck();
    }
    $scope.cancelEdit = function () {
        $scope.tableFormat();
        $scope.pagination(currentpage);
        $(".myrow").attr("contentEditable", "false");
        $(".myrow").find("td").removeClass("editTable");
        $(".modal_input").prop("checked", false);
        $(".editConfirm").css("display", "none");
        $scope.uncheck();
    }
    $scope.uncheck = function () {
        $(".select").prop("checked", false)
    }
    // showing navigation to sub-table
    $scope.subTableFlash = function (x) {
        var checkCount = 0
        $('.modal_input').each(function (index) {
            if (this.checked == true) {
                checkCount = checkCount + 1
            }
        });
        switch (checkCount) {
            case 0: $scope.error[0] = "ابتدا ردیفی را انتخاب کنید";
                $("#error").modal();
                break;
            case 1: $scope.subTable(x)
                break;
            default: $scope.error[0] = "ردیف انتخابی نمیتواند بیشتر از یک مورد باشد";
                $("#error").modal();
                break;
        }
        if (checkCount == 0) {

        }
    }
    $scope.subTable = function (x) {
        $('.modal_input').each(function (index) {
            if (this.checked == true) {
                $scope.subTableId = this.value
            }
        });
        $scope.dataToShow = []
        for (var i = 0; i < $scope.limitedEdition.length; i++) {
            if ($scope.subTableId == $scope.limitedEdition[i].id) {
                $scope.dataToShow = $scope.limitedEdition[i].children
                break;
            }
        }
        $scope.limitedEdition = $scope.dataToShow;
        $scope.tableFormat();
    }
    // putting subsystem in cookie

    // select all checkbox
    $scope.inboxing = function () {
        if ($(".select").prop("checked") == true) {
            $(".modal_input").prop("checked", true);
        }
        else {
            $(".modal_input").prop("checked", false);
        }
    }
    // first page cookie for system page
    $scope.systemToLoad = function (x) {
        localStorage.setItem("parent_id", x);
        window.location.href = "portotype.min.html";
    }
    $scope.gettingSystem = function (x, y) {
        localStorage.setItem("parent_id", x);
        window.location.href = "system-page.min.html";
    }
    // top link part
    $scope.topLinking = function (x, path) {
        if (path == "system-page.min.html") {
            $scope.gettingSystem(x, 1);
        }
        else {
            var win = window.open(path, '_blank');
            win.focus();
        }
    }
    // add new note to note pad
    $scope.addThis = function (x, z) {
        var newItem = { title: "", id: "", content: "" }
        newItem.title = z;
        newItem.content = x;
        newItem.id = "mynote" + $scope.limitedNote.length + 1;
        $("#notetitle").val("");
        $("#notearea").val("");
        $scope.note.push(newItem);
        localStorage.setItem('note', JSON.stringify($scope.note));
    }
    // removing note from note pad
    $scope.removeItem = function (no, x) {
        if (no == 1) {
            $scope.message.splice(x, 1);
        }
        else if (no == 2) {
            $scope.note.splice(x, 1);
            localStorage.setItem('note', JSON.stringify($scope.note));
        }
    }
    // form data laoder
    $scope.radio = function (x) {
        $scope.numberType[0] = x;
    }
    $scope.tabledata = [];
    // button example
    // $http.get("data/buttonTest.json")
    //     .then(function (response) {
    //         $scope.buttons = response.data.buttons;
    //     })
    // $scope.genral = function (x) {
    //     $scope.loading = true;
    //     switch (x) {
    //         case 12:
    //             var firstItem = $("#firstInput").val();
    //             $scope.dataLoad(firstItem, 1, 1, 1, 1); break;
    //         case 13: console.log("second function"); break;
    //         case 14: console.log("third function"); break;
    //         case 15: console.log("forth function"); break;
    //         default: console.log("no function fund"); break;
    //     }
    // }
    //  reporting table data loader

    $scope.dataLoad = function (x) {
        // $scope.loading = true;
        $scope.paginationNumber = [];
        $scope.limitedEdition = [];
        $scope.dataToSend = [];

        $(".buttons").attr("disabled", "true");
        if (x[0] == undefined) {
            $scope.error[0] = "فرم نمیتواند خالی باشد";
            $("#error").modal();
        }
        for (var i = 0; i < x.length; i++) {
            $scope.dataToSend.push(x[i]);
        }
        $scope.dataToSend.push($("#pdp").val());
        $scope.dataToSend.push($("#pdp1").val());
        $http.get("data/table.json")
            .then(function (response) {
                $scope.loading = false;
                $scope.tabledata = response.data.table;
                $scope.pagination(1);
                $(".editor").css("display", "inline-block")
                var pageNumber;
                $scope.paginationNumber = []
                pageNumber = Math.ceil($scope.tabledata.length / 15);
                for (var conter = 1; conter < pageNumber + 1; conter++) {
                    $scope.paginationNumber.push(conter);
                }
                $(".buttons").prop("disabled", false);
            })
            .catch(function () {
                $scope.error[0] = "عدم دستیابی به اطلاعات";
                $("#error").modal();
            }); setTimeout(function () {
                $scope.loading = false;
                $(".buttons").prop("disabled", false);
            }, 10)
    }
    $scope.tableFormat = function () {
        for (var y = 0; y < $scope.limitedEdition.length; y++) {
            if ($scope.numberType[0] == 2) {
                $scope.limitedEdition[y].credit = $scope.limitedEdition[y].credit / 1000;
                $scope.limitedEdition[y].debt = $scope.limitedEdition[y].debt / 1000;
            }
            else if ($scope.numberType[0] == 3) {
                $scope.limitedEdition[y].credit = $scope.limitedEdition[y].credit / 1000000;
                $scope.limitedEdition[y].debt = $scope.limitedEdition[y].debt / 1000000;
            }
            if ($scope.limitedEdition[y].credit != undefined && $scope.limitedEdition[y].debt != undefined) {
                if (Number($scope.limitedEdition[y].credit) > Number($scope.limitedEdition[y].debt)) {
                    $scope.limitedEdition[y].remain = Number($scope.limitedEdition[y].credit) - Number($scope.limitedEdition[y].debt);
                    $scope.limitedEdition[y].situation = "بستانکار"

                }
                else if (Number($scope.limitedEdition[y].credit) < Number($scope.limitedEdition[y].debt)) {
                    $scope.limitedEdition[y].remain = Number($scope.limitedEdition[y].debt) - Number($scope.limitedEdition[y].credit);
                    $scope.limitedEdition[y].situation = "بدهکار"

                }
                else {
                    $scope.limitedEdition[y].remain = Number($scope.limitedEdition[y].debt) - Number($scope.limitedEdition[y].credit);
                    $scope.limitedEdition[y].situation = "-";
                }
            }
        }


    }
    // number float part adder to number string with camma
    $scope.float = function (x) {
        return (
            (x - Math.floor(x)).toFixed(2).toString().substring(2)
        )
    }
    // pagination display (currently only work for table data loader but it can expand to other json data)
    var currentpage
    $scope.pagination = function (x) {
        currentpage = x;
        var creditSum = 0;
        var debtSum = 0;
        var totalSum = 0;
        $(".pagination li").removeClass("active");
        $("#pagination" + x).addClass("active");
        $scope.limitedEdition = []
        var bottom = 15 * (x - 1);
        if (bottom + 15 < $scope.tabledata.length) {
            for (var i = 0; i < bottom + 15; i++) {
                if ($scope.tabledata[i].credit != undefined && $scope.tabledata[i].debt != undefined) {
                    creditSum = creditSum + $scope.tabledata[i].credit;
                    debtSum = debtSum + $scope.tabledata[i].debt;
                    $scope.tabledata[i].decimal = ($scope.tabledata[i].credit - Math.floor($scope.tabledata[i].credit)).toFixed(2);
                }
            }
            for (var counter = 0; counter < 15; counter++) {
                $scope.limitedEdition[counter] = $scope.tabledata[bottom + counter];
            }
        }
        else {
            for (var i = 0; i < $scope.tabledata.length; i++) {
                if ($scope.tabledata[i].credit != undefined && $scope.tabledata[i].debt != undefined) {
                    creditSum = creditSum + $scope.tabledata[i].credit;
                    debtSum = debtSum + $scope.tabledata[i].debt;
                    $scope.tabledata[i].decimal = ($scope.tabledata[i].credit - Math.floor($scope.tabledata[i].credit)).toFixed(2);
                }
            }
            for (var counter = 0; counter < $scope.tabledata.length - bottom; counter++) {
                $scope.limitedEdition[counter] = $scope.tabledata[bottom + counter];
            }
        }

        $timeout(function () {
            for (var i = 0; i < $scope.limitedEdition.length; i++) {
                if ($scope.limitedEdition[i].credit != undefined && $scope.limitedEdition[i].debt != undefined) {
                    $scope.limitedEdition[i].decimal = ($scope.limitedEdition[i].credit - Math.floor($scope.limitedEdition[i].credit)).toFixed(2);
                    if (($scope.limitedEdition[i].credit - Math.floor($scope.limitedEdition[i].credit)).toFixed(2) != 0) {
                        $("#credit" + $scope.limitedEdition[i].id).html($scope.numberFormat($scope.limitedEdition[i].credit.toString()) + "/" + $scope.float($scope.limitedEdition[i].credit));
                    }
                    else {
                        $("#credit" + $scope.limitedEdition[i].id).html($scope.numberFormat($scope.limitedEdition[i].credit.toString()));
                    }
                    if (($scope.limitedEdition[i].debt - Math.floor($scope.limitedEdition[i].debt)).toFixed(2) != 0) {
                        $("#debt" + $scope.limitedEdition[i].id).html($scope.numberFormat($scope.limitedEdition[i].debt.toString()) + "/" + $scope.float($scope.limitedEdition[i].debt));

                    }
                    else {
                        $("#debt" + $scope.limitedEdition[i].id).html($scope.numberFormat($scope.limitedEdition[i].debt.toString()));
                    }
                    if (($scope.limitedEdition[i].remain - Math.floor($scope.limitedEdition[i].remain)).toFixed(2) != 0) {
                        $("#remain" + $scope.limitedEdition[i].id).html($scope.numberFormat($scope.limitedEdition[i].remain.toString()) + "/" + $scope.float($scope.limitedEdition[i].remain));
                    }
                    else {
                        $("#remain" + $scope.limitedEdition[i].id).html($scope.numberFormat($scope.limitedEdition[i].remain.toString()));
                    }
                    if ($scope.limitedEdition[i].situation == "بستانکار" || $scope.limitedEdition[i].situation == "-") {
                        $("#remain" + $scope.limitedEdition[i].id).addClass("green");
                    }
                    else {
                        $("#remain" + $scope.limitedEdition[i].id).addClass("red");
                    }
                }
            }
            $scope.theme();
        }, 0);
        if (creditSum > debtSum) {
            $("#totalSituation").html("بستانکار");
            totalSum = creditSum - debtSum;
            $("#totalSum").addClass("green");
        }
        else {
            $("#totalSituation").html("بدهکار");
            totalSum = debtSum - creditSum;
            $("#totalSum").addClass("red");
        }
        creditSum = $scope.numberFormat(creditSum.toString()) + "/" + $scope.float(creditSum);
        debtSum = $scope.numberFormat(debtSum.toString()) + "/" + $scope.float(debtSum);
        totalSum = $scope.numberFormat(totalSum.toString()) + "/" + $scope.float(totalSum);
        $("#creditSum").html(creditSum);
        $("#debtSum").html(debtSum);
        $("#totalSum").html(totalSum);
        $scope.tableFormat();
    }
    $scope.pagingNumber;
    $scope.pageOrder = function (x, $event) {
        var evtobj = window.event ? event : $event;
        console.log(x);
        if (evtobj.keyCode == 13) {
            $scope.finalPagination(x, false, $scope.urlToGet);
        }

    }

    // users loading
    $scope.users = function () {
        var sendUser = {
            "Pn": 1,
            "Ps": $scope.pagelength,
            "Orders": [{ "Col": "Id", "Asc": true }]
        }
        $http({
            url: myhost + "/user",
            method: "POST",
            ContentType: 'application/x-www-form-urlencoded',
            data: sendUser,
            dataType: 'json',
            headers: authHeaders,
        }).then(function (response) {
            $scope.limitedEdition = response.data;
            $scope.editingLength = 0;
            $scope.editingUserData = $scope.limitedEdition[$scope.editingLength];
            var pageNumber;
            $scope.paginationNumber = [];
            $scope.rowsCount = $scope.limitedEdition[0].rowsCount
            pageNumber = Math.ceil($scope.rowsCount / $scope.pagelength);
            for (var conter = 1; conter < pageNumber + 1; conter++) {
                $scope.paginationNumber.push(conter);
            }
            $scope.paginationToShow(1);
        }).catch(function (xhr, status, error) {
            console.log(xhr);
            if (refreshtoken && xhr.status === 401) {
                $scope.refreshlocal($scope.users, 0);
            }
        })
        setTimeout(function () {
            $("#userpagination1").addClass("active");
        }, 400);
    }
    $scope.modalData = [];
    $scope.firstStep = 0;
    $scope.closingModal = function () {
        $(".modal").modal('hide');
        for(var i=0; i< $scope.modalData.length; i++){
            $scope.modalData[i] = false;
        }
        $(".modal-nth-table").css("display", "none");
        $("#tableMove").css("display", "block");
        console.log($scope.firstUrlTogo);
        $scope.finalPagination($scope.pageNumberToGo, false, $scope.firstUrlTogo);
    }
    $scope.detector = function ($event) {
        var evtobj = window.event ? event : $event;
        if (evtobj.keyCode == 27) {
            $(".modal").modal('hide');
            $(".modal-nth-table").css("display", "none");
            $("#tableMove").css("display", "block");
            for(var i=0; i< $scope.modalData.length; i++){
                $scope.modalData[i] = false;
            }
            $scope.finalPagination($scope.pageNumberToGo, false, $scope.firstUrlTogo);
        }
        if (evtobj.keyCode == 13) {
            // console.log("this is happening");
            // if ($(".paginationOrder").is(":focus")) {
            //     var page = $(".paginationOrder").val();
            //     console.log($scope.pagingNumber);
            //     $scope.finalPagination(page, false, $scope.urlToGet);
            // }
        }
        if ($event.altKey || evtobj.altKey) {
            if ($event.keyCode == 38) {
                if ($scope.editingLength > 0) {
                    $scope.editingLength--;
                }
                else {
                    $scope.editingLength = $scope.limitedEdition.length - 1;
                }
                $scope.editingUserData = $scope.limitedEdition[$scope.editingLength];
                $(".user").css("background-color", "#FFFFFF");

                $("#user" + $scope.editingUserData.id).css("background-color", "rgb(255,255,153)");

            }
            if ($event.keyCode == 40) {
                if ($scope.firstStep != 0 && $scope.editingLength < $scope.limitedEdition.length - 1) {
                    $scope.editingLength++;
                }
                else {
                    $scope.editingLength = 0;
                    $scope.firstStep = $scope.firstStep + 1;
                }
                $scope.editingUserData = $scope.limitedEdition[$scope.editingLength];
                $(".user").css("background-color", "#FFFFFF");
                $("#user" + $scope.editingUserData.id).css("background-color", "rgb(255,255,153)");
            }

            if ($event.keyCode == 13) {
                $("#tableEdit").modal();
                // $scope.puttingInsideInput();
                // $("#myFocus").blur();
            }
            if ($event.keyCode == 61) {
                $("#tablePlusUser").modal();
            }
            // if ($(".modal").hasClass("in")) {
            if ($event.keyCode == 190) {
                $scope.editUserSlide(-1);
            }
            if ($event.keyCode == 188 || $event.keyCode == 60) {
                $scope.editUserSlide(1);
            }
        }
        if ($event.keyCode == 39) {
            $scope.finalPagination($scope.currentPage - 1, false, $scope.urlToGet)
        }
        if ($event.keyCode == 37) {
            $scope.finalPagination($scope.currentPage + 1, false, $scope.urlToGet)
        }
        // if ($event.altKey || evtobj.altKey) {
        //     
        // }
        if ($event.keyCode == 27) {
            $(".modal").modal('hide');
            $("#myFocus").focus();
        }
    }
    $scope.currentPage = 1;
    $scope.pagelength = 5;
    $scope.search = [];
    $scope.simpleSearch = [];
    $scope.searchingresult = false;
    $scope.searchToSend = [];
    $scope.orgchartParent = function (x) {
        $scope.parent = x;
    }
    $scope.addingOrgChart = function () {
        var myid;
        $('.chart-check').each(function (index) {
            if (this.checked == true) {
                myid = this.value;
            }
        });
        for (var i = 0; i < $scope.limitedEdition.length; i++) {
            if (myid == $scope.limitedEdition[i].id) {
                $scope.orgChartToRegister = $scope.limitedEdition[i]
            }
        }
        $scope.modalPlus('tableMove', 'modal-second-table', true);
    }
    $scope.registerOrgChart = function (x) {
        var orgChart = {
            "Name": x,
            "ChartTypeId": $scope.orgChartToRegister.id,
            "ParentId": ""
        }
        if ($scope.parent == undefined) {
            orgChart.ParentId = null
        } else {
            orgChart.ParentId = $scope.parent.id
        }
        orgChart = JSON.stringify(orgChart);
        console.log(orgChart);
        $http({
            url: myhost + "/orgchart/Create",
            method: "POST",
            ContentType: 'application/json; charset = utf-8',
            data: orgChart,
            dataType: 'json',
            headers: authHeaders,
        }).then(function (response) {
            console.log(response)
        })
    }
    $scope.chartPath = [];
    $scope.orgchartChild = function (x, type, rowIndex) {
        var url;
        if (type == 'add') {
            $scope.chartPath.push(x);
            url = "/orgchart/get/" + x.id + "/childs";
        }
        else {
            $scope.chartPath = $scope.chartPath.slice(0, rowIndex);
            if (x.parentId == null) {
                url = "/orgchart/get/root/childs";
            }
            else{
                url = "/orgchart/get/" + x.parentId + "/childs";
            }
        }
        $scope.urlMaker(url);
        $scope.firsturlMaker(url);
    }
    $scope.gettingOrgChart = function (myUrl) {
        var pageNumber;
        var sendusers = {
            "Pn": 1,
            "Ps": $scope.pagelength,
            "Orders": [{ "Col": "Id", "Asc": true }]
        }
        $http({
            url: myhost + myUrl,
            method: "POST",
            ContentType: "application/json; charset = utf-8",
            data: JSON.stringify(sendusers),
            dataType: 'JSON',
            headers: authHeaders
        }).then(function (response) {
            $("#error-message").html("");
            console.log(response.data);
            $scope.searchingresult = false;
            $scope.limitedEdition = response.data;
            $scope.toshowEdit = $scope.limitedEdition[0];
            $scope.currentPage = 1;
            $scope.editingLength = 0;
            $scope.editingUserData = $scope.limitedEdition[$scope.editingLength];

            $scope.paginationNumber = [];
            $scope.rowsCount = $scope.limitedEdition[0].rowsCount
            pageNumber = Math.ceil($scope.rowsCount / $scope.pagelength);
            for (var conter = 1; conter < pageNumber + 1; conter++) {
                $scope.paginationNumber.push(conter);
            }
            $scope.paginationToShow(1);
        }).catch(function (xhr) {
            console.log("Error");
            console.log(xhr);
            if (xhr.status == 404) {
                $scope.currentPage = 1;
                $scope.paginationNumber = [];
                $scope.limitedEdition = [];
            }
        })
    }
    $scope.tableSearch = function (x) {
        for (var i = 0; i < x.length; i++) {
            if (x[i].Operation == undefined) {
                x[i].Operation = 'Contain';
            }
            if (x[i].Value != null) {
                if (x[i].Value != undefined && x[i].Value != '') {
                    $scope.searchToSend.push(x[i]);

                }
            }
        }
        var sendusers = {
            "Pn": 1,
            "Ps": $scope.pagelength,
            "Orders": [{ "Col": "Id", "Asc": true }],
            "WhereClauses": $scope.searchToSend
        }
        console.log($scope.searchToSend);
        $http({
            url: myhost + $scope.urlToGet,
            method: "POST",
            ContentType: "application/json; charset = utf-8",
            data: JSON.stringify(sendusers),
            dataType: 'JSON',
            headers: authHeaders
        }).then(function (response) {
            // $scope.orgchart = response.data;
            $scope.limitedEdition = response.data;
            $("#error-message").html(" ")
            $scope.toshowEdit = $scope.limitedEdition[0];
            $scope.currentPage = 1;
            $scope.editingLength = 0;
            $scope.editingUserData = $scope.limitedEdition[$scope.editingLength];
            var pageNumber;
            $scope.paginationNumber = [];
            $scope.rowsCount = $scope.limitedEdition[0].rowsCount
            pageNumber = Math.ceil($scope.rowsCount / $scope.pagelength);
            for (var conter = 1; conter < pageNumber + 1; conter++) {
                $scope.paginationNumber.push(conter);
            }
            $scope.paginationToShow(1);
            $scope.searchToKeep = $scope.searchToSend;
            $scope.searchToSend = [];
            $scope.searchingresult = true;
        }).catch(function (xhr) {
            $scope.searchToSend = [];
            if (xhr.status == 404) {
                $("#error-message").html("موردی با این مشخصات پیدا نشد")
            }
            console.log("Error");
            console.log(xhr);
        })
    }
    $scope.paginationRow = function (x) {
        $scope.pagelength = x;
        $scope.currentPage = 1;
        $(".pagination li").removeClass("active");
        // $scope.paginationNumber = [];
        $scope.paginationToShow(1);
        // $scope.pages = [];
        if (!$scope.searchingresult) {
            $scope.gettingOrgChart($scope.urlToGet);
        }
        else {
            $scope.tableSearch();
        }
        // $("#userpagination" + x).addClass("active");
    }
    $scope.searchPagination = function (x, y) {
        // for (var i = 0; i < $scope.search.length; i++) {
        //     if ($scope.search[i].Operation == undefined) {
        //         $scope.search[i].Operation = 'Contain';
        //     }
        //     if ($scope.search[i].Value != null) {
        //         if ($scope.search[i].Value != undefined && $scope.search[i].Value != '') {
        //             $scope.searchToSend.push($scope.search[i]);
        //         }
        //     }
        // }
        var sendusers = {
            "Pn": x,
            "Ps": $scope.pagelength,
            "Orders": [{ "Col": "Id", "Asc": true }],
            "WhereClauses": $scope.searchToKeep
        }
        $http({
            url: myhost + $scope.urlToGet,
            method: "POST",
            ContentType: "application/json; charset = utf-8",
            data: JSON.stringify(sendusers),
            dataType: 'JSON',
            headers: authHeaders
        }).then(function (response) {
            $scope.limitedEdition = response.data;
            $scope.toshowEdit = $scope.limitedEdition[0];
            $scope.currentPage = x;
            $scope.searchingresult = true;
            if (y != false) {
                if (y == 1) {
                    $scope.editingLength = 0;

                } else if (y == -1) {
                    $scope.editingLength = $scope.limitedEdition.length - 1;
                }
                $scope.editingUserData = $scope.limitedEdition[$scope.editingLength];
                // $scope.puttingInsideInput();
                setTimeout(function () {
                    $(".user").css("background-color", "#FFFFFF");
                    $("#user" + $scope.editingUserData.id).css("background-color", "rgb(255,255,125)");
                }, 100)
            }
            $(".paginationOrder").val("");
            setTimeout(function () {
                $(".user").css("background-color", "#FFFFFF");
                $("#user" + $scope.editingUserData.id).css("background-color", "rgb(255,255,125)");
            }, 100)
        }).catch(function (xhr) {
            if (xhr.status == 404) {
                alert("موردی با این مشخصات پیدا نشد");
            }
            console.log("Error");
            console.log(xhr);
        })
    }
    $scope.finalPagination = function (x, y, z) {

        // $scope.urlToGet = z;
        // $scope.currentPage = x;
        if ($scope.searchingresult) {
            $scope.searchPagination(x, y);
        }
        else {
            z = myhost + z;
            console.log("this is happening");
            console.log(z);
            console.log(x);
            if (x > 0 && x < $scope.paginationNumber.length + 1) {
                console.log("this is condition");
                $scope.firstStep = 0;
                $(".pagination li").removeClass("active");
                $("#userpagination" + x).addClass("active");

                var sendUser = {
                    "Pn": x,
                    "Ps": $scope.pagelength,
                    "Orders": [{ "Col": "Id", "Asc": true }]
                }
                console.log(sendUser);
                $http({
                    url: z,
                    method: "POST",
                    ContentType: 'application/x-www-form-urlencoded',
                    data: sendUser,
                    dataType: 'json',
                    headers: authHeaders
                }).then(function (response) {
                    $scope.limitedEdition = response.data;
                    console.log(response);
                    $scope.currentPage = x;
                    if (y != false) {
                        if (y == 1) {
                            $scope.editingLength = 0;

                        } else if (y == -1) {
                            $scope.editingLength = $scope.limitedEdition.length - 1;
                        }
                        $scope.editingUserData = $scope.limitedEdition[$scope.editingLength];
                        // $scope.puttingInsideInput();
                        setTimeout(function () {
                            $(".user").css("background-color", "#FFFFFF");
                            $("#user" + $scope.editingUserData.id).css("background-color", "rgb(255,255,125)");
                        }, 100)
                    }
                    $scope.paginationNumber = [];
                    $scope.rowsCount = $scope.limitedEdition[0].rowsCount
                    pageNumber = Math.ceil($scope.rowsCount / $scope.pagelength);
                    for (var conter = 1; conter < pageNumber + 1; conter++) {
                        $scope.paginationNumber.push(conter);
                    }
                    console.log(response);
                    $(".paginationOrder").val("");
                }).catch(function (xhr, status, error) {
                    if (refreshtoken && xhr.status === 401) {
                        $scope.refreshlocal($scope.finalPagination, x);
                    }
                    if (xhr.status == 404) {
                        $scope.currentPage = 1;
                        $scope.paginationNumber = [];
                        $scope.limitedEdition = [];
                    }
                })
                $scope.paginationToShow(x);
            }
        }
    }
    $scope.pageToGo = false;
    $scope.findPage = function (x) {
        if ($scope.pageToGo == false) {
            $("#pageLink").animate({ width: "160px" });
            $("#pageSpan").css("float", "left");
            $scope.pageToGo = true;
        }
        else {
            $("#pageLink").animate({ width: "39px" });
            $scope.pageToGo = false;
            $("#pageSpan").css("float", "none");
            if (x != 0) {
                $scope.finalPagination(x, false, $scope.urlToGet)
            }
        }
    }
    $scope.sharingForm = function () {
    }
    $scope.maxWindow = function () {
        $("#loadedPage").toggleClass('max-window');
        if ($("#loadedPage").hasClass('max-window')) {
            $("#min-window-right").css("z-index", "-1");
        }
        else {
            $("#min-window-right").css("z-index", "0");
        }
    }
    $scope.minWindow = function () {
        var j = 0;
        var newFolder = {
            pageId: $scope.currentPageId,
            value: $scope.currentValue,
            id: $scope.currentId
        }
        for (var i = 0; i < $scope.minimizedFolder.length; i++) {
            if ($scope.currentId == $scope.minimizedFolder[i].id) {
                j = j + 1;
            }
        }
        setTimeout(function () {
            if ($scope.minimizedFolder.length < 4 && j == 0) {
                $scope.minimizedFolder.unshift(newFolder);
            }
        }, 250)

        $scope.showContext()
        $(".min-anime").css("display", "block");
        $(".min-anime").delay(250).fadeOut();
        $scope.number = "modules/unload.html";
    }
    $scope.closeMin = function (x, y) {
        for (var i = 0; i < $scope.minimizedFolder.length; i++) {
            if (x == $scope.minimizedFolder[i].id) {
                if (y == 1) {
                    $scope.cartableReader($scope.minimizedFolder[i].id, $scope.minimizedFolder[i].value, $scope.minimizedFolder[i].pageId)
                }
                $scope.minimizedFolder.splice(i, 1)
            }
        }

    }
    $scope.finalBranch = [];
    $scope.reportTableRow = [];
    $scope.reportTable = [];
    $scope.mydrag = function (data, evt) {
    }
    $scope.makingTableReport = function (data, evt) {
        var flag = false;
        for (var i = 0; i < $scope.tree.length; i++) {
            if ($scope.tree[i].id == data) {
                for (var j = 0; j < $scope.reportTable.length; j++) {
                    if ($scope.reportTable[j].id == data) {
                        var flag = true
                    }
                }
                if (flag == false) {
                    $scope.reportTable.push($scope.tree[i]);
                }
            }
        }
    }
    $scope.myDrop = function (data, evt, x) {
        var flag = false;
        for (var i = 0; i < $scope.tree.length; i++) {
            if ($scope.tree[i].id == data) {
                for (var j = 0; j < $scope.finalBranch.length; j++) {
                    if ($scope.finalBranch[j].id == data) {
                        var flag = true
                    }
                }
                if (flag == false) {
                    $scope.finalBranch.push($scope.tree[i]);
                }
                // $scope.tree.splice(i, 1);
            }
        }
        // var flag = false;
        // var elementToPush = {
        //     name: '',
        //     id: ''
        // };
        // var colContainer = [];
        // for (var i = 0; i < $scope.tree.length; i++) {
        //     if ($scope.tree[i].id == data) {
        //         // for (var j = 0; j < $scope.finalBranch.length; j++) {
        //         //     if ($scope.finalBranch[j].id == data) {
        //         //         var flag = true
        //         //     }
        //         // }
        //         // if (flag == false) {
        //         //     $scope.finalBranch.push($scope.tree[i]);
        //         // }
        //         elementToPush.name = $scope.tree[i].name;
        //         elementToPush.id = $scope.tree[i].id;
        //     }
        // }
        // if ($scope.reportTable[x].col == undefined) {
        //     colContainer[0] = elementToPush;
        //     console.log(colContainer[0]);
        //     $scope.reportTable[x].col = colContainer;
        //     console.log($scope.reportTable[x].col);
        // }
        // else {
        //     $scope.reportTable[x].col.push(elementToPush);
        // }


        // $("table").jsdragtable();
        // Ps.initialize(document.getElementById('myDemo1'));
    }
    $scope.creatReportTitle = function (x) {
        if (x == undefined) {
            alert("عنوان گزارش نمیتواند خالی باشد");
        }
        else {
            $scope.reportTitle = x;
            $scope.reportTitling = true;
        }

    }
    $scope.makingTableRow = function (data, evt, x) {
        var flag = false;
        var elementToPush = {
            name: '',
            id: ''
        };
        var colContainer = [];
        for (var i = 0; i < $scope.tree.length; i++) {
            if ($scope.tree[i].id == data) {
                // for (var j = 0; j < $scope.finalBranch.length; j++) {
                //     if ($scope.finalBranch[j].id == data) {
                //         var flag = true
                //     }
                // }
                // if (flag == false) {
                //     $scope.finalBranch.push($scope.tree[i]);
                // }
                elementToPush.name = $scope.tree[i].name;
                elementToPush.id = $scope.tree[i].id;
            }
        }
        if ($scope.reportTable[x].row == undefined) {
            colContainer[0] = elementToPush;
            $scope.reportTable[x].row = colContainer;

        }
        else {
            $scope.reportTable[x].row.push(elementToPush);
        }
        // var flag = false;
        // for (var i = 0; i < $scope.tree.length; i++) {
        //     if ($scope.tree[i].id == data) {
        //         for (var j = 0; j < $scope.reportTableRow.length; j++) {
        //             if ($scope.reportTableRow[j].id == data) {
        //                 var flag = true
        //             }
        //         }
        //         if (flag == false) {
        //             $scope.reportTableRow.push($scope.tree[i]);
        //             $("#sortable" + $scope.tree[i].id).sortable();
        //             $("#sortable" + $scope.tree[i].id).disableSelection();
        //         }
        //     }
        // }
    }
    $scope.editSubmit = function (x) {
        if (x != undefined) {
            if (x.name != undefined) {
                $scope.editingUserData.personnel.name = x.name;
            }
            if (x.family != undefined) {
                $scope.editingUserData.personnel.family = x.family;
            }
            if (x.fatherName != undefined) {
                $scope.editingUserData.personnel.fatherName = x.fatherName;
            }
            if (x.birthCertificateNo != undefined) {
                $scope.editingUserData.personnel.birthCertificateNo = x.birthCertificateNo;
            }
            if (x.nationalCode != undefined) {
                $scope.editingUserData.personnel.nationalCode = x.nationalCode[0] + x.nationalCode[1] + x.nationalCode[2] + x.nationalCode[4] + x.nationalCode[5] + x.nationalCode[6] + x.nationalCode[7] + x.nationalCode[8] + x.nationalCode[9] + x.nationalCode[11];
            }
            if (x.personnelCode != undefined) {
                $scope.editingUserData.personnel.code = x.personnelCode;
            }
            if (x.phone != undefined) {
                $scope.editingUserData.user.MobileNo = x.phone;
            }
            if (x.email != undefined) {
                $scope.editingUserData.user.email = x.email;
            }
            if (x.passwordHash != undefined) {
                $scope.editingUserData.user.passwordHash = x.passwordHash;
            }
            if (x.isActive != undefined) {
                $scope.editingUserData.user.isActive = x.isActive;
            }
        }

        var Model = {
            User: $scope.editingUserData.user,
            Personnel: $scope.editingUserData.personnel
        }
        console.log(Model);
        $http({
            url: myhost + "/user/Update/UserPersonnel",
            method: "POST",
            ContentType: 'application/json; charset = utf-8',
            data: JSON.stringify(Model),
            dataType: 'json',
            headers: authHeaders,
        }).then(function (response) {
            $("#editMessage").html("تغییرات با موفقیت ثبت شد");
            $("#myFocus").focus();
        }).catch(function (xhr) {
            console.log(xhr);
            if (refreshtoken && xhr.status === 401) {
                $scope.refreshlocal($scope.editSubmit, x);
            }
            $("#editMessage").html(xhr.data);
        })
    }
    $scope.editUser = function (x, index) {
        $("#editMessage").html(" ")
        $(".user").css("background-color", "#FFFFFF");
        $("#user" + x).css("background-color", "rgb(255,255,153)");
        // for (var i = 0; i < $scope.limitedEdition.length; i++) {
        //     if ( $scope.limitedEdition[i].user != undefined && x == $scope.limitedEdition[i].user.id) {
        //         // $scope.editingUserData = $scope.limitedEdition[i];
        //         $scope.editingLength = i;
        //         $scope.puttingInsideInput();
        //         $scope.firstStep = 1;
        //     }
        //     else if(x == $scope.limitedEdition[i].id){
        //         $scope.editingLength = i;
        //         $scope.firstStep = 1;
        //     }
        // }
        $scope.editingUserData = $scope.limitedEdition[index];
        $scope.editingLength = index;
        $scope.firstStep = 1;
        // $scope.puttingInsideInput();
        $("#myFocus").focus();
    }
    // $scope.puttingInsideInput = function () {
    //     console.log("this is putting");
    //     console.log($scope.editingUserData);
    //     $("#edit-name").val($scope.editingUserData.personnel.name);
    //     $("#edit-family").val($scope.editingUserData.personnel.family);
    //     $("#edit-father").val($scope.editingUserData.personnel.fatherName);
    //     $("#edit-id-badge").val($scope.editingUserData.personnel.birthCertificateNo);
    //     $("#personnelCode").val($scope.editingUserData.personnel.code);
    //     $("#edit-social-no").val($scope.editingUserData.personnel.nationalCode);
    //     $("#edit-phone").val($scope.editingUserData.user.mobileNo);
    //     $("#edit-email").val($scope.editingUserData.user.email);
    //     $("#edit-user-name").val($scope.editingUserData.user.name);
    //     $("#edit-password").val($scope.editingUserData.user.passwordHash);
    //     $("#activation").val('' + $scope.editingUserData.user.isActive + '');
    //     $("input[name=gender][value=" + $scope.editingUserData.personnel.gender + "]").prop('checked', true);
    // }
    var currentpage = 1;
    $scope.editUserSlide = function (x) {

        if (x == 1) {
            if ($scope.editingLength + 2 > $scope.limitedEdition.length) {
                if (currentpage + 1 > $scope.paginationNumber[$scope.paginationNumber.length - 1]) {
                    $scope.finalPagination(1, 1, $scope.urlToGet);
                    return;

                }
                else {
                    $scope.finalPagination($scope.currentPage + 1, 1, $scope.urlToGet);
                    $scope.editingLength = 0;
                    return;
                }
            }
            else {
                $scope.editingLength = $scope.editingLength + 1;
                $scope.firstStep = 1;
            }
        }
        else {
            if ($scope.editingLength - 1 < 0) {
                $scope.finalPagination($scope.currentPage - 1, -1, $scope.urlToGet);
                return;

            }
            else {
                $scope.editingLength = $scope.editingLength - 1;
                $scope.firstStep = 1;
            }
        }
        $scope.editingUserData = $scope.limitedEdition[$scope.editingLength];
        // $scope.puttingInsideInput();
        $("#editMessage").html(" ")
        $(".user").css("background-color", "#FFFFFF");
        $("#user" + $scope.editingUserData.id).css("background-color", "rgb(255, 255, 153)");
    }
    $scope.socialNoFormat = function (x) {
        var a = x.split('.', 3);
        var d = a;
        var i = parseInt(a);
        var n = new String(a);
        var nn = n.substr(n.length - 1);
        var code = n[0] + n[1] + n[2] + "-" + n[3] + n[4] + n[5] + n[6] + n[7] + n[8] + "-" + n[9];
        return code;
    }
    $scope.fileSelect = function (x) {
        $("#" + x).click();
        $scope.imgLoading = true;
        $('#' + x).change(function (event) {
            $scope.readURL(this);
            $("#myimg").css("display", "block");
        });

    }
    $scope.readURL = function (input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('#myimg').attr('src', e.target.result);
            }

            reader.readAsDataURL(input.files[0]);
        }
    }
    $scope.searchFormToggle = function () {
        // $scope.search = [];
        $("#search-part").slideUp();
        $("#search-form").slideToggle();
        $scope.searchFlag = false;
    }
    $scope.fileList = [];
    $scope.ImageProperty = {
        file: ''
    }
    $scope.registerUser = function (x, y) {
        var files = $("#plusPhoto")[0].files;
        for (var i = 0; i < files.length; i++) {
            $scope.ImageProperty.file = files[i];
            $scope.fileList.push($scope.ImageProperty);
            $scope.ImageProperty = {};
        }
        var codeCheck = false;
        $("#registerAlarm").html(" ");
        $("#social-no").css("border", "1px solid #ccc");
        var code = x.nationalCode;
        var confirmCode = (Number(code[0]) * 10) + (Number(code[1]) * 9) + (Number(code[2]) * 8) + (Number(code[4]) * 7) + (Number(code[5]) * 6) + (Number(code[6]) * 5) + (Number(code[7]) * 4) + (Number(code[8]) * 3) + (Number(code[9]) * 2);
        var remain = confirmCode % 11;
        if (remain < 2) {
            if (remain == code[11] || 11 - remain == Number(code[11])) {
                codeCheck = true;
            }
            else {
                codeCheck = false;
            }
        }
        else {
            if (11 - remain == Number(code[11])) {
                codeCheck = true;
            }
            else {
                codeCheck = false;

            }
        }
        // var photo = new FormData();
        // var data = ($("#file"))[0].files[0];
        // angular.forEach(data, function (value, key) {
        //     photo.append(key, value);
        // })
        // if (codeCheck == true) {
        var person = {
            Name: x.name,
            Family: x.family,
            FatherName: x.fatherName,
            Code: x.personnelCode,
            NationalCode: code[0] + code[1] + code[2] + code[4] + code[5] + code[6] + code[7] + code[8] + code[9] + code[11],
            BirthCertificateNo: x.birthCertificateNo,
            Gender: x.gender
            // Photo: $scope.fileList[0].file
        }
        var user = {
            Email: x.mail,
            Name: x.userName,
            PasswordHash: x.passwordHash,
            MobileNo: x.mobileNo,
            IsActive: x.isActive
        }
        var Model = {
            User: user,
            Personnel: person
        }
        Model = JSON.stringify(Model);
        $http({
            url: myhost + "/user/Create/UserPersonnel",
            method: "POST",
            ContentType: 'application/json; charset = utf-8',
            data: Model,
            dataType: 'json',
            headers: authHeaders,
            eventHandlers: {
                progress: function (e) {
                    if (e.lengthComputable) {
                        $scope.progressBar = (e.loaded / e.total) * 100;
                        $scope.progressCounter = $scope.progressBar;
                        $("#myBar").css("top", "20%");
                        $("#loadingImage").removeClass('rotate');
                        $("#myBar").fadeIn();
                        var elem = document.getElementById("inside-progress")
                        // $scope.myinterval = setInterval($scope.myprogressBar(),20)
                        $scope.myinterval = $interval(
                            function () {

                                var elem = document.getElementById("myBar");
                                // var width = 1;
                                if ($scope.progressCounter >= 100) {
                                    $interval.cancel($scope.myinterval);
                                    $("#loadingImage").addClass('rotate');
                                    $("#myBar").delay(500).animate({ top: "-20%" });
                                    $("#myBar").delay(1000).fadeOut();
                                    // $("#myBar").css("display", "none");
                                } else {
                                    elem.style.height = $scope.progressCounter + '%';
                                    elem.style.top = 100 - $scope.progressCounter + '%';
                                }
                            }, 20);
                    }
                }
            }
        }).then(function (response) {
            $scope.paginationNumber = [];
            $scope.rowsCount++;
            pageNumber = Math.ceil($scope.rowsCount / $scope.pagelength);
            for (var conter = 1; conter < pageNumber + 1; conter++) {
                $scope.paginationNumber.push(conter);
            }
            if (x.close == 1) {
                $("#tablePlusUser").modal('toggle');
                $("#focusPlace").focus();
                $scope.responseAlarm("ثبت کاربران با موفقیت انجام شد");
            }
            else {
                $(".form-control").val('');
                $("#name").focus();
            }
            $scope.imgLoading = false;
            // $('#myimg').css();
        })
            .catch(function (xhr, status, error) {
                console.log(xhr);
                if (refreshtoken && xhr.status === 401) {
                    $scope.refreshlocal($scope.registerUser, x);
                }
                $("#registerAlarm").html(xhr.data);
            })
        $scope.paginationToShow(currentpage);
        // }
        // else {
        //     $("#registerAlarm").html("کد ملی معتبر نمیباشد");
        //     $("#social-no").css("border", "1px solid red");
        //     $("#social_no").focus();
        // }
    }
    $scope.responseAlarm = function (responeMessage) {
        // $scope.responsing = true;
        $scope.responeMessage = responeMessage;
        $("#response").fadeIn();
        $("#response").delay(3000).fadeOut();
        // setTimeout(function(){
        //     $scope.responsing = false;
        // }, 5000)
    }
    // pagination 5 to show
    $scope.paginationSlide = function (x) {
        if (x == -1) {
            if (currentpage != 1) {
                currentpage = currentpage - 1;
                $scope.paginationToShow(currentpage);
            }
        }
        else {

        }
    }
    $scope.paginationToShow = function (x) {
        if (x == "last") {
            x = $scope.paginationNumber.length
        }
        $scope.pages = [];
        if (x > 3) {
            if (x + 2 > $scope.paginationNumber.length) {
                for (var i = -5; i < 0; i++) {
                    $scope.pages.push($scope.paginationNumber[$scope.paginationNumber.length + i]);
                }
            }
            else {
                for (var i = -3; i < 2; i++) {
                    $scope.pages.push($scope.paginationNumber[x + i]);
                }
            }
        }
        else {
            if ($scope.paginationNumber.length > 5) {
                for (var i = 0; i < 5; i++) {
                    $scope.pages.push($scope.paginationNumber[i]);
                }
            }
            else {
                for (var i = 0; i < $scope.paginationNumber.length; i++) {
                    $scope.pages.push($scope.paginationNumber[i]);
                }
            }

        }
    }
    // adding camma after three digit function
    $scope.numberFormat = function (element) {
        var delimiter = ","; // replace comma if desired
        var a = element.split('.', 2);
        var d = a;
        var i = parseInt(a[0]);
        if (isNaN(i)) { return ''; }
        var minus = '';
        if (i < 0) { minus = '-'; }
        i = Math.abs(i);
        var n = new String(i);
        var a = [];
        while (n.length > 3) {
            var nn = n.substr(n.length - 3);
            a.unshift(nn);
            n = n.substr(0, n.length - 3);
        }
        if (n.length > 0) { a.unshift(n); }
        n = a.join(delimiter);
        if (d.length < 1) { element = n; }
        else { element = n; }
        element = minus + element;
        return element;
    }
    var countering = 0;
    // keyboard key event handler (currently work for demo but it may change in back-end matching level)
    $scope.checking = function (e) {
        if (e.which === 46) {
            $http.get("data/modal.json")
                .then(function (response) {
                    $scope.first = response.data.first;
                })
                .catch(function () {
                    $scope.error[0] = "عدم برقراری ارتباطات مجددا سعی کنید";
                    $("#error").modal();
                })
            $("#myModal").modal("toggle");
        }
        if (e.which === 43) {
            if (countering == 0) {
                $http.get("data/modal.json")
                    .then(function (response) {
                        $scope.first = response.data.second;
                    })
                    .catch(function () {
                        $scope.error[0] = "عدم برقراری ارتباطات مجددا سعی کنید";
                        $("#error").modal();
                    })
                countering = countering + 1;
                return;
            }
            else if (countering == 1) {
                $http.get("data/modal.json")
                    .then(function (response) {
                        $scope.first = response.data.third;
                    }).catch(function () {
                        $scope.error[0] = "خطا در دستیابی به اطلاعات";
                        $("#error").modal();
                    })
                countering = countering + 1;
            }
        }
        if (e.which == 45) {
            if (countering == 1) {
                $http.get("data/modal.json")
                    .then(function (response) {
                        $scope.first = response.data.first;
                    }).catch(function () {
                        $scope.error[0] = "خطا در دستیابی به اطلاعات";
                        $("#error").modal()
                    })
                countering = countering - 1;
                return;
            }
            else if (countering == 2) {
                $http.get("data/modal.json")
                    .then(function (response) {
                        $scope.first = response.data.second;
                    }).catch(function () {
                        $scope.error[0] = "خطا در دستیابی به اطلاعات";
                        $("#error").modal();
                    })
                countering = countering - 1;
                return;
            }
        }
    }
    $scope.eventNumber = 0;
    $scope.events = [];
    if (localStorage.event != undefined) {
        $scope.events = JSON.parse(localStorage.event);
    }
    var date = new Date();
    var month = (date.getMonth() + 1);
    var day = date.getDate();
    var year = date.getFullYear();
    var today = (year + '/' + month + '/' + day).toString();
    for (var i = 0; i < $scope.events.length; i++) {
        if ($scope.events[i].start == today) {
            $scope.eventNumber += 1;
        }
    }
    // event of day declaring
    // $http({
    //     method: "GET",
    //     url: "data/events.json",
    // }).then(function (response) {
    //     $scope.events = response;
    //     var date = new Date();
    //     var month = (date.getMonth() + 1);
    //     var day = date.getDate();
    //     var year = date.getFullYear();
    //     var today = (year + '/' + month + '/' + day).toString();
    //     for (var i = 0; i < $scope.events.length; i++) {
    //         if ($scope.events[i].start == today) {
    //             $scope.eventNumber += 1;
    //         }
    //     }
    // }).catch(function () {
    //     $scope.error[0] = "خطا در دستیابی به اطلاعات";
    //     $("#error").modal();
    // })
    // chat controller
    // $interval(function () {
    //     return $http.get("data/chat.json").then(function (response) {
    //         $scope.chat = response.data.message;
    //     })
    //         .catch(function () {
    //             $scope.error[0] = "خطا در دستیابی به اطلاعات";
    //             $("#error").modal();
    //         })
    // }, 5000);
    $scope.orderBy = function (x) {
        $scope.myorder = x;
    }
    // dorpdown
    $scope.subSystemSituation = [];
    $scope.drop = function (x) {
        for (var i = 0; i < $scope.subSystemSituation.length; i++) {
            if (x == $scope.subSystemSituation[i].id) {
                if ($scope.subSystemSituation[i].itemLoaded == 0) {

                    $http({
                        url: myhost + "/system/subsystem",
                        method: "GET",
                        params: {
                            parentId: x
                        },
                        headers: authHeaders,
                    }).then(function (response) {

                        $scope.itemToPush = response.data;
                        for (var i = 0; i < $scope.subSystemSituation.length; i++) {

                            if (x == $scope.subSystemSituation[i].id) {
                                if ($scope.subSystemSituation[i].itemLoaded == 0) {
                                    $scope.subSystemSituation[i].children = $scope.itemToPush;
                                    $scope.subSystemSituation[i].children = $scope.itemToPush;
                                }
                            }
                        }
                    }).catch(function (xhr, status, error) {
                        if (refreshtoken && xhr.status === 401) {
                            $scope.refreshlocal($scope.drop, x);
                        }
                    })
                }
            }
        }
        setTimeout(function () {
            $("#dropdown" + x).slideToggle();
        }, 100)

    }
    $scope.subSystem = function (x, y, leaf) {
        if (leaf == true) {
            $http({
                url: myhost + "/system/pages",
                method: "GET",
                params: {
                    systemId: y
                },
                headers: authHeaders,
            }).then(function (response) {
                $scope.mypages = response.data;
                $scope.systemslider = [];
            }).catch(function (xhr, error, response) {
                if (refreshtoken && xhr.status === 401) {
                    $scope.refreshlocal($scope.drop, x);
                }
            })
        }
        else {
            $http({
                url: myhost + "/system/subsystem",
                method: "GET",
                params: {
                    parentId: y
                },
                headers: authHeaders,
            }).then(function (response) {
                $scope.systemslider = response.data;
                $scope.mypages = [];
                // for (var i = 0; i < $scope.subSystemSituation.length; i++) {

                //     if (x == $scope.subSystemSituation[i].id) {
                //         if ($scope.subSystemSituation[i].itemLoaded == 0) {
                //             $scope.subSystemSituation[i].children = $scope.itemToPush;
                //             $scope.subSystemSituation[i].children = $scope.itemToPush;
                //         }
                //     }
                // }
            }).catch(function (xhr, status, error) {
                if (refreshtoken && xhr.status === 401) {
                    $scope.refreshlocal($scope.drop, x);
                }
            })
        }
        $(".top-slide").slideUp();
    }
    $scope.headerSlide = function (x, y, z, leaf, parentId) {
        $scope.treeToShow = [];
        $scope.limitedEdition = [];
        $scope.tabledata = [];
        $scope.paginationNumber = [];
        // for(var i = 0; i < subSystemSituation.length ; i++)
        if (leaf == true) {
            // $scope.table(z);
        }
        else {
            $http({
                url: myhost + "/system/subsystem",
                method: "GET",
                params: {
                    parentId: x
                },
                headers: authHeaders,
            }).then(function (response) {
                for (var i = 0; i < $scope.systemslider.length; i++) {
                    if (x == $scope.systemslider[i].id) {
                        $scope.systemslider[i].children.push(response.data);
                    }
                }
            }).catch(function (xhr, status, error) {
                if (refreshtoken && xhr.status === 401) {
                    $scope.refreshlocal($scope.drop, x);
                }
            })
            $("#" + x).slideToggle();
        }
        $("#nav").html(y);
        $("#subnav").html("");
    }
    // slider controller for subsystem in system-page.html 
    $scope.list_slide = function (title, id, path, leaf) {
        $("#creditSum").html("");
        $("#debtSum").html("");
        $("#totalSum").html("");
        $("#totalSituation").html("");
        if (leaf == true) {
            $scope.table(path);
        }
        else {
            $http({
                url: myhost + "/system/subsystem",
                method: "GET",
                params: {
                    parentId: id
                },
                headers: authHeaders,
            }).then(function (response) {
                for (var i = 0; i < $scope.systemslider.length; i++) {
                    for (var j = 0; j < $scope.systemslider[i].children.length; j++) {
                        if (x == $scope.systemslider[i].children[j].id) {
                            $scope.systemslider[i].children[j].children.push(response.data);
                        }
                    }

                }
            }).catch(function (xhr, status, error) {
                if (refreshtoken && xhr.status === 401) {
                    $scope.refreshlocal($scope.drop, x);
                }
            })
        }
        $("#" + id).slideToggle();
        // $("#" + list).toggleClass("flag")
        // if (children.length != 0 && children != undefined) {
        //     $("#" + list).slideToggle();
        //     if ($("#" + list).hasClass("flag")) {
        //         $("#subnav").append("<i class='fa fa-angle-left'></i>" + title);
        //     }
        //     else {
        //         $("#subnav").html(" ");
        //     }
        // }
        // else {
        //     $("#" + list).removeClass("flag");
        //     $("#subnav").append("<i class='fa fa-angle-left'></i>" + title);
        //     $scope.table(myid);
        // }
    };
    // directive for aris tag's template changer
    $scope.cartableReader = function (id, value, mypageId) {
        $scope.emailLoader = true;
        $scope.currentPageId = mypageId;
        $scope.currentId = id;
        $scope.currentValue = value;
        $scope.table(value, mypageId);
        for (var i = 0; i < $scope.reciveMails.length; i++) {
            if (id == $scope.reciveMails[i].id) {
                if ($scope.reciveMails[i].read == false) {
                    $scope.reading = $scope.reading - 1;
                }
                $scope.reciveMails[i].read = true;
            }
        }
    }
    $scope.table = function (value, mypageId) {
        $scope.currentPageId = mypageId;
        $scope.currentValue = value;
        $(".leaf").removeClass("myselect");
        $("#leaf" + mypageId).addClass("myselect");
        // $scope.number = "modules/" + value;
        // var mydata = {
        //     pageId: mypageId
        // }
        // $scope.number = "modules/" + value;
        $http({
            url: myhost + "/system/page/" + mypageId + "/elements",
            method: "GET",
            ContentType: 'application/x-www-form-urlencoded',
            dataType: 'json',
            headers: authHeaders,
        }).then(function (response) {
            $scope.permission = response.data;
            $scope.currentPage = 1;
            $scope.number = "modules/" + value;
        }).catch(function (xhr, error) {
            console.log(xhr);
            if (refreshtoken && xhr.status === 401) {
                // $scope.refreshlocal($scope.drop, x);
            } else if (xhr.status == 404) {
                $scope.permission = [];
                $scope.currentPage = 1;
                $scope.number = "modules/" + value;
            }
        })
    }
    $scope.isAuth = function (name, permission) {
        for (var i = 0; i < $scope.permission.length; i++) {
            if ($scope.permission[i].elementName == name) {
                if (($scope.permission[i].permission & permission) == permission) {
                    return true;
                }
                else {
                    return false;
                }
            }
        }
    }

    $scope.orgchart = [];
    $scope.orgchartDelete = function () {
        $('.chart-check').each(function (index) {
            if (this.checked == true) {
                var myid = this.value;
                $http({
                    url: myhost + "/orgcharttype/Delete/" + myid,
                    method: "POST",
                    ContentType: 'application/json; charset = utf-8',
                    dataType: 'JSON',
                    headers: authHeaders
                }).then(function (response) {
                    for (var i = 0; i < $scope.limitedEdition.length; i++) {
                        if (myid == $scope.limitedEdition[i].id) {
                            $scope.limitedEdition.splice(i, 1);
                        }
                        $("#tableDelete").modal('hide');
                    }

                }).catch(function (xhr, status, error) {
                    console.log(xhr);
                })
            }
        });
    }
    $scope.orgchartUpdate = function (x) {
        if (x.name == undefined) {
            x.name = $scope.editingUserData.name;
        }
        if (x.chartType == undefined) {
            x.chartType = $scope.editingUserData.chartType;
        }
        if (x.assignType == undefined) {
            x.assignType = $scope.editingUserData.assignType;
        }
        var data = {
            "name": x.name,
            "chartType": x.chartType,
            "assignType": x.assignType,
            "id": $scope.editingUserData.id
        };
        data = JSON.stringify(data);
        $http({
            url: myhost + "/orgcharttype/Update",
            method: "POST",
            data: data,
            ContentType: 'application/json; charset = utf-8',
            dataType: 'JSON',
            headers: authHeaders
        }).then(function (response) {
            $scope.gettingOrgChart('/orgcharttype/get');
        }).catch(function (xhr) {
            console.log(xhr);
        })
    }
    $scope.orgChartRegister = function (x) {
        var item = {
            "name": x.chartname,
            "chartType": x.charttype,
            "assignType": x.Assigntype
        }
        $http({
            url: myhost + "/orgcharttype/create",
            method: "POST",
            data: JSON.stringify(item),
            ContentType: 'application/json; charset = utf-8',
            dataType: 'JSON',
            headers: authHeaders
        }).then(function (response) {
            $scope.gettingOrgChart('/orgcharttype/get')

        }).catch(function (xhr, status, error) {
            console.log(xhr);
            if (xhr.status == 422) {
                $("#tablePlus").modal('toggle');
                $scope.error[0] = xhr.data;
                $("#error").modal();
            }
        })
    }
    $scope.firsturlMaker = function (url) {
        $scope.firstUrlTogo = url;
    }
    $scope.urlMaker = function (url) {
        $scope.urlToGet = url;
        $scope.gettingOrgChart($scope.urlToGet);
    }

    // cartable part 
    $scope.myDatePicker = function () {
        $(".elementClass").persianDatepicker();
    }
    $scope.favCartable = function (x) {
        for (var i = 0; i < $scope.cartable.length; i++) {
            if (x == $scope.cartable[i].id) {
                if ($scope.cartable[i].fav == false) {
                    $scope.cartable[i].fav = true;
                }
                else {
                    $scope.cartable[i].fav = false;
                }

            }
        }
    }
    // chat area
    $scope.chatting = function (reciver) {
        $scope.newChat = {
            "sender": " ", "content": "", "type": "", "reciver": ""
        }
        if (reciver == undefined) {
            alert("برای آغاز گفتگو یک فرد را باید انتخاب کنید")
        }
        $scope.newChat.content = $("#chattext").val();
        $scope.newChat.reciver = reciver;
        $scope.newChat.type = 'send';
        $scope.chat.push($scope.newChat);
        $("#chattext").val("");
        setTimeout(function () {
            $("#chatarea").scrollTop = $("#chatarea").scrollHeight;
        }, 100);
    }
    $scope.tableFontSize = 14;
    $scope.tableSetting = false;
    $scope.tableSetting1 = false;
    $scope.tableSettingFunction = function (x) {
        if (x == 0) {
            if ($scope.tableSetting == false) {
                $scope.tableSetting = true;

            }
            else {
                $scope.tableSetting = false;
            }
        }
        else if (x == 1) {
            if ($scope.tableSetting1 == false) {
                $scope.tableSetting1 = true;

            }
            else {
                $scope.tableSetting1 = false;
            }
        }

    }
    $scope.secondTable = false;
    $scope.filling = function (x) {
        $("#post-type").val(x);
    }
    $scope.modalPlus = function (x, y, z) {
        if (z == false) {
            if (y == 'modal-second-table') {
                $scope.modalData[0] = true;
                $scope.pageNumberToGo = $scope.currentPage;
            }
            $("#" + x).addClass("table-moving-left");
            $("#" + y).css("display", "block");
            $("#" + y).addClass("table-moving-right");
            $scope.secondTable = true;
            setTimeout(function () {
                $("#" + x).css("display", "none");
                $("#" + x).removeClass("table-moving-left")
                $("#" + y).removeClass("table-moving-right")
            }, 1000)
        }
        else {
            $scope.userPlus = false;
            $("#" + y).addClass("table-moving-right1");
            $("#" + x).addClass("table-moving-left1");
            $("#" + x).css("display", "block");
            setTimeout(function () {
                $("#" + y).removeClass("table-moving-right1");
                $("#" + y).css("display", "none");
                $("#" + x).removeClass("table-moving-left1");
            }, 1000)
        }
    }
    // $scope.setFont = function(){
    //     console.log($scope.tableFontSize)
    //     $("#fontRange").val($scope.tableFontSize);
    //     console.log($("#fontRange").val())
    // }
    $scope.tablefontChange = function (size) {
        $("#fontRange").val($scope.tableFontSize);
        // $("tr").css("font-size",size+"px");
        $scope.tableFontSize = size;
        $scope.tableFont = {
            "font-size": size + "px"
        }
    }
    $scope.searchToggle = function () {
        // $scope.search = [];
        $("#search-part").slideToggle();
        $("#search-form").slideUp();
        if ($scope.searchFlag) {
            $scope.searchFlag = false;
        }
        else {
            $scope.searchFlag = true;
        }
    }
    $scope.fontChanger = function (element) {
        $(".fa-check-circle-o").addClass("hide");
        switch (element) {

            case '1':

                $scope.testfont = {
                    "font-family": "samim"
                };
                localStorage.setItem('font', JSON.stringify($scope.testfont));
                $("#firstcheck").removeClass("hide");
                break;
            case '2':
                $scope.testfont = {
                    "font-family": "iran-sans"
                };
                localStorage.setItem('font', JSON.stringify($scope.testfont));
                $("#secondcheck").removeClass("hide");
                break;
            case '3':
                $scope.testfont = {
                    "font-family": "dubai"
                };
                localStorage.setItem('font', JSON.stringify($scope.testfont));
                $("#thirdcheck").removeClass("hide");
                break;
            case '4':
                $scope.testfont = {
                    "font-family": "shabnam"
                };
                localStorage.setItem('font', JSON.stringify($scope.testfont));
                $("#forthcheck").removeClass("hide");
                break;
            case '5':
                $scope.testfont = {
                    "font-family": "sahel"
                };
                localStorage.setItem('font', JSON.stringify($scope.testfont));
                $("#fifthcheck").removeClass("hide");
                break;
        }
        $scope.theme();
    }
    $scope.screen = function (x) {
        switch (x) {
            case 'یک دقیقه': $scope.time = 1000; break;
            case 'دو دقیقه': $scope.time = 2000; break;
            case 'سه دقیقه': $scope.time = 3000; break
        }
    }
    $scope.colorChanger = function (element) {
        $(".color-icon").css("display", "none");
        $("#color" + element).css("display", "inline-block");
        switch (element) {
            case '1':
                localStorage.setItem('userColor', "first-color");
                localStorage.setItem('userSubColor', "first-subcolor");
                localStorage.setItem('userSystemColor', "first-systemcolor");
                $scope.userColor = "first-color";
                $scope.userSubColor = "first-subcolor";
                $scope.userSystemColor = "first-systemcolor";
                break;
            case '2':
                localStorage.setItem('userColor', "second-color");
                localStorage.setItem('userSubColor', "second-subcolor");
                localStorage.setItem('userSystemColor', "second-systemcolor");
                $scope.userColor = "second-color";
                $scope.userSubColor = "second-subcolor";
                $scope.userSystemColor = "second-systemcolor";
                break;
            case '3':
                localStorage.setItem('userColor', "third-color");
                localStorage.setItem('userSubColor', "third-subcolor");
                localStorage.setItem('userSystemColor', "third-systemcolor");
                $scope.userColor = "third-color";
                $scope.userSubColor = "third-subcolor";
                $scope.userSystemColor = "third-systemcolor";
                break;

        }
        // $scope.colorTheme = element;
        // $scope.theme();
    }
    // aside opening
    $scope.sideBar = function (x) {
        $(".side-tool p .fa-close").css("display", "block");
        $scope.sidecontainer(x);
        if (window.innerWidth > 768) {
            $(".side-tool").animate({ width: "30%" }, 'slow');
        }
        else {
            $(".side-tool").animate({ width: "90%" }, 'slow');
        }

        // $(".side-filter").animate({ width: "318px" }, 'slow');
        // $(".container-filter a").css("pointer-events", 'none');
        // $("nav a").css("pointer-events", 'none');
        // $("nav i").css("pointer-events", 'none');
    }
    // $scope.mainSystem = function () {
    //     $("#mainSystems").modal();
    // }
    $scope.side = "note2.html";
    // fullfiling aside (calnedar and note and top link container)
    $scope.sidecontainer = function (x) {
        if (x == 1) {
            if (localStorage.note != undefined) {
                $scope.note = JSON.parse(localStorage.note);
            }

            $http({
                method: "GET",
                url: "data/note.json",
                // transformRequest: angular.identity,
                // eventHandlers: {
                //     progress: function (e) {
                //         if (e.lengthComputable) {
                //             $scope.progressBar = (e.loaded / e.total) * 100;
                //             $scope.progressCounter = $scope.progressBar;
                //             $scope.interval = setInterval($scope.myprogressBar(), 20);
                //         }
                //     }
                // }
            }).then(function (response) {
                // $scope.note = response.data.note;
                $scope.message = response.data.message;
                $scope.alarm = response.data.alarm;
                // for (var i = 0; i < 3; i++) {
                //     $scope.limitedNote.push($scope.note[i]);
                // }
            });
            $scope.side = "note2.html";
        }
        if (x == 2) {
            var myevent
            $http.get("data/events.json").then(function (response) {
                $('[data-toggle="tooltip"]').tooltip();
                myevent = response;
                var firstLoad = true;
            });
            $scope.side = "calendar2.html";
        }
        if (x == 3) {
            $http.get("data/link.json")
                .then(function (response) {
                    $scope.link = response.data.link;
                })
            $scope.side = "link.html";
        }
    }
    // closing aside
    $scope.closingExtraInfo = function () {
        // $(".extra-info").css("display","none");
        $scope.extraInfo = false;
    }
    $scope.sideBarClose = function () {
        $(".side-tool").animate({ width: "0px" });
        $(".side-tool p .fa-close").css("display", "none");
        $(".side-filter").animate({ width: "0px" });
        $(".container-filter a").css("pointer-events", '');
        $("nav a").css("pointer-events", '');
        $("nav i").css("pointer-events", '');
        $(".effect").css("filter", "none");
    }
    $scope.mydate = function () {
        var week = new Array("يكشنبه", "دوشنبه", "سه شنبه", "چهارشنبه", "پنج شنبه", "جمعه", "شنبه");
        var months = new Array("فروردين", "ارديبهشت", "خرداد", "تير", "مرداد", "شهريور", "مهر", "آبان", "آذر", "دي", "بهمن", "اسفند");
        var a = new Date();
        var d = a.getDay();
        var day = a.getDate();
        var month = a.getMonth() + 1;
        var year = a.getYear();
        year = (year == 0) ? 2000 : year;
        (year < 1000) ? (year += 1900) : true;
        year -= ((month < 3) || ((month == 3) && (day < 21))) ? 622 : 621;
        switch (month) {
            case 1: (day < 21) ? (month = 10, day += 10) : (month = 11, day -= 20); break;
            case 2: (day < 20) ? (month = 11, day += 11) : (month = 12, day -= 19); break;
            case 3: (day < 21) ? (month = 12, day += 9) : (month = 1, day -= 20); break;
            case 4: (day < 21) ? (month = 1, day += 11) : (month = 2, day -= 20); break;
            case 5:
            case 6: (day < 22) ? (month -= 3, day += 10) : (month -= 2, day -= 21); break;
            case 7:
            case 8:
            case 9: (day < 23) ? (month -= 3, day += 9) : (month -= 2, day -= 22); break;
            case 10: (day < 23) ? (month = 7, day += 8) : (month = 8, day -= 22); break;
            case 11:
            case 12: (day < 22) ? (month -= 3, day += 9) : (month -= 2, day -= 21); break;
            default: break;
        }
        $scope.myday = day;
        $scope.myMonth = months[month - 1];
        $scope.dayname = week[d];
    }
    $scope.newMonth = function (x) {
        if (month == 12 && x == 1) {
            month = 1;
        }
        else if (month == 1 && x == -1) {
            month = 12;
        }
        else {
            month += x;
        }
        $scope.myMonth = months[month - 1];
    }
    $scope.treeToShow = []
    // first level of showing tree's nodes
    $scope.gettingTree = function () {
        // Ps.initialize(document.getElementById('lookup'));
        $scope.treeToShow = [];
        $http.get("data/tree.json").then(function (response) {
            $scope.tree = response.data.tree;
            for (var i = 0; i < $scope.tree.length; i++) {
                if ($scope.tree[i].parent == null) {
                    $scope.treeToShow.push($scope.tree[i])
                }
            }
        })
    }
    // slideing next level of tree for first time it get data from sever and in next steps it just slide 
    $scope.nodeSlide = function (x) {

        if ($("#tree" + x).hasClass("flag")) {
            $("#tree" + x).slideToggle();
        }
        else {
            $scope.creatingNode(x);
            $("#tree" + x).addClass("flag");
        }
        $("#treeIcon" + x).toggleClass("flag")
        if ($("#treeIcon" + x).hasClass("flag")) {
            $("#treeIcon" + x).removeClass("fa-folder-o")
            $("#treeIcon" + x).addClass("fa-folder-open-o")
        } else {
            $("#treeIcon" + x).removeClass("fa-folder-open-o")
            $("#treeIcon" + x).addClass("fa-folder-o")

        }
    }
    $scope.chartTree = [];
    $scope.chartTreeMaker = function (item, person, parent) {
        var id;
        var icon;
        if (person == 0) {
            icon = "fa-ban";
        } else if (person == 1) {
            icon = "fa-user";
        }
        else {
            icon = "fa-users";
        }
        if ($scope.chartTree.length != 0) {
            id = $scope.chartTree.length * -1;
        }
        else {
            id = 0;
        }
        var itemToPush = {
            "name": item,
            "person": person,
            "id": id,
            "parent": parent,
            "icon": icon
        }
        $scope.chartTree.push(itemToPush);
        $scope.treeFirstItem = true;
        $scope.chartTreeAppend(parent);
        // if(parent == null){
        //     $scope.chartTreeAppend('first');
        // }
        // else{
        //     
        // }

    }
    $scope.chartTreeUpdate = function (x, y, z) {
        if (x != undefined) {
            $scope.chartTree[z].name = x;
        }
        if ($scope.fatherToChange != 'nochange' && $scope.fatherToChange != undefined) {
            $scope.chartTree[z].parent = $scope.fatherToChange;
        }

        if (y == 0) {
            $scope.chartTree[z].icon = "fa-ban"
        }
        else if (y == 1) {
            $scope.chartTree[z].icon = "fa-user"
        }
        else {
            $scope.chartTree[z].icon = "fa-users"
        }
        $scope.chartTreeAppend(0);
        $scope.fatherChange = false;
        $("#drag" + $scope.fatherToChange).removeClass("redNode");
        $scope.fatherToChange = 'nochange';
        $("input").val("");
    }
    $scope.edit = "edit";
    $scope.update = "update";
    $scope.testData;
    $scope.test1 = function (x) {
        $scope.testData = x;
    }
    $scope.chartTreeAppend = function (x) {
        $("#chart-tree-" + x).html("");
        for (var i = 0; i < $scope.chartTree.length; i++) {
            if ($scope.chartTree[i].parent == x) {
                $("#chart-tree-" + x).append(
                    $compile(
                        "<div class='chart-tree-view' >\
                            <div class='formal-chart formal-chart-right-border' >\
                                <div class='row'  ng-drop='true' ng-drop-success='chartDrop($data,$event,0)'>\
                                    <div class='col-sm-12 drag' id='drag"+ $scope.chartTree[i].id + "' ng-mouseenter='test1(" + i + ")' ng-click='selectedFather(" + $scope.chartTree[i].id + ")' ng-class='userColor' ng-drag-end='test()' draggable='true' ng-drag-data='" + i + "' ng-drag='true'>\
                                        <div class='row'>\
                                            <div class='col-sm-4 left-align'>\
                                                <i class='fa fa-close pointer' ng-click='chartDelete("+ $scope.chartTree[i].id + ")'></i>\
                                            </div>\
                                            <div class='col-sm-8 right-align'>\
                                                <i class='fa fa-pencil pointer' ng-click='showingEdit("+ $scope.chartTree[i].id + "," + $scope.update + ")'></i>\
                                                <i class='fa fa-ellipsis-h pointer' ng-click='showingEdit("+ $scope.chartTree[i].id + "," + $scope.edit + ")'></i>\
                                            </div>\
                                            <div class='clearfix'></div>\
                                            <div class='col-sm-4 left-align'>\
                                                <i class='fa "+ $scope.chartTree[i].icon + "'></i>\
                                            </div>\
                                            <div class='co-sm-8 center'>\
                                                <span class='pointer' data-toggle='collapse' data-target='#chart-tree-"+ $scope.chartTree[i].id + "'>\
                                                    "+ $scope.chartTree[i].name + "\
                                                </span>\
                                            </div>\
                                        </div>\
                                    </div>\
                                    <div class='clearfix'></div>\
                                </div>\
                                <div class='formal-chart-edit hide' id='chart-update-"+ $scope.chartTree[i].id + "'>\
                                    <div class='row'>\
                                        <div class='col-sm-12 left-align'>\
                                            <i class='fa fa-close' ng-click=closeEdit("+ $scope.chartTree[i].id + "," + $scope.update + ")></i>\
                                        </div>\
                                        <div class='col-sm-12 center'>\
                                            <button class='btn btn-danger' ng-click='chartTreeFather()'>تغییر سردسته</button>\
                                        </div>\
                                        <div class='clearfix'></div>\
                                        <div class='col-sm-8 my-margin-top'>\
                                            <input type='text' ng-model='updateName' placeholder='"+ $scope.chartTree[i].name + "' class='form-control' ng-model='itemName'>\
                                        </div>\
                                        <div class='col-sm-4 left-align my-margin-top' style='padding: 0'>\
                                            <label>نام زیر دسته :</label>\
                                        </div>\
                                        <div class='clearfix'></div>\
                                        <div class='col-sm-8  my-margin-top'>\
                                            <select ng-model='updatePerson'  style='height: 30px;width: 100% !important;font-size: 12px' ng-model='type'\
                                                class='form-control my-form' name='kindDocument'>\
                                                <option value=0  selected>ندارد</option>\
                                                <option value=1 >تک نفر</option>\
                                                <option value=2 >چند گانه</option>\
                                            </select>\
                                        </div>\
                                        <div class='col-sm-4 left-align  my-margin-top' style='padding: 0'>\
                                            <label>انتصاب فرد :</label>\
                                        </div>\
                                        <div class='clearfix'></div>\
                                        <div class='col-sm-8 my-margin-top left-align'>\
                                            <button class='btn btn-primary' ng-click='chartTreeUpdate(updateName,updatePerson, "+ i + ")'>\
                                                    ثبت تغییرات  \
                                            </button>\
                                        </div>\
                                    </div>\
                                </div>\
                                <div class='formal-chart-edit hide' id='chart-edit-"+ $scope.chartTree[i].id + "'>\
                                    <div class='row'>\
                                        <div class='col-sm-12 left-align'>\
                                            <i class='fa fa-close' ng-click=closeEdit("+ $scope.chartTree[i].id + "," + $scope.edit + ")></i>\
                                        </div>\
                                        <div class='clearfix'></div>\
                                        <div class='col-sm-8 my-margin-top'>\
                                            <input type='text' onclick='this.select()' class='form-control'ng-model='itemName'>\
                                        </div>\
                                        <div class='col-sm-4 left-align my-margin-top'>\
                                            <label>نام زیر دسته :</label>\
                                        </div>\
                                        <div class='clearfix'></div>\
                                        <div class='col-sm-8  my-margin-top'>\
                                            <select style='height: 30px;width: 100% !important;font-size: 12px' ng-model='person' class='form-control my-form' name='kindDocument'>\
                                                    <option value=0  selected>ندارد</option>\
                                                    <option value=1 >تک نفر</option>\
                                                    <option value=2 >چند گانه</option>\
                                                </select>\
                                        </div>\
                                        <div class='col-sm-4 left-align  my-margin-top'>\
                                            <label>انتصاب فرد :</label>\
                                        </div>\
                                        <div class='clearfix'></div>\
                                        <div class='col-sm-8 left-align my-margin-top'>\
                                            <button class='btn btn-primary' ng-click='chartTreeMaker(itemName,person,"+ $scope.chartTree[i].id + ")'>\
                                                    ایجاد زیر دسته\
                                                </button>\
                                        </div>\
                                    </div>\
                                </div>\
                            </div>\
                            <div class='clearfix'></div>\
                            <div class='chart-tree-border collapse in' id='chart-tree-"+ $scope.chartTree[i].id + "'></div>\
                        </div>"
                    )($scope)
                )
                for (var j = 0; j < $scope.chartTree.length; j++) {
                    if ($scope.chartTree[j].parent == $scope.chartTree[i].id) {
                        $scope.chartTreeAppend($scope.chartTree[i].id);
                    }
                }
            }
        }
    }
    $scope.fatherChange = false;
    $scope.chartTreeFather = function () {
        $scope.fatherChange = true;
    }
    $scope.selectedFather = function (x) {
        var condition = false;
        if ($scope.fatherChange) {
            if ($("#drag" + x).hasClass("redNode")) {
                condition = true;
                $scope.fatherToChange = 'nochange';
            }
            else {
                $scope.fatherToChange = x;
            }

            if (condition == true) {
                $("#drag" + x).removeClass("redNode");
            }
            else {
                $(".drag").removeClass("redNode");
                $("#drag" + x).addClass("redNode");
            }
        }

    }
    $scope.showingEdit = function (x, y) {
        $(".formal-chart-" + y).addClass("hide");
        $("#chart-" + y + "-" + x).removeClass("hide");
    }
    $scope.closeEdit = function (x, y) {
        $("#chart-" + y + "-" + x).addClass("hide");
        $("input").val("");
    }
    $scope.chartDelete = function (x) {
        var id;
        var child = 0;
        for (var j = 0; j < $scope.chartTree.length; j++) {
            if ($scope.chartTree[j].parent == x) {
                child = child + 1;
            }
        }
        if (child > 0) {
            $scope.error[0] = "شما نمیتوانید سرشاخه را حذف کنید";
            $("#error").modal();
        }
        else {
            for (var i = 0; i < $scope.chartTree.length; i++) {
                if ($scope.chartTree[i].id == x) {
                    id = $scope.chartTree[i].parent
                    $scope.chartTree.splice(i, 1);
                    $scope.chartTreeAppend(id);
                }
            }
        }
    }
    $scope.test = function () {
    }
    $scope.chartDrop = function (data, evt, parent) {
        $scope.chartTree[$scope.testData].parent = parent;
        $scope.chartTreeAppend(0);
    }
    // creating second level and deeper levels by using laoded data
    $scope.creatingNode = function (x) {
        $("#tree" + x).html("")
        for (var i = 0; i < $scope.tree.length; i++) {
            if ($scope.tree[i].parent == x) {
                if ($scope.tree[i].leaf == false) {
                    // $("#tree" + x).append($compile("<div class='tree-view' ><span ng-drag='true' ng-drag-data='"+$scope.tree[i].id+"' ng-drag-success='mydrag($data,$event);' class='tree-span fontchange' id='treeRow" + $scope.tree[i].id + "' ng-click='selectingTree(" + $scope.tree[i].id + ")'>" + $scope.tree[i].name + "</span><input type='checkbox' style='display:none'><i class='fa fa-angle-down pointer' id='treeIcon" + $scope.tree[i].id + "' ng-click='nodeSlide(" + $scope.tree[i].id + ")'></i><div id='tree" + $scope.tree[i].id + "'></div></div><div class='clearfix'></div>")($scope))
                    $("#tree" + x).append($compile("<div class='tree-view' ><span ng-drag='true' style='margin-right:0px' ng-drag-data='" + $scope.tree[i].id + "' ng-drag-success='mydrag($data,$event);' class='tree-span fontchange' id='treeRow" + $scope.tree[i].id + "' style='cursor:grab'>" + $scope.tree[i].name + "</span><i style='margin-left:-12px' class='fa fa-folder-o pointer' id='treeIcon" + $scope.tree[i].id + "' ng-click='nodeSlide(" + $scope.tree[i].id + ")'></i><div id='tree" + $scope.tree[i].id + "'></div></div>")($scope))
                }
                else {
                    $("#tree" + x).append($compile("<div class='tree-view1' ><span ng-drag='true' ng-drag-data='" + $scope.tree[i].id + "' ng-drag-success='mydrag($data,$event);' class='tree-span fontchange' id='treeRow" + $scope.tree[i].id + "' style='cursor:grab'>" + $scope.tree[i].name + "</span></div>")($scope))
                }
            }
        }
    }
    var parent = 0;//variable to check main branch of moving node
    var selected = 0;//variable to check children of mving node
    $scope.treeToEdit = [];
    // add selected node id and its parent id to forms
    $scope.selectingTree = function (x) {
        var flag = 0;
        for (var i = 0; i < $scope.tree.length; i++) {
            if (($("#treeRow" + $scope.tree[i].id).hasClass("treeBackground"))) {
                flag = flag + 1;
                var id = $scope.tree[i].id;
            }
        }
        if ($(".editingTree").is(":visible") && flag != 0) {
            if (x == id) {
                $("#treeRow" + x).toggleClass("treeBackground");
            }
            else {

                $("#treeRow" + x).toggleClass("redNode");
                if ($("#treeRow" + x).hasClass("redNode")) {
                    $(".tree-span").removeClass("redNode");
                    $("#treeRow" + x).addClass("redNode");
                    selected = x;
                    for (var i = 0; i < $scope.tree.length; i++) {
                        if ($scope.tree[i].id == x) {
                            $(".my-option").prop("selected", false);
                            $("#option" + $scope.tree[i].id).prop("selected", true);
                        }
                    }
                }
            }
        }
        else {
            $(".tree-span").removeClass("redNode");
            $("#treeRow" + x).toggleClass("treeBackground");
            if ($("#treeRow" + x).hasClass("treeBackground")) {
                $(".tree-span").removeClass("treeBackground");
                $("#treeRow" + x).addClass("treeBackground");
                parent = x;
                for (var i = 0; i < $scope.tree.length; i++) {
                    if ($scope.tree[i].id == x) {
                        $scope.treeToEdit = []
                        $scope.treeToEdit.push($scope.tree[i])
                        $("#treeCode").val($scope.tree[i].code)
                        $("#treeName").val($scope.tree[i].name)
                        $(".my-option").prop("selected", false);
                        $("#option" + $scope.tree[i].parent).prop("selected", true);
                        $("#plus" + $scope.tree[i].id).prop("selected", true);
                        $(".editAlarm").html(" ");
                    }
                }
            }
            else {
                $(".tree-span").removeClass("treeBackground");
                $scope.treeToEdit = [];
                $(".editAlarm").html("برای انجام ویرایش ابتدا یک شاخه را انتخاب کنید")
                $("#treeCode").val("")
                $("#treeName").val("")
            }
        }
    }
    // deleting selected node
    $scope.deletingNode = function () {
        var flag = 0;
        if ($scope.treeToEdit.length == 0) {
            $scope.error[0] = "ابتدا شاخه ایی را انتخاب کنید";
            $("#error").modal();
        }
        else {
            for (var i = 0; i < $scope.tree.length; i++) {
                if ($scope.tree[i].parent == $scope.treeToEdit[0].id) {
                    flag = flag + 1;
                }
            }
            if (flag == 0) {
                for (var i = 0; i < $scope.tree.length; i++) {
                    if ($scope.tree[i].id == $scope.treeToEdit[0].id) {
                        $("#treeRow" + $scope.treeToEdit[0].id).remove();
                        $("#tree" + $scope.treeToEdit[0].id).remove();
                        // $("#tree" + $scope.treeToEdit[0].id).empty();
                        // $("#treeRow" + $scope.treeToEdit[0].id).css("color","red")
                        $("#treeIcon" + $scope.treeToEdit[0].id).removeClass("fa-angle-down");
                        $("#treeIcon" + $scope.treeToEdit[0].id).removeClass("fa-angle-up");
                        $scope.tree.splice(i, 1)
                    }
                }
            }
            else {
                $scope.error[0] = "شما نمیتوانید سرشاخه را حذف کنید";
                $("#error").modal();
            }
        }
    }
    // editing selected node 
    $scope.editingNode = function () {
        $(".tree-span").removeClass("treeBackground");
        $(".tree-span").removeClass("redNode");
        if ($scope.treeToEdit.length == 0) {
            $(".editAlarm").html("برای انجام ویرایش ابتدا یک شاخه را انتخاب کنید")
        }
        $(".plusNode").css("display", "none");
        $(".plusNode").removeClass("flag")
        $(".editingTree").toggleClass("flag");
        if ($(".editingTree").hasClass("flag")) {

            $(".editingTree").css("display", "inline-block")
        }
        else {
            $(".editingTree").css("display", "none")
        }
    }
    // adding new node to selected node children
    $scope.addingNode = function () {
        $(".editingTree").css("display", "none")
        $(".editingTree").removeClass("flag")
        $(".plusNode").toggleClass("flag");
        if ($(".plusNode").hasClass("flag")) {
            $(".plusNode").css("display", "inline-block")
        }
        else {
            $(".plusNode").css("display", "none")
        }
    }
    // editing form button event
    $scope.editRegister = function () {
        if ($("#tree" + parent).find($("#treeRow" + selected)).length > 0) {
            $scope.error[0] = "ابتدا زیر شاخه را به سطح بالاتر انتقال دهید";
            $("#error").modal();
        }
        else {
            for (var i = 0; i < $scope.tree.length; i++) {
                if ($scope.tree[i].id == $scope.treeToEdit[0].id) {
                    $scope.tree[i].code = $("#treeCode").val();
                    $scope.tree[i].name = $("#treeName").val();
                    var oldParent = $scope.tree[i].parent
                    if ($("#parent").val() != undefined) {
                        $scope.tree[i].parent = $("#parent").val();
                        $scope.creatingNode($("#parent").val());
                    }
                    if ($("#location").val() != undefined) {
                        $scope.tree[i].location = $("#location").val();
                    }
                }
            }
            $scope.creatingNode(oldParent);
            $scope.editingNode()
            $scope.nodeSlide(oldParent)
            $scope.nodeSlide($("#parent").val())
        }
    }
    // cehcking adding form button event
    $scope.addingRegister = function (nodeCode, nodeName, nodeParent, nodeCity) {
        if (nodeCode == undefined || nodeName == undefined || nodeCity == undefined) {
            $scope.error[0] = "پر کردن همه فیلد ها الزامی است";
            $("#error").modal();
        }
        else {
            var newNode = {
                name: nodeName,
                code: nodeCode,
                parent: $("#plusBranch").val(),
                id: nodeCode
            }
            $scope.tree.push(newNode);
            $scope.creatingNode($("#plusBranch").val());
            if (!$("#tree" + $("#plusBranch").val()).hasClass('flag')) {
                $scope.nodeSlide($("#plusBranch").val())
            }
        }
        $(".tree-span").removeClass("treeBackground");
        $(".plus-form").val("");
    }
    // charts part

    $scope.chartLoad = function () {

    }

}])
// right click and f12 and other ways to open inspect element preventer
// $(document).keydown(function(event){
//     if(event.keyCode==123){
//     return false;
//    }
// else if(event.ctrlKey && event.shiftKey && event.keyCode==73){        
//       return false;  //Prevent from ctrl+shift+i
//    }
// });
// $(document).on("contextmenu",function(e){        
//    e.preventDefault();
// });
// function hide() {
//     $(this).parent().find("i").toggleClass("hide")
// }
// var element = new Image();
// // var element = document.createElement('any');
// element.__defineGetter__('id', function() {
//     checkStatus = 'on';
// });

// setInterval(function() {
//     checkStatus = 'off';
//     console.clear();
//     if(checkStatus == "on"){

//         window.location.href = 'login.html'
//     }
//     // document.querySelector('#devtool-status').innerHTML = checkStatus;
// }, 1000)
function setting(x) {

    $("#setting").toggleClass("rotate");
    $("#setting").toggleClass("rotate-back");
    $("#user-info").css("display", "none");
    $("#note").css("display", "none");
    $("#event").css("display", "none");
    $("#setting-bar").slideToggle();
}
function fade() {
    $("#event").css("display", "none");
    $("#setting-bar").css("display", "none");
    $("#note").css("display", "none");
    $("#user-info").fadeToggle();
}
function searching() {
    $("#search").toggleClass("flag");
    if ($("#search").hasClass("flag")) {
        $("#search").removeClass("hide")
        $("#search").delay(10).animate({ width: "100%" });
        $("#search").focus();
    }
    else {

        $("#search").animate({ width: "0%" });
        setTimeout(function () {
            $("#search").addClass("hide");
        }, 300);
        $("#search").val("");
        $(".searchResult").css({ 'display': "none", "background-color": "#f1f2f3" });
    }
}
function hidding(el) {
    $("#" + el).css("display", "none");
}
function display(el) {
    $("#" + el).fadeToggle();
}
function showing() {
    $("#chat").toggleClass("hide");
}
function mail() {
    $("#mail").toggleClass("hide");
}
function transform3d() {
    $("#aris-logo").addClass("transform3d");
}
function deleteTransform() {
    $("#aris-logo").removeClass("transform3d");
}
table();
function table() {
    $(".fc-time-grid .fc-event-container").css("display", "inline-block");
}
var is_iPad = navigator.userAgent.match(/iPad/i) != null;
function appleCheck() {
    if (is_iPad) {
        screen.orientation.lock('landscape');
    }
}
appleCheck();
window.onkeydown = function (e) {
    e = e || window.event;
    // use e.keyCode
    if (e.keyCode == 45) {
        searching();

    }
};
function move() {
    'use strict'
    $("#myBar").css("top", "20%");
    $("#loadingImage").removeClass('rotate');
    $("#myBar").fadeIn();
    var elem = document.getElementById("inside-progress");
    var height = 1;
    var id = setInterval(frame, 20);
    function frame() {
        if (height >= 100) {
            clearInterval(id);
            $("#loadingImage").addClass('rotate');
            $("#myBar").delay(500).animate({ top: "-20%" });
            $("#myBar").delay(1000).fadeOut();
        } else {
            height++;
            elem.style.height = height + '%';
            elem.style.top = 100 - height + '%';
        }
    }
}