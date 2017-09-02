/**
 * Created by bryoe on 9/2/2017.
 */
//initialization of the angular module
var stepCounter = angular.module('stepCounter', []);

function mainController($scope, $http){
    $scope.formData = {};

    //call the api to get all the step data
    $http.get('/api/step-count')
        .success(function(data){
            $scope.steps = data;
            console.log(data);
        })
        .error(function(error){
            console.log('Error: ' + error);
        });

    //post the data to the mongoDB
    //on success, clear out the form for a new entry
    $scope.createSteps = function(){

        $http.get('/api/step-count')
            .success(function(data){


                console.log(data);

                /*
                if(data.length > 0){
                    data.forEach(function(element){
                        if($scope.formData.name === element.name){
                            return $http.patch('/api/step-count', $scope.formData)
                                .success(function(data){
                                    $scope.formData = {};
                                    $scope.steps = data;
                                    console.log(data);
                                })
                                .error(function(error){
                                    console.log('Error: ' + error);
                                });
                        }
                    });
                }*/

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
    }
}
