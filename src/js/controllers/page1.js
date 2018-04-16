angular.module('app')
    .controller('AppCtrl',
        function ($scope, $location, $state, $localStorage,$http,$stateParams) {
            $scope.id=$stateParams.producerId;
            $scope.username=$stateParams.userName;
            console.log($scope.id)

        });