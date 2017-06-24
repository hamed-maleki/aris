var app = angular.module('myApp', []);
// loading form depond on sussystem
app.directive("aris", function () {
    return {
        scope: true,
        restrict: 'AE',
        replace: 'true',
        template: '<ng-include src="template"/>',
        link: function (scope, elem, attrs) {
            scope.$watch(function () {
                scope.template = 'modules/' + scope.number;
            });
        }
    };
});
// side bar container loader
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
app.controller('myCtrl', function ($scope, $http, $timeout, $filter, $interval, $compile) {
    // log in demo log in. it should be removed later
    $scope.login = function (user, pass) {
        $http.get("data/users.json")
            .then(function (response) {
                $scope.users = response.data.users;
                for (var i = 0; i < $scope.users.length; i++) {
                    if (user == $scope.users[i].username && pass == $scope.users[i].password) {
                        window.location.href = "new_design_firstpage.html";
                        break;
                    }
                    else {
                        if (i == $scope.users.length - 1) {
                            alert("رمز یا نام کاربری اشتباه میباشد");
                        }
                    }
                }
            })
    }
    // document page data loader it may have changes in back-end matching level
    fetch("data/document.json").then(function (response) {
        return response.json();
    }).then(function (response) {
        var debtSum = 0;
        var creditSum = 0;
        $scope.document = response.document;
        for (var i = 0; i < $scope.document.length; i++) {
            debtSum = debtSum + $scope.document[i].debt;
            creditSum = creditSum + $scope.document[i].credit;
            $scope.document[i].credit = $scope.numberFormat($scope.document[i].credit.toString()) + "/" + $scope.float($scope.document[i].credit);
            $scope.document[i].debt = $scope.numberFormat($scope.document[i].debt.toString()) + "/" + $scope.float($scope.document[i].debt);
        }
        $("#documentDebt").html($scope.numberFormat(debtSum.toString()) + "/" + $scope.float(debtSum));
        $("#documentCredit").html($scope.numberFormat(creditSum.toString()) + "/" + $scope.float(creditSum));
    })
    $scope.number = "unload.html";
    $scope.limitedNote = [];
    $scope.reading = 0;
    $http.get("data/error.json")
        .then(function (response) {
            $scope.error = response.data.error;
        })
    $scope.calendarsubmit = function (start, finish, title) {
        $scope.calendar = {
            "title": title,
            "start": $("#start1").val(),
            "end": $("#finish1").val()
        }
        $scope.events.push($scope.calendar);
    }
    // cartable json load and number of unread message
    $http.get("data/cartable.json")
        .then(function (response) {
            $scope.cartable = response.data.cartable;
            for (var x = 0; x < $scope.cartable.length; x++) {
                if ($scope.cartable[x].read == 0) {
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
    // subsystem header click to slide down
    $scope.headerSlide = function (x, y, z, origin) {
        if (z.length == 0) {
            $scope.table(origin);
        }
        else {
            $("#" + x).slideToggle();
        }
        $("#nav").html(y);
        $("#subnav").html("");
    }
    // cartable message on click to show
    $scope.showContext = function (title, context, x, y) {
        $("#my-title").html(title);
        $("#my-context").html(context);
        $scope.titleShow = true;
        if ($scope.cartable[x].read == 0) {
            $scope.reading = $scope.reading - 1;
            if ($scope.reading == 0) {
                $(".badge").css("opacity", "0");
            }
        }
        $scope.cartable[x].read = 1;
    }
    // closing search results
    $scope.closingSearch = function () {
        if (!$("#search").hasClass("flag")) {
            $scope.searchSystem = []
        }
    }
    // searching in navigation
    $scope.searching = function (x) {
        // if (x == 1) {
        //     $scope.searchSystem = []
        // }

        if ($("#search").val()) {
            $scope.searchSystem = $scope.system;
            $(".searchResult").css("display", "block")
            $scope.searchItem = $("#search").val();

        }
        else {
            $scope.searchSystem = [];
            count = 0;
        }
    }

    // document.onkeydown = $scope.checkKey;
    document.onkeydown = checkKey;
    var count = 0;
    var page = 1;
    function checkKey(e) {
        // that works when search get smaller or bigger
        if ($(".searchLink").length != 0) {
            $scope.listItems = $(".searchLink")
        }
        e = e || window.event;
        // it reduce count when kry up is pressed
        // console.log(count)
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
        // it does nothing
        else if (e.keyCode == '37') {
            console.log("left")
        }
        // it does nothing
        else if (e.keyCode == '39') {
            console.log("right")
        }
        // it got executed when enter key is pressed
        else if (e.keyCode == '13') {
            // looking for selected list
            for (var i = 0; i < $scope.listItems.length; i++) {
                if ($($scope.listItems[i]).hasClass("selected")) {
                    // cheking if that is a child leef
                    if (!$($scope.listItems[i]).hasClass("child")) {
                        var valueLink = $($scope.listItems[i]).attr('value')
                        $scope.gettingSystem(valueLink, 1)
                    }
                    else {
                        var valueLink = $($scope.listItems[i]).attr('value');
                        var nameLink = $($scope.listItems[i]).attr('name');
                        $scope.searchClick(valueLink, nameLink)
                    }

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
        $scope.font();
    }
    // pushing in cookie
    $scope.cookieForSide = function (x, y) {
        var now = new Date();
        var time = now.getTime();
        time += 3600 * 1000;
        now.setTime(time);
        var searchParent = x
        var searchId = y;
        document.cookie = "searchParent = " + searchParent + ";expires=" + now.toUTCString() + ";path =/";
        document.cookie = "searchId = " + searchId + ";expires=" + now.toUTCString() + ";path =/";
    }
    // putting side bar cookie to be loaded in system page later
    $scope.searchClick = function (x, y) {
        $scope.cookieForSide(x, y);
        for (var i = 0; i < $scope.system.length; i++) {
            for (var z = 0; z < $scope.system[i].children.length; z++) {
                if ($scope.system[i].children[z].id == x) {
                    var item = $scope.system[i].id
                }
            }
        }
        $scope.gettingSystem(item, 0)
    }
    // system page on load to chek if there is any cookie
    $scope.getSearchCookie = function () {
        var x = $scope.getCookieValue('searchParent')
        var y = $scope.getCookieValue('searchId')
        $scope.subsystem = $scope.getCookieValue('SubSystem') ? JSON.parse($scope.getCookieValue('SubSystem')) : []
        if (x != 0 && y != 0) {
            $scope.subSystem(x, y);
        }
    }

    //    note json loader
    var sliderTime;
    var sliderLength;
    $http.get("data/note.json")
        .then(function (response) {
            $scope.note = response.data.note;
            $scope.message = response.data.message;
            $scope.alarm = response.data.alarm;
            $scope.sliderAlarm = $scope.alarm[0];
            sliderLength = $scope.alarm.length
            $scope.carousel();
        });
    // carsoule
    var slider = 0;
    $scope.carousel = function () {
        if (slider > $scope.alarm.length - 1) {
            slider = 0;
            $scope.sliderAlarm = $scope.alarm[slider];
        }
        else if (slider < 0) {
            slider = $scope.alarm.length - 1;
            $scope.sliderAlarm = $scope.alarm[slider];
        }
        else {
            $scope.sliderAlarm = $scope.alarm[slider];
        }
        slider = slider + 1;
        sliderTime = setTimeout(function () {
            $scope.carousel();
        }, 6000);
    }
    $scope.slider = function (x) {
        if (x == -1) {

            slider = slider - 2;
        }
        clearTimeout(sliderTime);
        $scope.carousel();
        $(".play").addClass("hide");
        $(".pause").removeClass("hide");
    }
    $scope.pause = function () {
        clearTimeout(sliderTime);
        $(".pause").addClass("hide");
        $(".play").removeClass("hide");
    }
    $scope.play = function () {
        $scope.carousel();
        $(".play").addClass("hide");
        $(".pause").removeClass("hide");
    }
    // system data loader
    fetch("data/system.json").then(function (response) {
        return response.json();
    }).then(function (response) {
        $scope.system = response.system;
    })
    $scope.getCookieValue = function (a) {
        var b = document.cookie.match('(^|;)\\s*' + a + '\\s*=\\s*([^;]+)');
        return b ? b.pop() : '';
    }
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
                            $scope.cartable.splice(index, 1);
                        }
                    }
                }
            });
        }
    }
    // putting subsystem in cookie
    $scope.subSystem = function (x, y, z) {
        var now = new Date();
        var time = now.getTime();
        time += 3600 * 1000;
        now.setTime(time);
        var cookieItem = [];
        $scope.systemslider = [];
        for (var i = 0; i < $scope.subsystem.length; i++) {
            if ($scope.subsystem[i].id == x) {
                for (var j = 0; j < $scope.subsystem[i].children.length; j++) {
                    if ($scope.subsystem[i].children[j].id == y) {
                        $scope.systemslider.push($scope.subsystem[i].children[j]);
                    }
                }
                $("#nav").html($scope.subsystem[i].title);
                var cookieItem = JSON.stringify($scope.subsystem);
                $(".subsystem").slideUp();
                document.cookie = "SubSystem = " + cookieItem + ";expires=" + now.toUTCString() + ";path =/";
            }
        }
    }
    // select all checkbox
    $scope.inboxing = function () {
        if ($("#select").prop("checked") == true) {
            $(".modal_input").prop("checked", true);
        }
        else {
            $(".modal_input").prop("checked", false);
        }
    }
    // first page cookie for system page
    $scope.gettingSystem = function (x, y) {
        if (y == 1) {
            $scope.cookieForSide(0, 0)
        }
        var now = new Date();
        var time = now.getTime();
        time += 3600 * 1000;
        now.setTime(time);
        for (var i = 0; i < $scope.system.length; i++) {
            if ($scope.system[i].id == x) {
                var cookieItem = JSON.stringify($scope.system[i].children);
                document.cookie = "SubSystem = " + cookieItem + ";expires=" + now.toUTCString() + ";path =/";
            }
        }
        window.location.href = "system-page.html";
    }
    // top link part
    $scope.topLinking = function (x, path) {
        if (path == "system-page.html") {
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
    }
    // removing note from note pad
    $scope.removeItem = function (no, x) {
        if (no == 1) {
            $scope.message.splice(x, 1);
        }
        else if (no == 2) {
            $scope.note.splice(x, 1);
        }
    }
    // form data laoder
    $scope.radio = function (x) {
        $scope.numberType[0] = x;
    }
    $scope.tabledata = [];
    //  reporting table data loader
    $scope.dataLoad = function (x) {
        $scope.loading = true;
        $scope.paginationNumber = [];
        $scope.limitedEdition = [];
        $scope.dataToSend = [];
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
                for (var y = 0; y < $scope.tabledata.length; y++) {
                    if ($scope.numberType[0] == 2) {
                        $scope.tabledata[y].credit = $scope.tabledata[y].credit / 1000;
                        $scope.tabledata[y].debt = $scope.tabledata[y].debt / 1000;
                    }
                    else if ($scope.numberType[0] == 3) {
                        $scope.tabledata[y].credit = $scope.tabledata[y].credit / 1000000;
                        $scope.tabledata[y].debt = $scope.tabledata[y].debt / 1000000;
                    }
                    if ($scope.tabledata[y].credit != undefined && $scope.tabledata[y].debt != undefined) {
                        if (Number($scope.tabledata[y].credit) > Number($scope.tabledata[y].debt)) {
                            $scope.tabledata[y].remain = Number($scope.tabledata[y].credit) - Number($scope.tabledata[y].debt);
                            $scope.tabledata[y].situation = "بستانکار"

                        }
                        else if (Number($scope.tabledata[y].credit) < Number($scope.tabledata[y].debt)) {
                            $scope.tabledata[y].remain = Number($scope.tabledata[y].debt) - Number($scope.tabledata[y].credit);
                            $scope.tabledata[y].situation = "بدهکار"

                        }
                        else {
                            $scope.tabledata[y].remain = Number($scope.tabledata[y].debt) - Number($scope.tabledata[y].credit);
                            $scope.tabledata[y].situation = "-";
                        }
                    }
                }
                $scope.pagination(1);
                var pageNumber;
                pageNumber = Math.ceil($scope.tabledata.length / 15);
                for (var conter = 1; conter < pageNumber + 1; conter++) {
                    $scope.paginationNumber.push(conter);
                }
            })
            .catch(function () {
                $scope.error[0] = "عدم دستیابی به اطلاعات";
                $("#error").modal();
            }); setTimeout(function () {
                $scope.tableFonting();
            }, 10)
    }
    // number float part adder to number string with camma
    $scope.float = function (x) {
        return (
            (x - Math.floor(x)).toFixed(2).toString().substring(2)
        )
    }
    // pagination display (currently only work for table data loader but it can expand to other json data)
    $scope.pagination = function (x) {
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
            $scope.font();
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
        setTimeout(function () {
            $scope.tableFonting();
        }, 10)
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
    // button example
    $http.get("data/buttonTest.json")
        .then(function (response) {
            $scope.buttons = response.data.buttons;
        })
    $scope.genral = function (x) {
        switch (x) {
            case 12:
                var firstItem = $("#firstInput").val();
                $scope.dataLoad(firstItem, 1, 1, 1, 1); break;
            case 13: console.log("second function"); break;
            case 14: console.log("third function"); break;
            case 15: console.log("forth function"); break;
            default: console.log("no function fund"); break;
        }
    }
    // event of day declaring
    $http.get("data/events.json")
        .success(function (response) {
            $scope.events = response;
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
        }).catch(function () {
            $scope.error[0] = "خطا در دستیابی به اطلاعات";
            $("#error").modal();
        })
    // slider controller for subsystem in system-page.html 
    $scope.list_slide = function (title, list, children, myid) {
        $scope.tabledata = [];
        $("#creditSum").html("");
        $("#debtSum").html("");
        $("#totalSum").html("");
        $("#totalSituation").html("");
        $("#" + list).toggleClass("flag")
        if (children.length != 0 && children != undefined) {
            $("#" + list).slideToggle();
            if ($("#" + list).hasClass("flag")) {
                $("#subnav").append("<i class='fa fa-angle-left'></i>" + title);
            }
            else {
                $("#subnav").html(" ");
            }
        }
        else {
            $("#" + list).removeClass("flag");
            $("#subnav").append("<i class='fa fa-angle-left'></i>" + title);
            $scope.table(myid);
        }
    };
    // directive for aris tag's template changer
    $scope.table = function (value) {
        $scope.number = "example" + value + ".html";
        $http.get("data/table1.json")
            .then(function (response) {
                $scope.tabledata = response.data.table;
            }).catch(function () {
                $scope.error[0] = "خطا در دستیابی به اطلاعات";
                $("#error").modal();
            })

    }
    // chat controller
    $interval(function () {
        return $http.get("data/chat.json").then(function (response) {
            $scope.chat = response.data.message;
        })
            .catch(function () {
                $scope.error[0] = "خطا در دستیابی به اطلاعات";
                $("#error").modal();
            })
    }, 5000);
    $scope.orderBy = function (x) {
        $scope.myorder = x;
    }
    // dorpdown 
    $scope.drop = function (x) {
        $("#dropdown" + x).slideToggle();
        $("#subnav").html("");
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
    //theme functions
    $http.get("data/theme.json")
        .then(function (response) {
            $scope.colorTheme = response.data.color;
            $scope.fontTheme = response.data.font;
            $scope.tableFont = response.data.tableFont;
            $scope.numberType = response.data.numberType;
            setTimeout(function () {
                $scope.theme();
                $scope.font();
            }, 200);
        }).catch(function () {
            $scope.error[0] = "خطا در برقراری ارتباطات";
            $("#error").modal();
        })
    $scope.tablefontChange = function (size) {
        $scope.tableFont[0] = $("#points-font").val();
        $scope.tableFonting();
    }
    $scope.fontChanger = function (element) {
        $scope.fontTheme = element;
        $scope.font();
    }
    $scope.colorChanger = function (element) {
        $scope.colorTheme = element;
        $scope.theme();
    }
    $scope.tableFonting = function () {
        $("table").find(".table-number").css("font-size", $scope.tableFont[0] + "px");
    }
    $scope.theme = function () {
        if ($scope.colorTheme[0] == 1) {
            $(".color").removeClass("second-color");
            $(".color").removeClass("third-color");
            $(".color").addClass("first-color");
            $(".mycalendar").removeClass("calendar-second-color");
            $(".mycalendar").removeClass("calendar-third-color");
            $(".mycalendar").addClass("calendar-first-color");
            $(".top-link").css("color", "5BB0E2");
            $("button").css("background", "#5BB0E2");
            $("#user-message").css("background-color", "5BB0E2");
            $("footer").css("background-color", "#5BB0E2");
            // $(".system-li").css("background-color", "#5BB0E2");
            $(".system-li>h4").css("background-color", "#5BB0E2");
            $(".pagination > .active > a ").css("background-color", "5BB0E2");
        }
        else if ($scope.colorTheme[0] == 2) {
            $(".color").removeClass("first-color");
            $(".color").removeClass("third-color");
            $(".color").addClass("second-color");
            $(".mycalendar").removeClass("calendar-first-color");
            $(".mycalendar").removeClass("calendar-third-color");
            $(".mycalendar").addClass("calendar-second-color");
            $(".top-link").css("color", "#3eb65c");
            $("button").css("background-color", "#3eb65c");
            $("#user-message").css("background-color", "#67cb80");
            $("footer").css("background-color", "#67cb80");
            // $(".system-li").css("background-color", "#67cb80");
            $(".system-li>h4").css("background-color", "#67cb80");
            $(".pagination > .active > a ").css("background-color", "#3eb65c");
        }
        else {
            $(".color").removeClass("second-color");
            $(".color").removeClass("first-color");
            $(".color").addClass("third-color");
            $(".mycalendar").removeClass("calendar-second-color");
            $(".mycalendar").removeClass("calendar-first-color");
            $(".mycalendar").addClass("calendar-third-color");
            $(".top-link").css("color", "#b194f1");
            $("#user-message").css("background-color", "#cebbf6");
            $("button").css("background-color", "#b194f1");
            $("footer").css("background-color", "#cebbf6");
            // $(".system-li").css("background-color", "#cebbf6");
            $(".system-li>h4").css("background-color", "#cebbf6");
            $(".pagination > .active > a ").css("background-color", "#b194f1");

        }
    }
    $scope.font = function () {
        $(".theme-check").addClass("hide");
        $(".fa-pencil").removeClass("hide");
        if ($scope.fontTheme[0] == 1) {
            $("#first").addClass("hide");
            $("#firstcheck").removeClass("hide");
            $(".fontchange").css("font-family", "far");
            $("label").css("font-family", "far");
            $("button").css("font-family", "far");
            $("th").css("font-family", "far");
        }
        else if ($scope.fontTheme[0] == 2) {
            $("#second").addClass("hide");
            $("#secondcheck").removeClass("hide");
            $(".fontchange").css("font-family", "iran-sans");
            $("label").css("font-family", "iran-sans");
            $("button").css("font-family", "iran-sans");
            $("th").css("font-family", "iran-sans");
            $(".top-link").css("font-size", "15px");
            $(".sub-system p").css("font-size", "15px");
        }
        else {
            $("#third").addClass("hide");
            $("#thirdcheck").removeClass("hide");
            $(".fontchange").css("font-family", "dubai");
            $("label").css("font-family", "dubai");
            $("button").css("font-family", "dubai");
            $("th").css("font-family", "dubai");
            $("th").css("font-size", "14px");
            $(".top-link").css("font-size", "13px");
            $(".sub-system p").css("font-size", "13px");
        }
    }
    // aside opening
    $scope.sideBar = function (x) {
        $scope.sidecontainer(x);
        $(".side-tool").animate({ width: "400px" }, 'slow');
        $(".side-filter").animate({ width: "400px" }, 'slow');
        $(".container-filter a").css("pointer-events", 'none');
        $("nav a").css("pointer-events", 'none');
        $("nav i").css("pointer-events", 'none');
    }
    $scope.mainSystem = function () {
        $("#mainSystems").modal();
    }
    // fullfiling aside (calnedar and note and top link container)
    $scope.sidecontainer = function (x) {
        if (x == 1) {
            $http.get("data/note.json")
                .then(function (response) {
                    $scope.note = response.data.note;
                    $scope.message = response.data.message;
                    $scope.alarm = response.data.alarm;
                    for (var i = 0; i < 3; i++) {
                        $scope.limitedNote.push($scope.note[i]);
                    }
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
    $scope.sideBarClose = function () {
        $(".side-tool").animate({ width: "0px" });
        $(".side-filter").animate({ width: "0px" });
        $(".container-filter a").css("pointer-events", '');
        $("nav a").css("pointer-events", '');
        $("nav i").css("pointer-events", '');
        $(".effect").css("filter", "none");
    }
    $scope.mydate = function () {
        week = new Array("يكشنبه", "دوشنبه", "سه شنبه", "چهارشنبه", "پنج شنبه", "جمعه", "شنبه");
        months = new Array("فروردين", "ارديبهشت", "خرداد", "تير", "مرداد", "شهريور", "مهر", "آبان", "آذر", "دي", "بهمن", "اسفند");
        a = new Date();
        d = a.getDay();
        day = a.getDate();
        month = a.getMonth() + 1;
        year = a.getYear();
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

        if (day < 10) {
            $(".myday").css("right", "44%");
        }
        $scope.myday = day;
        $scope.myMonth = months[month - 1];
        $scope.dayname = week[d];
    }
    $scope.mydate();
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
    $scope.gettingTree = function () {
        $http.get("data/tree.json").then(function (response) {
            $scope.tree = response.data.tree;
            for(var i = 0; i< $scope.tree.length; i ++){
                if($scope.tree[i].parent == null){
                    $scope.treeToShow.push($scope.tree[i])
                } 
            }
        })
    }
    $scope.creatingTree = function (x) {
        for (var i = 0; i < $scope.tree.length; i++) {
            if($scope.tree[i].parent == x){
                $("#tree"+x).append($compile("<div class='tree-view' >" + $scope.tree[i].name + "<input type='checkbox' style='display:none'><i class='fa fa-angle-down' id='treeIcon"+$scope.tree[i].id+"' ng-click='treeSlide("+$scope.tree[i].id+")'></i><div id='tree"+$scope.tree[i].id+"'></div></div>")($scope))
            }
        }
    }

    $scope.treeSlide = function (x) {
        if($("#tree" + x).hasClass("flag")){
            $("#tree" + x).slideToggle();
        }
        else{
            $scope.creatingTree(x);
            $("#tree" + x).addClass("flag");
        }
        $("#treeIcon" + x).toggleClass("flag")
        if ($("#treeIcon" + x).hasClass("flag")) {
            $("#treeIcon" + x).removeClass("fa-angle-down")
            $("#treeIcon" + x).addClass("fa-angle-up")
        } else {
            $("#treeIcon" + x).removeClass("fa-angle-up")
            $("#treeIcon" + x).addClass("fa-angle-down")
        }
    }
})
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
        $(".searchResult").css('display', "none");
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
function checkCookie() {
    var cookieEnabled = navigator.cookieEnabled;
    if (!cookieEnabled) {
        document.cookie = "testcookie";
        cookieEnabled = document.cookie.indexOf("testcookie") != -1;
    }
    return cookieEnabled || showCookieFail();
}
var is_iPad = navigator.userAgent.match(/iPad/i) != null;
function appleCheck() {
    if (is_iPad) {
        screen.orientation.lock('landscape');
    }
}
appleCheck();
function showCookieFail() {
    alert("برای کاربری مناسب کوکی سیستم خود را روشن کنید");
}
// within a window load,dom ready or something like that place your:
checkCookie();
window.onkeydown = function (e) {
    e = e || window.event;
    // use e.keyCode
    if (e.keyCode == 45) {
        searching();

    }
};