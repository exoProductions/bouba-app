import { Component, OnInit } from '@angular/core';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-worked-popup',
  templateUrl: './worked-popup.component.html',
  styleUrls: ['./worked-popup.component.scss'],
})
export class WorkedPopupComponent implements OnInit {

  workedIcon=faCheck;

  constructor() { }

  ngOnInit() {}

}
