(function () {
    'use strict';

    angular
        .module('bloodoxy')
        .controller('BloodoxyController', BloodoxyController);

    BloodoxyController.$inject = ['$scope', '$state', 'bloodoxyService', 'Patient'];

    function BloodoxyController($scope, $state, bloodoxyService, Patient) {

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
                bloodoxyService.getData()
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
            /*if (vm.activeFilter == 'day') {
                vm.startDate.setDate(vm.startDate.getDate() - 1);
            }*/
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

            vm.bloodoxyChart = {};
            vm.bloodoxyChart.type = 'LineChart';
            vm.bloodoxyChart.data = {
                'cols': [
                    {id: 'date', type: 'date'},
                    {id: 'saturation', label: 'Oxygen saturation', type: 'number'}
                ], 'rows': []
            };
            for (var i = 0; i < vm.filteredData.length; i++) {
                vm.bloodoxyChart.data.rows.push({
                    c: [
                        {v: new Date(vm.filteredData[i].resource.effectiveDateTime)},
                        {v: vm.filteredData[i].resource.component[0].valueQuantity.value}
                    ]
                });
            }
            vm.bloodoxyChart.options = {
                hAxis: {
                    title: 'Date',
                    viewWindowMode: 'pretty',
                    minValue: vm.startDate,
                    maxValue: vm.endDate


                },
                vAxis: {
                    title: 'Value (%)'
                },
                title: 'Oxygen saturation',
                pointSize: 10,
                curveType: 'function'
            };

            vm.pulseChart = {};
            vm.pulseChart.type = 'LineChart';
            vm.pulseChart.data = {
                'cols': [
                    {id: 'date', type: 'date'},
                    {id: 'pulse', label: 'Pulse', type: 'number'}
                ], 'rows': []
            };
            for (var i = 0; i < vm.filteredData.length; i++) {
                vm.pulseChart.data.rows.push({
                    c: [
                        {v: new Date(vm.filteredData[i].resource.effectiveDateTime)},
                        {v: vm.filteredData[i].resource.component[1].valueQuantity.value}
                    ]
                });
            }
            vm.pulseChart.options = {
                hAxis: {
                    title: 'Date',
                    viewWindowMode: 'pretty',
                    minValue: vm.startDate,
                    maxValue: vm.endDate


                },
                vAxis: {
                    title: 'Value (bpm)'
                },
                title: 'Pulse',
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
