angular.module('currPatient', [])
    .factory('Patient', function () {
        var patient = null;
        var chart = null;
        return {
            savePatient: function (pat) {
                patient = pat;
            },
            getPatient: function () {
                return patient;
            },
            setLifeChart: function(chart) {
                chart = chart;
            },
            getChart: function() {
                return chart;
            }
        }
    }
);