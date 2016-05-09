var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var testing_1 = require('angular2/testing');
var router_1 = require('angular2/router');
var location_mock_1 = require('angular2/src/mock/location_mock');
var router_2 = require('angular2/src/router/router');
var core_1 = require('angular2/core');
var dom_adapter_1 = require('angular2/src/platform/dom/dom_adapter');
var form_1 = require('./form');
function main() {
    testing_1.beforeEachProviders(() => [
        router_1.RouteRegistry,
        core_1.provide(router_1.Location, { useClass: location_mock_1.SpyLocation }),
        core_1.provide(router_1.ROUTER_PRIMARY_COMPONENT, { useValue: form_1.FormPage }),
        core_1.provide(router_1.Router, { useClass: router_2.RootRouter })
    ]);
    testing_1.describe('form component', () => {
        testing_1.it('should work', testing_1.injectAsync([testing_1.TestComponentBuilder], (tcb) => {
            return tcb.createAsync(TestComponent)
                .then((rootTC) => {
                let formDOMEl = rootTC.debugElement.children[0].nativeElement;
                testing_1.expect(dom_adapter_1.DOM.querySelectorAll(formDOMEl, 'h1')[0].textContent).toEqual('Panels and Wells');
            });
        }));
    });
}
exports.main = main;
let TestComponent = class {
};
TestComponent = __decorate([
    core_1.Component({
        selector: 'test-cmp',
        directives: [form_1.FormPage],
        template: '<form></form>'
    }), 
    __metadata('design:paramtypes', [])
], TestComponent);
//# sourceMappingURL=form.spec.js.map