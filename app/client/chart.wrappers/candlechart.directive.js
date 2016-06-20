angular.module('clientChart')
    .directive('candlechart', function () {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                data: '=',
                options: '='
            },
            template: '<div class="chart"></div>',
            link: function (scope, element, attrs) {

                if(google !== 'undefined') {
                    var chart = new google.visualization.CandlestickChart(element[0]);

                    scope.$watch('data', function (v) {
                        if(v) {
                            var data = google.visualization.arrayToDataTable(v, true);
                            chart.draw(data, scope.options);
                        }

                    });
                }
            }
        }
    });