var element = new Image();
// var element = document.createElement('any');
element.__defineGetter__('id', function() {
    checkStatus = 'on';
});

setInterval(function() {
    checkStatus = 'off';
    console.log(element);
    console.clear();
    if(checkStatus == "on"){
        $("button").off("click");
    }
}, 1000);
var app = angular.module('myApp', []);
app.controller('myCtrl', function ($scope, $http, $timeout, $filter, $interval, $compile) {
    $scope.fox = function () {
        $(".loading-login").delay(2000).fadeOut(1000);
    }
    $scope.login = function (username, pass) {
        // Text to encrypt and decrypt.
        var s = pass;
        var sb = System.Text.Encoding.UTF8.GetBytes(s);
        var sha256 = new System.Security.Cryptography.SHA256CryptoServiceProvider();
        pass = System.BitConverter.ToString(sha256.ComputeHash(sb), "");
        var text = pass;
        // Use OAEP padding (PKCS#1 v2).
        var doOaepPadding = true;
        // RSA 512-bit key: Public (Modulus), Private (D) and CRT (P, Q, DP, DQ, InverseQ).
        var xmlParams =
            "<RSAKeyValue><Modulus>333NosVjZKPLtI76s9C1Bc4Tk+9liYwVOvJ2Qf3sGfU6dbSrg/F/HB2IXxYrK4Ic5EMDH76iPZwiDLpxYK8I0SE0ZOVxFFwt8sVziQ7wn56TzopCB6/Cr9So14UBkZrcfmTP68inzf3i7yt0+aYO6SkSZow03B5w22RrkvAWBD0ir05ZPPyyCs0itVfAtUKAp9PiWv1uzaCg8dMSBXD/SWwp4rurfb1TegpOb5XdF1u9AUlb87UF0enbhv3h3YscMfLZDioe6sG/vAbwhq+uNa4t5agiwcPb0gY3Xn9g2pRXwtdwFcdGM02mXgAj1ppCRYfOvOrgUh2l7Q4yvYDTm0nXhDYC1ltfx6+v156rbjGD4fWs6if/y5ytYy1KnbuJahVAKjJEmbE/HyIweaI1iUdAQyu21PKkMPg33JZsMVnZIkRiubmN40KmV+KU3tiIgLAbqY4bf13yyTGqos5du3bTVynYYrp1R3f+fyN/7c2AAywTqAcprb5lK7ZIU+Tl3rlbsnPedQPqnEzuzf+DujMpcIqXqj2PtHjHbEqtbj/1wRfiRjn14bFwlF1u2BAOuEPnA3SqvD37xQQkh/CNpSNIQKHj+1HQVk/67tUsYKyHg9Yx0FNuC+LEiewBGB+y62h3ywaTO2W2BzoBErLKfcaVtYqOaFE3O4rs/Zv9NCE=</Modulus><Exponent>AQAB</Exponent></RSAKeyValue>";
        // ------------------------------------------------
        // RSA Keys
        // ------------------------------------------------
        var rsa = new System.Security.Cryptography.RSACryptoServiceProvider(4096);
        // Import parameters from XML string.
        rsa.FromXmlString(xmlParams);
        // ------------------------------------------------
        // Encrypt
        // ------------------------------------------------
        var decryptedBytes = System.Text.Encoding.UTF8.GetBytes(text);
        var encryptedBytes = rsa.Encrypt(decryptedBytes, doOaepPadding);
        // Convert bytes to base64 string.
        var encryptedString = System.Convert.ToBase64String(encryptedBytes);
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
