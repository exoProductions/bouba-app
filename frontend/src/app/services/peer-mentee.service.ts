import { Injectable } from '@angular/core';
import { Mentee } from '../models/mentee';
import { Peer } from '../models/peer';

@Injectable({
  providedIn: 'root'
})
export class PeerMenteeService {
  peerList:Peer[]=[];
  menteeList:Mentee[]=[];

  constructor() { }

  
}
