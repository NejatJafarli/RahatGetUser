import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-evodepartures',
  templateUrl: './evodepartures.page.html',
  styleUrls: ['./evodepartures.page.scss'],
})
export class EvodeparturesPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  backevohome() {
    this.router.navigate(['/evohome']);
  }

}
