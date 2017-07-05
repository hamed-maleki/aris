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
//     // document.querySelector('#devtool-status').innerHTML = checkStatus;
// }, 1000);

var app = angular.module('myApp', ['angular.filter']);
app.controller('myCtrl', function ($scope, $http, $timeout, $filter, $interval, $compile) {
    $scope.fox = function(){
        // $("#fox").delay(1200).css("display","none")
        $(".loading-login").delay(2000).fadeOut(1000);
        
    }
    // console.log(sha256_digest(pass))
    $scope.login = function (user, pass) {
            // rng_seed_time()
            // var before = new Date();
            // var rsa = new RSAKey();
            // rsa.setPublic("a5261939975948bb7a58dffe5ff54e65f0498f9175f5a09288810b8975871e99af3b5dd94057b0fc07535f5f97444504fa35169d461d0d30cf0192e307727c065168c788771c561a9400fb49175e9e6aa4e23fe11af69e9412dd23b0cb6684c4c2429bce139e848ab26d0829073351f4acd36074eafd036a5eb83359d2a698d3", "10001");
            // var res = rsa.encrypt(pass);
            // var after = new Date();
            // console.log(res)
            // if (res) {
            //     pass= linebrk(res, 64);
            //     // document.rsatest.ciphertext.value = linebrk(res, 64);
            //     // pass = linebrk(hex2b64(res), 64);
            //     // pass = "Time: " + (after - before) + "ms";
            // }
        console.log(pass)
        localStorage.setItem('accessToken', "response.data.access_token");
        window.location.href = 'index.html';
        // $http({
        //     url: "/TOKEN",
        //     method: "POST",
        //     data: $.param({ grant_type: 'password', username: user, password:  sha256_digest(pass)}),
        //     headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        // }).then(function (response) {

        //     $scope.userName = response.data.userName;
        //     //Store the token information in the SessionStorage
        //     //So that it can be accessed for other views
        //     sessionStorage.setItem('userName', response.data.userName);
        //     sessionStorage.setItem('accessToken', response.data.access_token);
        //     sessionStorage.setItem('refreshToken', response.data.refresh_token);
        //     window.location.href = 'new_design_firstpage.html';
        // }, function (err) {
        //      alert("رمز یا نام کاربری اشتباه میباشد")
        //     // $scope.responseData="Error " + err.status;
        // });;
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
// ther
// function set_512e3() {
//   document.rsatest.n.value="BC86E3DC782C446EE756B874ACECF2A115E613021EAF1ED5EF295BEC2BED899D\n26FE2EC896BF9DE84FE381AF67A7B7CBB48D85235E72AB595ABF8FE840D5F8DB";
//   document.rsatest.e.value="3";
// }
// function set_512f4() {
//   document.rsatest.n.value="C4E3F7212602E1E396C0B6623CF11D26204ACE3E7D26685E037AD2507DCE82FC\n28F2D5F8A67FC3AFAB89A6D818D1F4C28CFA548418BD9F8E7426789A67E73E41";
//   document.rsatest.e.value="10001";
// }
// function set_1024e3() {
//   document.rsatest.n.value="ABC30681295774F7CECA691EC17F4E762DA6DE70F198EAEE3CCE3A435FC006B9\n71DC24E55904F1D2705758C041C2B0B18E8BFAE2C9CD96B50082D7D8C7342CBA\nB7F6E0622DA53B8B56DBDB24174F00173263CFECAE604795CDA2A037BC3A69B7\nC0090AA2DE1568998BCD6D70CC2E0574755B9F7986AE01CE8714A26144279CDB";
//   document.rsatest.e.value="3"
// }
// function set_1024f4() {
//   document.rsatest.n.value="a5261939975948bb7a58dffe5ff54e65f0498f9175f5a09288810b8975871e99\naf3b5dd94057b0fc07535f5f97444504fa35169d461d0d30cf0192e307727c06\n5168c788771c561a9400fb49175e9e6aa4e23fe11af69e9412dd23b0cb6684c4\nc2429bce139e848ab26d0829073351f4acd36074eafd036a5eb83359d2a698d3";
//   document.rsatest.e.value="10001";
// }