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
  
  showHeader: boolean = true;
  
  constructor(){
    
  }

  ngOnInit(): void {
   
    
  }

}