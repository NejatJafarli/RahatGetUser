import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chatrg',
  templateUrl: './chatrg.page.html',
  styleUrls: ['./chatrg.page.scss'],
})
export class ChatrgPage implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }
  close(){
    this.router.navigateByUrl('/home/5');
  }
}
