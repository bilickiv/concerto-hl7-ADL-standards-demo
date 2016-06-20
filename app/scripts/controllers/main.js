'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
    .controller('MainCtrl', function ($scope, $state, $position, $http, Patient, constants, GCharts) {

        var vm = this;
        var patient;
        vm.showAlert = showAlert;
        vm.events = [];

        activate();

        function activate() {
            vm.alertList = false;
            vm.exampleAlerts = [
                {
                    "id": "WARN1",
                    date: "2016-05-01",
                    "severity": "critical",
                    "desc": "Heart rate critical, ..."
                }
            ];

            patient = Patient.getPatient();
            if (patient) {
                vm.pname = patient.name[0].family[0] + ' ' + patient.name[0].given[0];
                vm.pBDay = new Date(patient.birthDate).toISOString().substring(0, 10);
                vm.pSex = patient.gender;
                vm.pID = patient.id;
                getBP();
            } else {
                $state.go('dashboard.patientlist');
            }
        }

        function showAlert() {
            vm.alertList = !vm.alertList;
        }

        function getBP() {
            $http.get(constants.observationUrl, {
                params: {
                    "patient._id": patient.id,
                    "code": "http://loinc.org|55284-4",
                    "_sort:desc": "date",
                    "_count": 10
                }
            }).then(function (data) {
                vm.bloodpressure = data.data.entry;
                getBO();

            }).catch(function (error) {
                console.log('error no data');
            })
        }

        function getBO() {
            $http.get(constants.observationUrl, {
                params: {
                    "patient._id": patient.id,
                    "code": "http://loinc.org|20564-1",
                    "_sort:desc": "date",
                    "_count": 10
                }
            }).then(function (data) {
                vm.bloodoxy = data.data.entry;
                getW();

            }).catch(function (error) {
                console.log('error no data');
            })
        }

        function getW() {
            $http.get(constants.observationUrl, {
                params: {
                    "patient._id": patient.id,
                    "code": "http://loinc.org|29463-7",
                    "_sort:desc": "date",
                    "_count": 10
                }
            }).then(function (data) {
                vm.weight = data.data.entry;
                getPL();

            }).catch(function (error) {
                console.log('error no data');
            })
        }

        function getPL() {
            $http.get(constants.observationUrl, {
                params: {
                    "patient._id": patient.id,
                    "code": "http://loinc.org|8867-4",
                    "_sort:desc": "date",
                    "_count": 10
                }
            }).then(function (data) {
                vm.plethysmo = data.data.entry;
                getCoffeine();

            }).catch(function (error) {
                console.log('error no data');
            })
        }

        function getCoffeine() {
            $http.get(constants.observationUrl, {
                params: {
                    "patient._id": patient.id,
                    "code": "http://loinc.org|61480-0",
                    "_sort:desc": "date",
                    "_count": 10
                }
            }).then(function (data) {
                vm.coffeine = data.data.entry;
                getAlcohol();

            }).catch(function (error) {
                console.log('error no data');
            })
        }

        function getAlcohol() {
            $http.get(constants.observationUrl, {
                params: {
                    "patient._id": patient.id,
                    "code": "http://loinc.org|74013-4",
                    "_sort:desc": "date",
                    "_count": 10
                }
            }).then(function (data) {
                vm.alcohol = data.data.entry;
                getSmoking();

            }).catch(function (error) {
                console.log('error no data');
            })
        }

        function getSmoking() {
            $http.get(constants.observationUrl, {
                params: {
                    "patient._id": patient.id,
                    "code": "http://loinc.org|63640-7",
                    "_sort:desc": "date",
                    "_count": 10
                }
            }).then(function (data) {
                vm.smoking = data.data.entry;
                getExercise();

            }).catch(function (error) {
                console.log('error no data');
            })
        }

        function getExercise() {
            $http.get(constants.observationUrl, {
                params: {
                    "patient._id": patient.id,
                    "code": "http://loinc.org|55412-1",
                    "_sort:desc": "date",
                    "_count": 10
                }
            }).then(function (data) {
                vm.exercise = data.data.entry;
                initDashboard();

            }).catch(function (error) {
                console.log('error no data');
            })
        }

        function initDashboard() {

            if (vm.plethysmo) {
                vm.plethysmo.sort(measureOrganize);
            }
            if (vm.bloodoxy) {
                vm.bloodoxy.sort(measureOrganize);
            }
            if (vm.bloodpressure) {
                vm.bloodpressure.sort(measureOrganize);
            }
            if (vm.weight) {
                vm.weight.sort(measureOrganize);
            }
            if (vm.coffeine) {
                vm.coffeine.sort(measureOrganize);
            }
            if (vm.alcohol) {
                vm.alcohol.sort(measureOrganize);
            }
            if (vm.smoking) {
                vm.smoking.sort(measureOrganize);
            }
            if (vm.exercise) {
                vm.exercise.sort(measureOrganize);
            }

            vm.dash = [];
            vm.dash.plethysmo = vm.plethysmo ? vm.plethysmo[0].resource.component[0].valueQuantity.value.toFixed(0) : "--";
            vm.dash.bloodoxy = vm.bloodoxy ? vm.bloodoxy[0].resource.component[0].valueQuantity.value.toFixed(0) : "--";
            vm.dash.bloodpressure = vm.bloodpressure ? vm.bloodpressure[0].resource.component[0].valueQuantity.value.toFixed(0) + "/" +
            vm.bloodpressure[0].resource.component[1].valueQuantity.value.toFixed(0) : "--";
            vm.dash.weight = vm.weight ? vm.weight[0].resource.component[0].valueQuantity.value.toFixed(0) : "--";

            vm.dash.coffeine = vm.coffeine ? vm.coffeine[0].resource.component[0].valueQuantity.value.toFixed(0) : "--";
            vm.dash.alcohol = vm.alcohol ? vm.alcohol[0].resource.component[0].valueQuantity.value.toFixed(0) : "--";
            vm.dash.smoking = vm.smoking ? vm.smoking[0].resource.component[0].valueQuantity.value.toFixed(0) : "--";
            vm.dash.exercise = vm.exercise ? vm.exercise[0].resource.component[0].valueQuantity.value.toFixed(0) : "--";

            angular.forEach(vm.plethysmo, pushLastDate);
            angular.forEach(vm.bloodoxy, pushLastDate);
            angular.forEach(vm.bloodpressure, pushLastDate);
            angular.forEach(vm.weight, pushLastDate);
            angular.forEach(vm.coffeine, pushLastDate);
            angular.forEach(vm.alcohol, pushLastDate);
            angular.forEach(vm.smoking, pushLastDate);
            angular.forEach(vm.exercise, pushLastDate);

            vm.events.sort(function (a, b) {
                var aDate = new Date(a.date);
                var bDate = new Date(b.date);
                return aDate > bDate ? -1 : aDate < bDate ? 1 : 0;
            });

            angular.forEach(vm.events, function (value, key) {
                value.pos = ((key % 2) == 0) ? "" : "timeline-inverted";
            });

        }

        function measureOrganize(a, b) {
            var aDate = new Date(a.resource.effectiveDateTime);
            var bDate = new Date(b.resource.effectiveDateTime);
            return aDate > bDate ? -1 : aDate < bDate ? 1 : 0;
        }

        function pushLastDate(value, key) {
            var actualDate = new Date();
            actualDate.setDate(actualDate.getDate() - 1);
            var effDate = new Date(value.resource.effectiveDateTime);
            if (actualDate <= effDate) {
                var pushable = {};
                pushable.date = effDate.toLocaleString();
                switch (value.resource.code.coding[0].code) {
                    case '20564-1':
                        pushable.type = "tint";
                        pushable.title = "Oxygen Saturation Upload";
                        pushable.text = "Saturation: " + value.resource.component[0].valueQuantity.value.toFixed(2) + ", Pulse: " +
                            value.resource.component[1].valueQuantity.value.toFixed(2);
                        pushable.color = "danger";
                        break;
                    case '8867-4':
                        pushable.type = "heartbeat";
                        pushable.title = "Plethysmograph Upload";
                        pushable.text = "HR: " + value.resource.component[0].valueQuantity.value.toFixed(2) + ", DeltaHR: " +
                            value.resource.component[1].valueQuantity.value.toFixed(2);
                        pushable.color = "danger";
                        break;
                    case '29463-7':
                        pushable.type = "balance-scale";
                        pushable.title = "Weight Upload";
                        pushable.text = "Weight: " + value.resource.component[0].valueQuantity.value.toFixed(2);
                        pushable.color = "danger";
                        break;
                    case '55284-4':
                        pushable.type = "heart";
                        pushable.title = "Bloodpressure Upload";
                        pushable.text = "Systolic: " + value.resource.component[0].valueQuantity.value.toFixed(2) + ", Diastolic: " +
                            value.resource.component[1].valueQuantity.value.toFixed(2) + ", Pulse: " + value.resource.component[2].valueQuantity.value.toFixed(2);
                        pushable.color = "danger";
                        break;
                    case '61480-0':
                        pushable.type = "coffee";
                        pushable.title = "Coffee Upload";
                        pushable.text = "Daily value of coffee consumption: " + value.resource.component[0].valueQuantity.value.toFixed(2);
                        pushable.color = "danger";
                        break;
                    case '74013-4':
                        pushable.type = "beer";
                        pushable.title = "Alcohol Upload";
                        pushable.text = "Daily Units of Alcohol Consumption: " + value.resource.component[0].valueQuantity.value.toFixed(2);
                        pushable.color = "danger";
                        break;
                    case '63640-7':
                        pushable.type = "times";
                        pushable.title = "Smoking Upload";
                        pushable.text = "Daily value of smoking: " + value.resource.component[0].valueQuantity.value.toFixed(2);
                        pushable.color = "danger";
                        break;
                    case '55412-1':
                        pushable.type = "male";
                        pushable.title = "Exercise Upload";
                        pushable.text = "Daily Exercise: " + value.resource.component[0].valueQuantity.value.toFixed(2);
                        pushable.color = "danger";
                        break;
                    default:
                        break;
                }
                vm.events.push(pushable);
            }
        }

    });
