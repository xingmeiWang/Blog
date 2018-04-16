angular.module('app')
    .controller('AppCtrl',
        function ($scope, $location, $state, $localStorage,$http,$state) {
            $scope.userdata = {};
            $scope.name = null;
            $scope.submitClice = function () {
                $http({
                    method: 'GET',
                    url: '../json/login.json'
                }).then(function successCallback(response) {
                    console.log($scope.name+"   "+response.data.compilerOptions.username)
                    if ($scope.name ==response.data.compilerOptions.username){
                        alert("登录成功");
                        $state.go('app.page1', {producerId: response.data.compilerOptions.userId,userName:response.data.compilerOptions.username});
                    }else{
                        alert("您输入的用户名有误")
                    }
                }, function errorCallback(response) {
                    alert("登录失败")
                });
            };



            $scope.submitForm=function(){
                if($scope.userdata.username.$valid && $scope.userdata.password.$valid && $scope.userdata.password2.$valid){
                    alert("提交成功")
                }else{
                    alert("提交失败")
                }
            }
        });