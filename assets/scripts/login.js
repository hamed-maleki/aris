// var element = new Image();
// // var element = document.createElement('any');
// element.__defineGetter__('id', function() {
//     checkStatus = 'on';
// });

// setInterval(function() {
//     checkStatus = 'off';
//     console.log(element);
//     console.clear();
//     if(checkStatus == "on"){
//         $("button").off("click");
//     }
// }, 1000);
// var app = angular.module('myApp', []);
// app.controller('myCtrl', function ($scope, $http, $timeout, $filter, $interval, $compile) {
//     $scope.fox = function () {
//         $(".loading-login").delay(2000).fadeOut(1000);
//     }

// })
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
function register() {
    console.log("this is happeneing");
    var user_name = $("#name").val();
    var family = $("#family").val();
    var father = $("#father").val();
    var id_badge = $("#id-badge").val();
    var social_no = $("#social-no").val();
    var phone = $("#phone").val();
    var email = $("#email").val();
    var user_name = $("#user-name").val();
    var password = $("#password").val();
    $("#loadRegister").css("display", "block");
    $.ajax({
        url: "http://localhost/ArisSystem/register",
        data: {
            username: user_name,
            password: password,
            name: name,
            family: family,
            father: father,
            id_no: id_badge,
            social_no: social_no,
            phone: phone,
            email: email,
            sendToEmail: $('input[name=active]:checked').val()
        },
        type: 'POST',
        dataType: 'json',
        ContentType: 'application/x-www-form-urlencoded',
    }).then(function (response) {
        $("#loadRegister").css("display", "none");
    }), function (xhr, status, error) {
        $("#loadRegister").css("display", "none");
    }
}
function login() {
    $(".ieMessage").addClass("hide");
    $(".load-circle").css("display", "block")
    // Text to encrypt and decrypt.
    // var s = pass;
    // var sb = System.Text.Encoding.UTF8.GetBytes(s);
    // var sha256 = new System.Security.Cryptography.SHA256CryptoServiceProvider();
    // pass = System.BitConverter.ToString(sha256.ComputeHash(sb), "");
    // var text = pass;
    // // Use OAEP padding (PKCS#1 v2).
    // var doOaepPadding = true;
    // // RSA 512-bit key: Public (Modulus), Private (D) and CRT (P, Q, DP, DQ, InverseQ).
    // var xmlParams =
    //     "<RSAKeyValue><Modulus>333NosVjZKPLtI76s9C1Bc4Tk+9liYwVOvJ2Qf3sGfU6dbSrg/F/HB2IXxYrK4Ic5EMDH76iPZwiDLpxYK8I0SE0ZOVxFFwt8sVziQ7wn56TzopCB6/Cr9So14UBkZrcfmTP68inzf3i7yt0+aYO6SkSZow03B5w22RrkvAWBD0ir05ZPPyyCs0itVfAtUKAp9PiWv1uzaCg8dMSBXD/SWwp4rurfb1TegpOb5XdF1u9AUlb87UF0enbhv3h3YscMfLZDioe6sG/vAbwhq+uNa4t5agiwcPb0gY3Xn9g2pRXwtdwFcdGM02mXgAj1ppCRYfOvOrgUh2l7Q4yvYDTm0nXhDYC1ltfx6+v156rbjGD4fWs6if/y5ytYy1KnbuJahVAKjJEmbE/HyIweaI1iUdAQyu21PKkMPg33JZsMVnZIkRiubmN40KmV+KU3tiIgLAbqY4bf13yyTGqos5du3bTVynYYrp1R3f+fyN/7c2AAywTqAcprb5lK7ZIU+Tl3rlbsnPedQPqnEzuzf+DujMpcIqXqj2PtHjHbEqtbj/1wRfiRjn14bFwlF1u2BAOuEPnA3SqvD37xQQkh/CNpSNIQKHj+1HQVk/67tUsYKyHg9Yx0FNuC+LEiewBGB+y62h3ywaTO2W2BzoBErLKfcaVtYqOaFE3O4rs/Zv9NCE=</Modulus><Exponent>AQAB</Exponent></RSAKeyValue>";
    // // ------------------------------------------------
    // // RSA Keys
    // // ------------------------------------------------
    // var rsa = new System.Security.Cryptography.RSACryptoServiceProvider(4096);
    // // Import parameters from XML string.
    // rsa.FromXmlString(xmlParams);
    // // ------------------------------------------------
    // // Encrypt
    // // ------------------------------------------------
    // var decryptedBytes = System.Text.Encoding.UTF8.GetBytes(text);
    // var encryptedBytes = rsa.Encrypt(decryptedBytes, doOaepPadding);
    // // Convert bytes to base64 string.
    // var encryptedString = System.Convert.ToBase64String(encryptedBytes);
    // // localStorage.setItem('accessToken', "response.data.access_token");
    // // var isIE = /*@cc_on!@*/false || !!document.documentMode;
    // // if (isIE) {
    // //     window.location.href = '/index.html';
    // // }
    // // else{
    // //     window.location.href = 'index.html';
    // // }
    var user = $("#user").val();
    var pass = $("#pass").val();
    $(".log-btn").attr("disabled", 'disabled')
    $.ajax({
        url: "http://localhost/ArisSystem/login",

        data: {
            username: user,
            password: pass,
            grant_type: 'password'
        },
        type: 'POST',
        dataType: 'json',
        ContentType: 'application/x-www-form-urlencoded',
        success: AjaxSucceeded,
        error: AjaxFailed
    })
    function AjaxSucceeded(response) {
        $(".load-circle").css("display", "none")
        //console.log(JSON.parse(response));
        //$scope.userName = response.data.userName;
        //Store the token information in the localStorage
        //So that it can be accessed for other views
        // localStorage.setItem('userName', response.userName);
        localStorage.setItem('accessToken', response.access_token);
        localStorage.setItem('refreshToken', response.refresh_token);
        window.location.href = 'index.html';
    }
    function AjaxFailed(err, response) {
        $(".load-circle").css("display", "none")
        if (err.status == 500) {
            $(".ieMessage p").html("خطای ارتباطی لطفا دوباره سعی کنید");
        } else {
            $(".ieMessage p").html("نام کاربری و یا رمز وارد شده صحیح نمیباشد");
        }
        $(".ieMessage").removeClass("hide");
        $(".log-btn").prop("disabled", false);
        // $scope.responseData="Error " + err.status;
    };
}
$(document).ready(function () {
    mydate();
    $(".loading-login").delay(2000).fadeOut(1000);
    function mydate() {
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
        var myday = day;
        var myMonth = months[month - 1];
        $("#year").html(year);
        $("#month").html(myMonth);
        $("#day").html(day)
    }
    $("#myLabel").click(function () {
        document.getElementById('upload-photo').click()
    })
    $('#upload-photo').change(function (event) {

        $("#selected").html($("#upload-photo").val());
        console.log($("#upload-photo").val());
    });
})
function fileSelect() {
    $("#plusPhoto").click();
    // $scope.imgLoading = true;
    $('#plusPhoto').change(function (event) {
        // $scope.readURL(this);
        if (this.files && this.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                // console.log(e.target.result);
                $('#myimg').attr('src', e.target.result);
            }
            reader.readAsDataURL(this.files[0]);
        }
        $("#labelSelect").css("display","none");
        $("#myimg").css("display", "block");
    });
}