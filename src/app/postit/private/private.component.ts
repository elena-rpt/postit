import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-private',
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.css'],
})
export class PrivateComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router) {}

  canDeactivate() {
    return of(window.confirm('Sicuro di voler lasciare questa pagina?'));
  }

  goBack() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  ngOnInit() {}
}
