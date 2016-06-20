(function () {
    'use strict';

    angular
        .module('entity')
        .factory('entityService', entityService);

    entityService.$inject = ['$http', '$log', '$q', 'constants'];

    function entityService($http, $log, $q, constants) {

        return {
            getPatient: getPatient
        };

        function getPatient(patientId) {
            return $http.get(constants.url + patientId)
                .then(function (result) {
                    return result.data;
                })
                .catch(function (error) {
                    return $q.reject(error);
                });
        }

    }

})();
