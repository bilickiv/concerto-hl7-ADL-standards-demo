'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */
angular.module('sbAdminApp')
    .directive('alertlist', function () {
        return {
            templateUrl: 'scripts/directives/alertlist/alertlist.html',
            restrict: 'E',
            replace: true,
            scope: {
                'alerts': '='
            }
        }
    });
