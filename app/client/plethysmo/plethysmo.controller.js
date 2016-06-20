(function () {
    'use strict';

    angular
        .module('plethysmo')
        .controller('PlethysmoController', PlethysmoController);

    PlethysmoController.$inject = ['$scope', '$state', 'plethysmoService', 'Patient'];

    function PlethysmoController($scope, $state, plethysmoService, Patient) {

        var vm = this;
        vm.setFilter = setFilter;
        vm.isFilter = isFilter;
        vm.filterData = filterData;
        vm.clickHandler = clickHandler;
        activate();

        function activate() {
            var patient = Patient.getPatient();
            if(patient) {
                vm.activeFilter = 'month';
                vm.tagSelect = 'All';
                vm.imageUrl = '../utils/logo.png';
                plethysmoService.getData()
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

        function clickHandler(record) {
            $state.go('dashboard.entity', {record: vm.filteredData[record.row]});
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
            /*if(vm.activeFilter=='day') {
                vm.startDate.setDate(vm.startDate.getDate()-1);
            }*/
            for (var i = vm.originalData.length-1; i >= 0; i--) {
                var oldDate = new Date(vm.originalData[i].resource.effectiveDateTime);
                if (vm.activeFilter === 'all' || oldDate >= filterDate) {
                    if (vm.tagSelect === 'All' || vm.originalData[i].resource.code.coding[1].code === vm.tagSelect) {
                        vm.filteredData.push(vm.originalData[i]);
                    }
                }
            }
            createCharts();
        }

        function createCharts() {

            vm.filteredData.sort(measureOrganize);

            vm.hrChart = {};
            vm.hrChart.type = 'LineChart';
            vm.hrChart.data = {
                'cols': [
                    {id: 'date', type: 'date'},
                    {id: 'value', label: 'HR Value', type: 'number'},
                    {id: 'type', label: 'Tag', type: 'string', role: 'annotation'}
                ], 'rows': []
            };
            for (var i = 0; i < vm.filteredData.length; i++) {
                vm.hrChart.data.rows.push({
                    c: [
                        {v: new Date(vm.filteredData[i].resource.effectiveDateTime)},
                        {v: vm.filteredData[i].resource.component[0].valueQuantity.value},
                        {v: vm.filteredData[i].resource.code.coding[1].code}
                    ]
                });
            }
            vm.hrChart.options = {
                hAxis: {
                    title: 'Date',
                    viewWindowMode: 'pretty',
                    minValue: vm.startDate,
                    maxValue: vm.endDate


                },
                vAxis: {
                    title: 'Value'
                },
                title: 'HR Values',
                pointSize: 10,
                curveType: 'function'
            };
            vm.hrvChart = {};
            vm.hrvChart.type = 'LineChart';
            vm.hrvChart.data = {
                'cols': [
                    {id: 'date', type: 'date'},
                    {id: 'value', label: 'Delta HR', type: 'number'},
                    {id: 'type', label: 'Tag', type: 'string', role: 'annotation'}
                ], 'rows': []
            };
            for (var i = 0; i < vm.filteredData.length; i++) {
                vm.hrvChart.data.rows.push({
                    c: [
                        {v: new Date(vm.filteredData[i].resource.effectiveDateTime)},
                        {v: vm.filteredData[i].resource.component[1].valueQuantity.value},
                        {v: vm.filteredData[i].resource.code.coding[1].code}
                    ]
                });
            }
            vm.hrvChart.options = {
                hAxis: {
                    title: 'Date',
                    viewWindowMode: 'pretty',
                    minValue: vm.startDate,
                    maxValue: vm.endDate
                },
                vAxis: {
                    title: 'Value'
                },
                title: 'Delta HR Values',
                pointSize: 10,
                curveType: 'function'
            };
            vm.sdnnChart = {};
            vm.sdnnChart.type = 'LineChart';
            vm.sdnnChart.data = {
                'cols': [
                    {id: 'date', type: 'date'},
                    {id: 'value', label: 'SDNN', type: 'number'},
                    {id: 'type', label: 'Tag', type: 'string', role: 'annotation'}
                ], 'rows': []
            };
            for (var i = 0; i < vm.filteredData.length; i++) {
                vm.sdnnChart.data.rows.push({
                    c: [
                        {v: new Date(vm.filteredData[i].resource.effectiveDateTime)},
                        {v: vm.filteredData[i].resource.component[2].valueQuantity.value},
                        {v: vm.filteredData[i].resource.code.coding[1].code}
                    ]
                });
            }
            vm.sdnnChart.options = {
                hAxis: {
                    title: 'Date',
                    viewWindowMode: 'pretty',
                    minValue: vm.startDate,
                    maxValue: vm.endDate
                },
                vAxis: {
                    title: 'Value'
                },
                title: 'SDNN',
                pointSize: 10,
                curveType: 'function'
            };
            vm.rmssdChart = {};
            vm.rmssdChart.type = 'LineChart';
            vm.rmssdChart.data = {
                'cols': [
                    {id: 'date', type: 'date'},
                    {id: 'value', label: 'rMSSD', type: 'number'},
                    {id: 'type', label: 'Tag', type: 'string', role: 'annotation'}
                ], 'rows': []
            };
            for (var i = 0; i < vm.filteredData.length; i++) {
                vm.rmssdChart.data.rows.push({
                    c: [
                        {v: new Date(vm.filteredData[i].resource.effectiveDateTime)},
                        {v: vm.filteredData[i].resource.component[3].valueQuantity.value},
                        {v: vm.filteredData[i].resource.code.coding[1].code}
                    ]
                });
            }
            vm.rmssdChart.options = {
                hAxis: {
                    title: 'Date',
                    viewWindowMode: 'pretty',
                    minValue: vm.startDate,
                    maxValue: vm.endDate
                },
                vAxis: {
                    title: 'Value'
                },
                title: 'rMSSD',
                pointSize: 10,
                curveType: 'function'
            };
            vm.pnn50Chart = {};
            vm.pnn50Chart.type = 'LineChart';
            vm.pnn50Chart.data = {
                'cols': [
                    {id: 'date', type: 'date'},
                    {id: 'value', label: 'pNN50', type: 'number'},
                    {id: 'type', label: 'Tag', type: 'string', role: 'annotation'}
                ], 'rows': []
            };
            for (var i = 0; i < vm.filteredData.length; i++) {
                vm.pnn50Chart.data.rows.push({
                    c: [
                        {v: new Date(vm.filteredData[i].resource.effectiveDateTime)},
                        {v: vm.filteredData[i].resource.component[4].valueQuantity.value},
                        {v: vm.filteredData[i].resource.code.coding[1].code}
                    ]
                });
            }
            vm.pnn50Chart.options = {
                hAxis: {
                    title: 'Date',
                    viewWindowMode: 'pretty',
                    minValue: vm.startDate,
                    maxValue: vm.endDate
                },
                vAxis: {
                    title: 'Value'
                },
                title: 'pNN50',
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
