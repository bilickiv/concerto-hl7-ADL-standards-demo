var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('angular2/core');
var router_1 = require('angular2/router');
var home_1 = require('../home/home');
var form_1 = require('../form/form');
var auth_1 = require('../auth/auth');
var chart_1 = require('../chart/chart');
var table_1 = require('../table/table');
var buttons_1 = require('../buttons/buttons');
var notifications_1 = require('../notifications/notifications');
var typography_1 = require('../typography/typography');
var icons_1 = require('../icons/icons');
var grid_1 = require('../grid/grid');
var index_1 = require('../../shared/index');
var panels_wells_1 = require('../panels-wells/panels-wells');
let App = class {
};
App = __decorate([
    core_1.Component({
        selector: 'app',
        viewProviders: [index_1.NameList],
        template: '<router-outlet></router-outlet>',
        styleUrls: ['app/components/app/app.css'],
        encapsulation: core_1.ViewEncapsulation.None,
        directives: [router_1.ROUTER_DIRECTIVES]
    }),
    router_1.RouteConfig([
        { path: '/', component: home_1.HomePage, name: 'Dashboard.home' },
        { path: '/home', component: home_1.HomePage, name: 'Dashboard.home' },
        { path: '/form', component: form_1.FormPage, name: 'Dashboard.form' },
        { path: '/blank', component: home_1.HomePage, name: 'Dashboard.blank' },
        { path: '/login', component: auth_1.AuthPage, name: 'Auth' },
        { path: '/chart', component: chart_1.ChartPage, name: 'Dashboard.chart' },
        { path: '/table', component: table_1.TablePage, name: 'Dashboard.table' },
        { path: '/panels-wells', component: panels_wells_1.PanelsWellsPage, name: 'Dashboard.panels-wells' },
        { path: '/buttons', component: buttons_1.ButtonsPage, name: 'Dashboard.buttons' },
        { path: '/notifications', component: notifications_1.NotificationsPage, name: 'Dashboard.notifications' },
        { path: '/typography', component: typography_1.TypographyPage, name: 'Dashboard.typography' },
        { path: '/icons', component: icons_1.IconsPage, name: 'Dashboard.icons' },
        { path: '/grid', component: grid_1.GridPage, name: 'Dashboard.grid' }
    ]), 
    __metadata('design:paramtypes', [])
], App);
exports.App = App;
//# sourceMappingURL=app.js.map