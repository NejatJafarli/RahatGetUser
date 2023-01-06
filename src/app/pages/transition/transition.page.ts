import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MyService } from 'src/app/envoriment/my-service';

@Component({
  selector: 'app-transition',
  templateUrl: './transition.page.html',
  styleUrls: ['./transition.page.scss'],
})
export class TransitionPage implements OnInit {
  temp;
  constructor(private router: Router, private service: MyService) {}

  ngOnInit() {}

  evo() {
    this.service.setValueSelectedApp('evo');
    this.router.navigate(['/evohome']);
  }
  ayig() {
    this.service.setValueSelectedApp('ayig');
    //call app.component.ts  updateSelected() function
    // this.router.navigate(['/home'],{state:{reload:true}});
    this.router.navigate(['/home']);
  }
}
