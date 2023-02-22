import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.page.html',
  styleUrls: ['./loader.page.scss'],
})
export class LoaderPage implements OnInit {
  constructor(
    private router: Router,
    private apiService: ApiService,
    private local: StorageService
  ) {}

  async ngOnInit() {
    let token = await this.local.get('token');
    setTimeout(() => {
      if (token != null) this.router.navigate(['transition']);
      else this.router.navigate(['login']);
    }, 1000);
  }
}
