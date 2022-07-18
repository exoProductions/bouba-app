import { Component, OnInit } from '@angular/core';
import { faCross, faTrashAlt, faXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-chat-menu',
  templateUrl: './chat-menu.component.html',
  styleUrls: ['./chat-menu.component.scss'],
})
export class ChatMenuComponent implements OnInit {

  deleteIcon=faTrashAlt;
  closeIcon=faXmark;
  constructor() { }

  ngOnInit() {}

}
