/**
 * Created by bryoe on 9/2/2017.
 */

//initialization of the angular module
var stepCounter = angular.module('stepCounter', []);

function mainController($scope, $http){
    $scope.formData = {};
    $scope.formData.team = null;

    //call the api to get all the step data
    $http.get('/api/step-count')
        .success(function(data){
            $scope.steps = data;
            console.log(data);
            console.log($scope);
        })
        .error(function(error){
            console.log('Error: ' + error);
        });




    $http.get('/api/teams')
        .success(function(data){
            console.log(data);
            $scope.teams = data;
        })
        .error(function(err){
            console.log('Error: ' + error);
        });

    //post the data to the mongoDB
    //on success, clear out the form for a new entry
    $scope.createSteps = function(){

        $http.get('/api/step-count')
            .success(function(data){
                //redirect to filtered table
                return $http.post('/api/step-count', $scope.formData)
                    .success(function(data){
                        $scope.formData = {};
                        $scope.steps = data;
                        console.log(data);
                    })
                    .error(function(error){
                        console.log('Error: ' + error);
                    });

            })
    };

    $scope.showTable = function(){
        console.log($scope.formData);
        if($scope.formData.team){
            return true;
        }
        return false;
    }

}
