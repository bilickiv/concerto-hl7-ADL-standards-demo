(function () {
    'use strict';

    angular.module('sbAdminApp')
        .constant('constants', function () {

            var url = 'http://52.29.254.68:8080/hapi-fhir-jpaserver-example/';
            //var url = 'http://0.0.0.0:8080/fhir/';
            var fullUrl = url + 'baseDstu2/';

            return {
                url: fullUrl,
                observationUrl: fullUrl + 'Observation',
                patientUrl: fullUrl + 'Patient',
                bpWeekCode: "SUM_WEEK_BP",
                bpDayCode: "SUM_DAY_BP",
                bpMonthCode: "SUM_MONTH_BP",
                satMonthCode: "SUM_MONTH_SAT",
                satWeekCode: "SUM_WEEK_SAT",
                satDayCode: "SUM_DAY_CODE",
                weightWeekCode: "SUM_WEEK_WEIGHT",
                weightMonthCode: "SUM_MONTH_WEIGHT",
                movDayCode: "SUM_DAY_MOV",
                movWeekCode: "SUM_WEEK_MOV",
                movMonthCode: "SUM_MONTH_MOV",
                pletDayCode: "SUM_DAY_PLET",
                pletWeekCode: "SUM_WEEK_PLET",
                pletMonthCode: "SUM_MONTH_PLET"
            };
        }());
})();

