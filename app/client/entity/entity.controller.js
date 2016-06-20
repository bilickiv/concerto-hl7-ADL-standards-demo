(function () {
    'use strict';

    angular
        .module('entity')
        .controller('EntityController', EntityController);

    EntityController.$inject = ['$scope', '$state', '$stateParams', 'entityService'];

    function EntityController($scope, $state, $stateParams, entityService) {

        var vm = this;

        activate();

        function activate() {
            vm.record = $stateParams.record.resource;
            entityService.getPatient(vm.record.subject.reference)
                .then(function (data) {
                    vm.patient = data;
                    parseChart();
                });
        }

        function parseChart() {
            vm.chartData = vm.record.component[5].valueSampledData.data.split(' ');
            vm.pulseWave = {};
            vm.pulseWave.type = 'LineChart';
            vm.pulseWave.data = {
                'cols': [
                    {id: 'sec', type: 'number'},
                    {id: 'value', label: 'value', type: 'number'}
                ], 'rows': []
            };
            for (var i = 0; i < vm.chartData.length; i++) {
                var values = vm.chartData[i].split(':');
                vm.pulseWave.data.rows.push({
                    c: [
                        {v: values[0]},
                        {v: values[1]}
                    ]
                });
            }
            vm.pulseWave.options = {
                hAxis: {
                    title: 'Seconds',
                    gridlines: {count: 40},
                    minValue: 0,
                    maxValue: vm.pulseWave.data.length,
                    minorGridlines: {count: 4}
                },
                vAxis: {
                    title: 'Values',
                    gridlines: {count: 20},
                    textPosition: 'none',
                    minorGridlines: {count: 4}
                },
                chartArea: {
                    backgroundColor: {fill: '#ffe5ea'}
                },
                colors: ['black'],
                title: 'HR Measurement',
                pointSize: 0,
                curveType: 'function'
            };
        }

    }

})();
