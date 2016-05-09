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
var common_1 = require('angular2/common');
var header_1 = require('../header/header');
var datasource_ts_1 = require('../../shared/services/datasource.ts');
let TimelineCmp = class {
};
TimelineCmp = __decorate([
    core_1.Component({
        selector: 'timeline',
        templateUrl: 'app/components/home/timeline.html',
        styleUrls: ['app/components/home/timeline.css'],
        directives: [common_1.CORE_DIRECTIVES],
        providers: [datasource_ts_1.DataSource]
    }), 
    __metadata('design:paramtypes', [])
], TimelineCmp);
let NotificationCmp = class {
};
NotificationCmp = __decorate([
    core_1.Component({
        selector: 'notifications',
        templateUrl: 'app/components/home/notifications.html',
        directives: [common_1.CORE_DIRECTIVES]
    }), 
    __metadata('design:paramtypes', [])
], NotificationCmp);
let ChatCmp = class {
};
ChatCmp = __decorate([
    core_1.Component({
        selector: 'chat',
        templateUrl: 'app/components/home/chat.html',
        directives: [common_1.CORE_DIRECTIVES]
    }), 
    __metadata('design:paramtypes', [])
], ChatCmp);
let StatsCmp = class {
};
StatsCmp = __decorate([
    core_1.Component({
        selector: 'stats',
        templateUrl: 'app/components/home/stats.html',
        properties: ['number', 'comments', 'colour', 'type'],
        directives: [common_1.CORE_DIRECTIVES]
    }), 
    __metadata('design:paramtypes', [])
], StatsCmp);
let HomePage = class {
};
HomePage = __decorate([
    core_1.Component({
        selector: 'dashboard',
        templateUrl: 'app/components/home/home.html',
        styleUrls: ['app/components/home/home.css'],
        directives: [header_1.WrapperCmp, StatsCmp, TimelineCmp, NotificationCmp, ChatCmp, common_1.CORE_DIRECTIVES]
    }), 
    __metadata('design:paramtypes', [])
], HomePage);
exports.HomePage = HomePage;
//# sourceMappingURL=home.js.map