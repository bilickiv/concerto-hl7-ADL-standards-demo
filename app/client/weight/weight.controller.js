(function () {
    'use strict';

    angular
        .module('weight')
        .controller('WeightController', WeightController);

    WeightController.$inject = ['$scope', '$state', 'weightService', 'constants', 'Patient'];

    function WeightController($scope, $state, weightService, constants, Patient) {

        var vm = this;
        vm.setFilter = setFilter;
        vm.isFilter = isFilter;
        vm.filterData = filterData;
        vm.statChart = statChart;
        activate();

        function activate() {
            var patient = Patient.getPatient();
            if (patient) {
                vm.activeFilter = 'all';
                vm.tagSelect = 'All';
                vm.statSelect = constants.weightMonthCode;
                vm.imageUrl = '../utils/logo.png';

                weightService.getData()
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
                    vm.statSelect = constants.weightWeekCode;
                    break;
                case 'week':
                    filterDate.setDate(filterDate.getDate() - 7);
                    vm.statSelect = constants.weightWeekCode;
                    break;
                case 'month':
                    filterDate.setMonth(filterDate.getMonth() - 1);
                    vm.statSelect = constants.weightMonthCode;
                    break;
                case 'year':
                    filterDate.setFullYear(filterDate.getFullYear() - 1);
                    vm.statSelect = constants.weightMonthCode;
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

        function statChart() {
            weightService.getStats(vm.statSelect).then(function(data) {
                var cData = [];
                angular.forEach(data, function(value, key) {
                    var weightAvg = parseFloat(value.resource.component[0].valueQuantity.value);
                    cData.push([value.resource.effectiveDateTime.substring(0,10), weightAvg-5, weightAvg, weightAvg, weightAvg+5]);
                });
                vm.candleChartData = cData;
                vm.candleChartOptions = {
                    legend: {
                        position: 'none'
                    },
                    tooltip: {
                        trigger: 'none'
                    }
                };
            });
        }

        function createCharts() {
            vm.filteredData.sort(measureOrganize);

            vm.weightChart = {};
            vm.weightChart.type = 'LineChart';
            vm.weightChart.data = {
                'cols': [
                    {id: 'date', type: 'date'},
                    {id: 'value', label: 'Weight', type: 'number'}
                ], 'rows': []
            };
            for (var i = 0; i < vm.filteredData.length; i++) {
                vm.weightChart.data.rows.push({
                    c: [
                        {v: new Date(vm.filteredData[i].resource.effectiveDateTime)},
                        {v: vm.filteredData[i].resource.component[0].valueQuantity.value}
                    ]
                });
            }
            vm.weightChart.options = {
                hAxis: {
                    title: 'Date',
                    viewWindowMode: 'pretty',
                    minValue: vm.startDate,
                    maxValue: vm.endDate
                },
                legend: {
                    position: 'left'
                },
                title: 'Weight',
                pointSize: 10,
                curveType: 'function'
            };
            statChart();
        }

        function measureOrganize(a, b) {
            var aDate = new Date(a.resource.effectiveDateTime);
            var bDate = new Date(b.resource.effectiveDateTime);
            return aDate > bDate ? -1 : aDate < bDate ? 1 : 0;
        }
    }

})();
