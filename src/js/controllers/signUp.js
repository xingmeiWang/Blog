angular.module('app')
    .controller('AppCtrl',
        function ($scope, $location, $state, $localStorage,$http) {
            $scope.userdata = {};
            $scope.name = null;
            $scope.submitForm=function(){
                if($scope.userdata.username!=null  && $scope.userdata.password!=null && $scope.userdata.password2!=null){
                    $http({
                        method: 'GET',
                        url: '../json/signUp.json'
                    }).then(function successCallback(response) {
                        response.data.compilerOptions.username=$scope.userdata.username;
                        response.data.compilerOptions.password=$scope.userdata.password;
                        alert("注册成功")
                    }, function errorCallback(response) {
                        alert("注册失败2")
                    });
                }else{
                    alert("注册失败")
                }
            }
        });