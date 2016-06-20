'use strict';

angular.module('sbAdminApp')
    .controller('SettingsCtrl', function ($scope, $http, $q, $state, $timeout, constants, Patient, wrapper) {

        var vm = this;
        vm.changeSettings = changeSettings;
        vm.deleteTherapy = deleteTherapy;

        activate();

        function activate() {
            if (Patient.getPatient()) {
                vm.goals = [];
                vm.goalURL = [];
                vm.bpressure = {};
                vm.bpressure.sys = {};
                vm.bpressure.dias = {};
                vm.plethysmo = {};
                vm.movement = {};
                vm.bloodoxy = {};
                vm.weight = {};
                vm.alreadyExists = false;

                getTherapy();
            } else {
                $state.go('dashboard.patientlist');
            }
        }

        function changeSettings() {
            vm.bpressure.sys.tolerance = vm.bpressure.dias.tolerance;

            vm.goals.push(uploadGoal(createGoal('8480-6', 'mm[Hg]', vm.bpressure.sys), vm.bpressure.sys.url));
            vm.goals.push(uploadGoal(createGoal('8462-4', 'mm[Hg]', vm.bpressure.dias), vm.bpressure.dias.url));
            vm.goals.push(uploadGoal(createGoal('29463-7', 'kg', vm.weight), vm.weight.url));
            vm.goals.push(uploadGoal(createGoal('55412-1', 'km', vm.movement), vm.movement.url));
            vm.goals.push(uploadGoal(createGoal('20564-1', '%', vm.bloodoxy), vm.bloodoxy.url));
            vm.goals.push(uploadGoal(createGoal('8867-4', 'bpm', vm.plethysmo), vm.plethysmo.url));

            $q.all(vm.goals).then(function (value) {
                if(vm.goalURL.length === 0) {
                    angular.forEach(value, function (val, key) {
                        var result = val.data.issue[0].diagnostics.split(' ');
                        vm.goalURL.push({
                            reference: 'Goal/' + result[3].split('/')[1]
                        });
                    });
                }
                defineTherapy();
            });
        }

        function defineTherapy() {
            if(!vm.alreadyExists) {
                var therapy = wrapper.carePlan;
                therapy.subject.reference = 'Patient/' + Patient.getPatient().id;
                therapy.period.start = new Date();
                therapy.period.end = vm.endDate;
                therapy.participant[0].member.reference = 'Patient/' + Patient.getPatient().id;
                therapy.participant[1].member.reference = 'Practitioner/CONDOC1';
                therapy.goal = vm.goalURL;
                therapy.activity[0].detail.performer[0].reference = 'Patient/' + Patient.getPatient().id;

                $http.post(constants.url + 'CarePlan', therapy).then(function (data) {
                    $state.go('dashboard.patientlist');
                }).catch(function (error) {
                    console.error(error);
                })
            } else {
                vm.oldTherapy.period.end = vm.endDate;
                $http.put(constants.url + 'CarePlan/' + vm.oldTherapy.id, vm.oldTherapy).then(function (data) {
                    $state.go('dashboard.patientlist');
                }).catch(function (error) {
                    console.error(error);
                });
            }
        }

        function createGoal(code, unit, values) {
            var goal = wrapper.goal();
            goal.subject.reference = 'Patient/' + Patient.getPatient().id;
            goal.extension[0].extension[0].valueCodeableConcept.coding[0].code = code;
            goal.extension[0].extension[1].valueQuantity.value = values.goal;
            goal.extension[0].extension[1].valueQuantity.code = unit;
            goal.extension[0].extension[2].valueQuantity.value = values.tolerance;
            goal.extension[0].extension[3].valueQuantity.value = values.min;
            goal.extension[0].extension[3].valueQuantity.code = unit;
            goal.extension[0].extension[4].valueQuantity.value = values.max;
            goal.extension[0].extension[4].valueQuantity.code = unit;
            return goal;
        }

        function parseGoal(goal, url) {
            switch(goal.extension[0].extension[0].valueCodeableConcept.coding[0].code) {
                case '8480-6':
                    goalLoader(vm.bpressure.sys, goal, url);
                    break;
                case '8462-4':
                    goalLoader(vm.bpressure.dias, goal, url);
                    break;
                case '29463-7':
                    goalLoader(vm.weight, goal, url);
                    break;
                case '55412-1':
                    goalLoader(vm.movement, goal, url);
                    break;
                case '20564-1':
                    goalLoader(vm.bloodoxy, goal, url);
                    break;
                case '8867-4':
                    goalLoader(vm.plethysmo, goal, url);
                    break;
            }
        }

        function goalLoader(local, data, url) {
            local.goal = data.extension[0].extension[1].valueQuantity.value;
            local.tolerance = data.extension[0].extension[2].valueQuantity.value;
            local.min =  data.extension[0].extension[3].valueQuantity.value;
            local.max = data.extension[0].extension[4].valueQuantity.value;
            local.url = url;
        }

        function uploadGoal(goal, url) {
            var upl = goal;
            var deferred = $q.defer();
            if(url) {
                $http.put(constants.url + url, upl).then(function (data) {
                    deferred.resolve(data);
                }).catch(function (error) {
                    deferred.reject(error);
                });
            } else {
                $http.post(constants.url + 'Goal', upl).then(function (data) {
                    deferred.resolve(data);
                }).catch(function (error) {
                    deferred.reject(error);
                });
            }
            return deferred.promise;
        }

        function getTherapy() {
            $http.get(constants.url + 'CarePlan', {
                params: {
                    "subject": Patient.getPatient().id,
                    "_count": 1,
                    "_sort:desc": "_id"
                }
            }).then(function (data) {
                if(data.data.entry) {
                    vm.endDate = new Date(data.data.entry[0].resource.period.end);
                    vm.oldTherapy = data.data.entry[0].resource;
                    vm.alreadyExists = true;
                    vm.goalURL = data.data.entry[0].resource.goal;
                    loadGoals();
                }
            }).catch(function (error) {
                console.log(error);
            })
        }

        function loadGoals() {
            angular.forEach(vm.goalURL, function(value, key) {
                $http.get(constants.url + value.reference
                ).then(function (data) {
                    parseGoal(data.data, value.reference);
                }).catch(function (error) {
                    console.log(error);
                });
            });
        }

        function deleteTherapy() {
            var deletes = [];
            console.log(constants.url + 'CarePlan/' + vm.oldTherapy.id);
            $http.delete(constants.url + 'CarePlan/' + vm.oldTherapy.id).then(function (data) {
                angular.forEach(vm.goalURL, function(value, key) {
                    deletes.push(deleteGoal(value.reference));
                });
                $q.all(deletes).then(function(values) {
                    $state.go('dashboard.patientlist');
                }).catch(function(error) {
                    console.log(error);
                });
            }).catch(function (error) {
                console.error(error);
            });

        }

        function deleteGoal(goalURL) {
            var deferred = $q.defer();
            $http.delete(constants.url + goalURL).then(function (data) {
                deferred.resolve(data);
            }).catch(function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        }

    });