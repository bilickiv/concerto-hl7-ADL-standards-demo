//'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
    .controller('PatientListCtrl', function ($scope, $position, $http, constants, $state, Patient) {

        var vm = this;
        vm.patients = [];
        vm.patientClick = patientClick;
        vm.clickHipertonia = clickHipertonia;
        vm.settingClick = settingClick;

        activate();

        function activate() {
            vm.hipertonia = false;
            $http.get(constants.patientUrl, {params: {
                    "_count": 50
            }})
                .then(function (result) {
                    angular.forEach(result.data.entry, function (value, key) {
                        if (value.resource.id.indexOf('CON') > -1) {
                            vm.patients.push(value);
                        }
                    });
                    vm.patients.sort(function(a,b) {
                        return a.resource.id > b.resource.id;
                    });

                })
                .catch(function (error) {
                    console.log('Error' + error);
                });
        }

        function patientClick(patient) {
            Patient.savePatient(patient.resource);
            $state.go('dashboard.home', {}, {reload: false});
        }

        function settingClick(patient) {
            Patient.savePatient(patient.resource);
            $state.go('dashboard.settings', {}, {reload: false});
        }

        function clickHipertonia() {
            vm.hipertonia = !vm.hipertonia;
        }

    });
