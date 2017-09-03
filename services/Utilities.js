/**
 * Created by bryoe on 9/2/2017.
 */
class Utilities {


    static formatArray(array, parameter, callback){
        var newArr = [];
        for(var i = 0; i < array.length; i++){
            newArr.push({parameter : array[i][parameter]});
        }

        callback(newArr);
    }

}

module.export = Utilities;