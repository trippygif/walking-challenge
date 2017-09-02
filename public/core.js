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

    $http.get('/api/teams')
        .success(function(data){
            var returnArr = [];
            var run = false;

            if(data.length > 0){
                for(var i = 0; i < data.length; i++){
                    returnArr.push(data[i]['team']);
                    if(i === data.length-1){
                        run = true;
                    }
                }
            }

            else{
                run = true;
            }

            if(run){
                $scope.teams = returnArr;
            }
        })
        .error(function(err){
            console.log('Error: ' + error);
        });

    //post the data to the mongoDB
    //on success, clear out the form for a new entry
    $scope.createSteps = function(){

        $http.get('/api/step-count')
            .success(function(data){
                console.log(data);
                var run = false;


                //need to get this to work, want to do update on rows w/ name && team that exist

                if(data.length > 0){
                    for(var i = 0; i < data.length; i++){
                        if($scope.formData.name === data[i].name){
                            return $http({
                                method: 'PATCH',
                                url: '/api/step-count',
                                data: $scope.formData,
                                headers: {'Content-Type': 'application/json'}
                            })
                                .success(function(data){
                                    $scope.formData = {};
                                    $scope.steps = data;
                                    console.log(data);
                                })
                                .error(function(error){
                                    console.log('Error: ' + error);
                                });
                        }

                        if(i === data.length -1){
                            run = true;
                        }

                    };
                }
                else{
                    run = true;
                }

                if(run){
                    console.log('are we here??');
                    return $http.post('/api/step-count', $scope.formData)
                        .success(function(data){
                            $scope.formData = {};
                            $scope.steps = data;
                            console.log(data);
                        })
                        .error(function(error){
                            console.log('Error: ' + error);
                        });

                }

            })
    }
}
