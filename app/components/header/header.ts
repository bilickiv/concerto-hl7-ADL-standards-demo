import {Component, View, ElementRef, CORE_DIRECTIVES} from 'angular2/angular2';
import {Collapse, Dropdown, DropdownMenu, DropdownToggle, Accordion, AccordionGroup, AccordionHeading, AccordionTransclude} from 'ng2-bootstrap/ng2-bootstrap';
import {ROUTER_DIRECTIVES} from 'angular2/router';
@Component({
  selector: 'header-notification',
  templateUrl: './components/header/header-notification.html',
  directives: [Dropdown, DropdownMenu, DropdownToggle, ROUTER_DIRECTIVES, CORE_DIRECTIVES],
  viewProviders: [Dropdown, DropdownMenu, DropdownToggle, ElementRef]
})
export class HeaderNotification {
  toggled(open:boolean):void {
    console.log('Dropdown is now: ', open);
  }
}

@Component({
  selector: 'sidebar-search',
  templateUrl: './components/header/sidebar-search.html',
  directives: []
})
export class SidebarSearch {

}

@Component({
  selector: 'sb-accordion-group, [sb-accordion-group]',
  properties: ['templateUrl', 'heading', 'isOpen', 'isDisabled', 'panelClass'],
  host: {
    '[class.panel-open]': 'isOpen'
  }
})
@View({
  template: `
  <div class="panel" [ng-class]="panelClass">
    <div class="panel-heading" (click)="toggleOpen($event)">
      <h4 class="panel-title">
        <a href tabindex="0" class="accordion-toggle">
          <span [ng-class]="{'text-muted': isDisabled}"
            [accordion-transclude]="headingTemplate">{{heading}}</span>
        </a>
      </h4>
    </div>
    <div class="panel-collapse collapse" [collapse]="!isOpen">
      <div class="panel-body">
        <ng-content></ng-content>
      </div>
    </div>
  </div>
  `,
  directives: [Collapse, AccordionTransclude, CORE_DIRECTIVES]

})
export class SbAccordionGroup extends AccordionGroup {

}

@Component({
  selector: 'sidebar',
  templateUrl: './components/header/sidebar.html',
  directives: [ROUTER_DIRECTIVES, SidebarSearch, Accordion, SbAccordionGroup, AccordionHeading]
})
export class Sidebar {
}

@Component({
  selector: 'header',
  templateUrl: './components/header/header.html',
  directives: [Sidebar, HeaderNotification]
})
export class Header {

}

@Component({
  selector: 'wrapper',
  template: `<div id="wrapper">
      <header></header>
      <div id="page-wrapper" style="min-height: 561px;">
        <ng-content></ng-content>
      </div>
    </div>`,
  directives: [Header, CORE_DIRECTIVES]
})
export class WrapperCmp {
}
