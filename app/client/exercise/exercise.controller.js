(function () {
    'use strict';

    angular
        .module('exercise')
        .controller('ExerciseController', ExerciseController);

    ExerciseController.$inject = ['$scope', '$state', 'exerciseService', 'Patient'];

    function ExerciseController($scope, $state, exerciseService, Patient) {

        var vm = this;
        vm.setFilter = setFilter;
        vm.isFilter = isFilter;
        vm.filterData = filterData;
        activate();

        function activate() {
            var patient = Patient.getPatient();
            if(patient) {
                vm.activeFilter = 'all';
                vm.tagSelect = 'All';
                vm.imageUrl = '../utils/logo.png';

                exerciseService.getData()
                    .then(function (data) {
                        vm.originalData = data;
                        filterData();
                    })
                    .catch(function (error) {
                        console.error(error);
                    });
            } else {
                $state.go('dashboard.patientlist');
            }
        }

        function setFilter(filtername) {
            if (vm.activeFilter === filtername && vm.activeFilter !== 'all') vm.activeFilter = 'all';
            else vm.activeFilter = filtername;
            filterData();
        }

        function isFilter(filtername) {
            return vm.activeFilter === filtername;
        }

        function filterData() {
            vm.filteredData = [];
            var filterDate = new Date();
            vm.endDate = filterDate;
            switch (vm.activeFilter) {
                case 'day':
                    filterDate.setDate(filterDate.getDate() - 1);
                    break;
                case 'week':
                    filterDate.setDate(filterDate.getDate() - 7);
                    break;
                case 'month':
                    filterDate.setMonth(filterDate.getMonth() - 1);
                    break;
                case 'year':
                    filterDate.setFullYear(filterDate.getFullYear() - 1);
                    break;
                case 'all':
                    break;
            }
            vm.startDate = filterDate;
            for (var i = vm.originalData.length - 1; i >= 0; i--) {
                var oldDate = new Date(vm.originalData[i].resource.effectiveDateTime);
                if (vm.activeFilter === 'all' || oldDate >= filterDate) {
                    vm.filteredData.push(vm.originalData[i]);
                }
            }
            createCharts();
        }

        function createCharts() {
            vm.filteredData.sort(measureOrganize);

            vm.lifestyleChart = {};
            vm.lifestyleChart.type = 'LineChart';
            vm.lifestyleChart.data = {
                'cols': [
                    {id: 'date', type: 'date'},
                    {id: 'value', label: 'Exercise', type: 'number'}
                ], 'rows': []
            };
            for (var i = 0; i < vm.filteredData.length; i++) {
                vm.lifestyleChart.data.rows.push({
                    c: [
                        {v: new Date(vm.filteredData[i].resource.effectiveDateTime)},
                        {v: vm.filteredData[i].resource.component[0].valueQuantity.value}
                    ]
                });
            }
            vm.lifestyleChart.options = {
                hAxis: {
                    title: 'Date',
                    viewWindowMode: 'pretty',
                    minValue: vm.startDate,
                    maxValue: vm.endDate
                },
                legend: {
                    position: 'left'
                },
                title: 'Exercise Distance (km)',
                pointSize: 10,
                curveType: 'function'
            };
        }

        function measureOrganize(a, b) {
            var aDate = new Date(a.resource.effectiveDateTime);
            var bDate = new Date(b.resource.effectiveDateTime);
            return aDate > bDate ? -1 : aDate < bDate ? 1 : 0;
        }

    }

})();
