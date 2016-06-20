angular.module('clientChart', [])
    .factory('GCharts', function () {

            var chartready = false;
            google.charts.load('current', {packages: ['corechart']});
            google.charts.setOnLoadCallback(chartReady);

            function chartReady() {
                chartready = true;
                console.log('now chart is ready!');
            }

        return {
            hello: function() {
                console.log('Hello from the chart factory');
            }
        }
        }
    );