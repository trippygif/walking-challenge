/**
 * Created by bryoe on 9/3/2017.
 */
//initialization of the angular module
var adminApp = angular.module('adminApp', []);

function mainController($scope, $http){
    $scope.formData = {};
    $scope.filteredUsers = []
        ,$scope.currentPage = 1
        ,$scope.numPerPage = 4
        ,$scope.maxSize = 5;





    //get a list of all users
    $http.get('/api/users')
        .success(function(data){
            $scope.users = data;

            $scope.numPages = function () {
                return Math.ceil($scope.users.length / $scope.numPerPage);
            };

            $scope.$watch("currentPage + numPerPage", function() {
                console.log($scope);
                var begin = (($scope.currentPage - 1) * $scope.numPerPage)
                    , end = begin + $scope.numPerPage;
                console.log('$scope.users: ' + $scope.users);
                $scope.filteredUsers = $scope.users.slice(begin, end);
            });
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
    };

    $scope.goToTeam = function(team){
        console.log(team);
        console.log('redirect to /admin/team/' + team.number);
        $http.get("team/" + team.number)
            .success(function(response){
                $scope.team = team;
            })
    };



}
