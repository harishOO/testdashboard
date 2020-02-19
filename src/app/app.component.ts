import { Component, ViewChild, HostListener, NgZone } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { SidenavService } from './shared/sidenav.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('drawer', { static: true }) public sidenav: MatDrawer;
  showHeader: boolean = true;
  title = 'testportal';
  sidenavElements: any;
  constructor(public sidenavService: SidenavService){
    this.sidenavService.showSideNav.subscribe(val => {
      this.showHeader = val;
      if (val) {
        this.sidenav.open();
      }
    });
    this.sidenavElements = [
      { id: 1, name: 'Department', routerLink: "/department" },
      { id: 2, name: 'Employee', routerLink: "/customers" },
    ];
  }

  ngOnInit(): void {
    debugger;
    this.sidenav.open();
    this.sidenavService.emitShowSideNav(true);

    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
  }

}