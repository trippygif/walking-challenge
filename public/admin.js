/**
 * Created by bryoe on 9/3/2017.
 */
//initialization of the angular module
var adminApp = angular.module('adminApp', []);

function mainController($scope, $http){
    $scope.formData = {};

    //get a list of all users
    $http.get('/api/users')
        .success(function(data){
            $scope.users = data;
            console.log(data);
        })
        .error(function(err){
            console.log(err);
        });

    $http.get('/api/teams-temp')
        .success(function(data){
            $scope.teams = data;
            console.log('teams: ' + data);
        })
        .error(function(err){
            console.log('Error: ' + error);
        });



    $scope.createUser = function(){
        console.log('calling create');
        $http.post('/api/users', $scope.formData)
            .success(function(data){
                console.log('posted');
                $scope.formData = {};
                $scope.users = data;
                console.log(data);
            })
            .error(function(err){
                console.log(err);
            })
    };

    $scope.createTeam = function(){
        console.log($scope.formData);
        $http.post('/api/teams-temp', $scope.formData)
            .success(function(data){
                $scope.teams = data;
                console.log(data);
            })
            .error(function(err){
                console.log(err);
            })
    }

}
