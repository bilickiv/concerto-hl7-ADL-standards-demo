(function () {
    'use strict';

    angular
        .module('exercise')
        .factory('exerciseService', exerciseService);

    exerciseService.$inject = ['$http', '$log', '$q', '$state', 'constants', 'Patient'];

    function exerciseService($http, $log, $q, $state, constants, Patient) {

        return {
            getData: getData
        };

        function getData() {
            var returnData = [];
            return $q(function (resolve, reject) {
                $http.get(constants.observationUrl, {
                        params: {
                            "patient._id": Patient.getPatient().id,
                            "_sort:desc": "date",
                            "code": "http://loinc.org|55412-1",
                            "_count": 100
                        }
                    })
                    .then(function (result) {
                        angular.forEach(result.data.entry, function (value, key) {
                            returnData.push(value);
                        });
                        pager(result, resolve, returnData);
                    }).catch(function (error) {
                    $log.debug(error);
                    reject(error);
                })
            })
        }

        function pager(result, resolve, returnData) {
            if (result.data.link[1]) {
                if (result.data.link[1].relation == "next") {
                    $http.get(result.data.link[1].url).then(function (newData) {
                        angular.forEach(newData.data.entry, function (value, key) {
                            returnData.push(value);
                        });
                        pager(newData, resolve, returnData);
                    }).catch(function (error) {
                        console.log(error);
                    })
                } else {
                    resolve(returnData);
                }
            }
            else {
                resolve(returnData);
            }

        }
    }

})();
