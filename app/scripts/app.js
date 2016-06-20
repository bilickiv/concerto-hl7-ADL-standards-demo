'use strict';
/**
 * @ngdoc overview
 * @name sbAdminApp
 * @description
 * # sbAdminApp
 *
 * Main module of the application.
 */
angular
    .module('sbAdminApp', [
        'oc.lazyLoad',
        'ui.router',
        'ui.bootstrap',
        'angular-loading-bar',
        'ngMaterial',
        'googlechart',
        'plethysmo',
        'bloodoxy',
        'entity',
        'bloodpressure',
        'weight',
        'currPatient',
        'alcohol',
        'coffeine',
        'smoking',
        'exercise',
        'clientChart'
    ])
    .config(['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider', function ($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {

        $ocLazyLoadProvider.config({
            debug: false,
            events: true
        });

        $urlRouterProvider.otherwise('/dashboard/patientlist');

        $stateProvider
            .state('dashboard', {
                url: '/dashboard',
                templateUrl: 'views/dashboard/main.html',
                resolve: {
                    loadMyDirectives: function ($ocLazyLoad) {
                        return $ocLazyLoad.load(
                            {
                                name: 'sbAdminApp',
                                files: [
                                    'scripts/directives/header/header.js',
                                    'scripts/directives/header/header-notification/header-notification.js',
                                    'scripts/directives/sidebar/sidebar.js',
                                    'scripts/directives/sidebar/sidebar-search/sidebar-search.js',
                                    'scripts/controllers/patientListController.js'
                                ]
                            }),
                            $ocLazyLoad.load(
                                {
                                    name: 'toggle-switch',
                                    files: ["bower_components/angular-toggle-switch/angular-toggle-switch.min.js",
                                        "bower_components/angular-toggle-switch/angular-toggle-switch.css"
                                    ]
                                }),
                            $ocLazyLoad.load(
                                {
                                    name: 'ngAnimate',
                                    files: ['bower_components/angular-animate/angular-animate.js']
                                })
                        $ocLazyLoad.load(
                            {
                                name: 'ngCookies',
                                files: ['bower_components/angular-cookies/angular-cookies.js']
                            })
                        $ocLazyLoad.load(
                            {
                                name: 'ngResource',
                                files: ['bower_components/angular-resource/angular-resource.js']
                            })
                        $ocLazyLoad.load(
                            {
                                name: 'ngSanitize',
                                files: ['bower_components/angular-sanitize/angular-sanitize.js']
                            })
                        $ocLazyLoad.load(
                            {
                                name: 'ngTouch',
                                files: ['bower_components/angular-touch/angular-touch.js']
                            })
                        $ocLazyLoad.load(
                            {
                                name: 'ngRoute',
                                files: ['bower_components/angular-route/angular-route.js']
                            })
                    }
                }
            })
            .state('dashboard.home', {
                url: '/home',
                controller: 'MainCtrl',
                controllerAs: 'vm',
                templateUrl: 'views/dashboard/home.html',
                resolve: {
                    loadMyFiles: function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'sbAdminApp',
                            files: [
                                'scripts/controllers/main.js',
                                'scripts/directives/timeline/timeline.js',
                                'scripts/directives/notifications/notifications.js',
                                'scripts/directives/chat/chat.js',
                                'scripts/directives/dashboard/stats/stats.js',
                                'scripts/directives/movestat/movestat.js',
                                'scripts/directives/patientinfo/patientinfo.js',
                                'scripts/directives/alertlist/alertlist.js'
                            ]
                        })
                    }
                }
            })
            .state('dashboard.settings', {
                url: '/settings',
                templateUrl: 'views/settings.html',
                controller: 'SettingsCtrl',
                controllerAs: 'vm',
                resolve: {
                    loadMyFiles: function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'sbAdminApp',
                            files: [
                                'scripts/controllers/settings.js'
                            ]
                        })
                    }
                }
            })
            .state('dashboard.patientlist', {
                url: '/patientlist',
                templateUrl: 'views/pages/patientlist.html',
                controller: 'PatientListCtrl',
                controllerAs: 'vm'
            })
            .state('dashboard.plethysmo', {
                url: '/plethysmo',
                templateUrl: 'client/plethysmo/plethysmo.html',
                controller: 'PlethysmoController',
                controllerAs: 'vm'
            })
            .state('dashboard.entity', {
                url: '/entity',
                templateUrl: 'client/entity/entity.html',
                controller: 'EntityController',
                params: {record: null},
                controllerAs: 'vm'
            })
            .state('dashboard.bloodoxy', {
                url: '/bloodoxy',
                templateUrl: 'client/bloodoxy/bloodoxy.html',
                controller: 'BloodoxyController',
                controllerAs: 'vm'
            })
            .state('dashboard.bloodpressure', {
                url: '/bloodpressure',
                templateUrl: 'client/bloodpressure/bloodpressure.html',
                controller: 'BloodpressureController',
                controllerAs: 'vm'
            })
            .state('dashboard.weight', {
                url: '/weight',
                templateUrl: 'client/weight/weight.html',
                controller: 'WeightController',
                controllerAs: 'vm'
            })
            .state('dashboard.alcohol', {
                url: '/alcohol',
                templateUrl: 'client/alcohol/alcohol.html',
                controller: 'AlcoholController',
                controllerAs: 'vm'
            })
            .state('dashboard.coffeine', {
                url: '/coffeine',
                templateUrl: 'client/coffeine/coffeine.html',
                controller: 'CoffeineController',
                controllerAs: 'vm'
            })
            .state('dashboard.exercise', {
                url: '/exercise',
                templateUrl: 'client/exercise/exercise.html',
                controller: 'ExerciseController',
                controllerAs: 'vm'
            })
            .state('dashboard.smoking', {
                url: '/smoking',
                templateUrl: 'client/smoking/smoking.html',
                controller: 'SmokingController',
                controllerAs: 'vm'
            })
            .state('dashboard.form', {
                templateUrl: 'views/form.html',
                url: '/form'
            })
            .state('dashboard.blank', {
                templateUrl: 'views/pages/blank.html',
                url: '/blank'
            })
            .state('login', {
                templateUrl: 'views/pages/login.html',
                url: '/login'
            })
            .state('dashboard.chart', {
                templateUrl: 'views/chart.html',
                url: '/chart',
                controller: 'ChartCtrl',
                resolve: {
                    loadMyFile: function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'chart.js',
                            files: [
                                'bower_components/angular-chart.js/dist/angular-chart.min.js',
                                'bower_components/angular-chart.js/dist/angular-chart.css'
                            ]
                        }),
                            $ocLazyLoad.load({
                                name: 'sbAdminApp',
                                files: ['scripts/controllers/chartContoller.js']
                            })
                    }
                }
            })
            .state('dashboard.table', {
                templateUrl: 'views/table.html',
                url: '/table'
            })
            .state('dashboard.panels-wells', {
                templateUrl: 'views/ui-elements/panels-wells.html',
                url: '/panels-wells'
            })
            .state('dashboard.buttons', {
                templateUrl: 'views/ui-elements/buttons.html',
                url: '/buttons'
            })
            .state('dashboard.notifications', {
                templateUrl: 'views/ui-elements/notifications.html',
                url: '/notifications'
            })
            .state('dashboard.typography', {
                templateUrl: 'views/ui-elements/typography.html',
                url: '/typography'
            })
            .state('dashboard.icons', {
                templateUrl: 'views/ui-elements/icons.html',
                url: '/icons'
            })
            .state('dashboard.grid', {
                templateUrl: 'views/ui-elements/grid.html',
                url: '/grid'
            })
    }]);

    
