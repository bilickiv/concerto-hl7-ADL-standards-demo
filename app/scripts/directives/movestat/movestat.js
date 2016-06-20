'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */
angular.module('sbAdminApp')
    .directive('movestat', function () {
        return {
            templateUrl: 'scripts/directives/movestat/movestat.html',
            restrict: 'E',
            replace: true,
            scope: {
                'moves': '=',
                'comments': '@',
                'colour': '@',
                'subtype': '@',
                'type': '@',
                'goto': '@'
            }

        }
    });
