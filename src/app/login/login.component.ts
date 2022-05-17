import { Component } from '@angular/core';
import { KvaasService } from '../kvaas.service';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  showKey: boolean = false;
  chiave: string = '';

  constructor(public service: KvaasService, private router: Router) {}

  async getNewKey() {
    try {
      this.chiave = await this.service.getKey();
    } catch (error) {
      alert('Problema di connessione con il server');
      return;
    }
    this.showKey = true;
  }

  updateKey(key: string) {
    if (!key) {
      alert('Inserisci una chiave');
      return;
    }

    this.service.setKey(key);

    this.router.navigate(['/home']);
  }

  ngOnInit() {}
}
