import { Component, OnInit } from '@angular/core';
import { SidenavStateService } from '../../core/service/sidenav-state.service'

@Component({
  selector: 'app-right-trigger',
  templateUrl: './right-trigger.component.html',
  styleUrls: ['./right-trigger.component.scss']
})
export class RightTriggerComponent implements OnInit {

  constructor(private SidebarStateService: SidenavStateService) { }

  ngOnInit() {
  }

  RightSidenavToggle(){
    this.SidebarStateService.RightSidenavToggle();
  }

}
