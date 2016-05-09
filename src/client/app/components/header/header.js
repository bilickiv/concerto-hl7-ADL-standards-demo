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
var ng2_bootstrap_1 = require('ng2-bootstrap/ng2-bootstrap');
var router_1 = require('angular2/router');
let HeaderNotification = class {
    toggled(open) {
        console.log('Dropdown is now: ', open);
    }
};
HeaderNotification = __decorate([
    core_1.Component({
        selector: 'header-notification',
        templateUrl: 'app/components/header/header-notification.html',
        directives: [ng2_bootstrap_1.Dropdown, ng2_bootstrap_1.DropdownMenu, ng2_bootstrap_1.DropdownToggle, router_1.ROUTER_DIRECTIVES, common_1.CORE_DIRECTIVES],
        viewProviders: [ng2_bootstrap_1.Dropdown, ng2_bootstrap_1.DropdownMenu, ng2_bootstrap_1.DropdownToggle, core_1.ElementRef]
    }), 
    __metadata('design:paramtypes', [])
], HeaderNotification);
exports.HeaderNotification = HeaderNotification;
let SidebarSearch = class {
};
SidebarSearch = __decorate([
    core_1.Component({
        selector: 'sidebar-search',
        templateUrl: 'app/components/header/sidebar-search.html',
        directives: []
    }), 
    __metadata('design:paramtypes', [])
], SidebarSearch);
exports.SidebarSearch = SidebarSearch;
let Sidebar = class {
};
Sidebar = __decorate([
    core_1.Component({
        selector: 'sidebar',
        templateUrl: 'app/components/header/sidebar.html',
        directives: [router_1.ROUTER_DIRECTIVES, SidebarSearch, ng2_bootstrap_1.ACCORDION_DIRECTIVES]
    }), 
    __metadata('design:paramtypes', [])
], Sidebar);
exports.Sidebar = Sidebar;
let Header = class {
};
Header = __decorate([
    core_1.Component({
        selector: 'header',
        templateUrl: 'app/components/header/header.html',
        directives: [Sidebar, HeaderNotification]
    }), 
    __metadata('design:paramtypes', [])
], Header);
exports.Header = Header;
let WrapperCmp = class {
};
WrapperCmp = __decorate([
    core_1.Component({
        selector: 'wrapper',
        template: `<div id="wrapper">
      <header></header>
      <div id="page-wrapper" style="min-height: 561px;">
        <ng-content></ng-content>
      </div>
    </div>`,
        directives: [Header, common_1.CORE_DIRECTIVES]
    }), 
    __metadata('design:paramtypes', [])
], WrapperCmp);
exports.WrapperCmp = WrapperCmp;
//# sourceMappingURL=header.js.map