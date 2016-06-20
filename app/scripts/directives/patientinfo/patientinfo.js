'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */
angular.module('sbAdminApp')
    .directive('patientinfo', function () {
        return {
            templateUrl: 'scripts/directives/patientinfo/patientinfo.html',
            restrict: 'E',
            replace: true,
            scope: {
                'name': '@',
                'sex': '@',
                'bdate': '@',
                'id': '@',
                'warning': '@',
                'onWarning': '&'
            }

        }
    });
