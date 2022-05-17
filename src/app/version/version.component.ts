import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-version',
  templateUrl: './version.component.html',
  styleUrls: ['./version.component.css'],
})
export class VersionComponent implements OnInit {
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {}

  close() {
    this.router.navigate([{ outlets: { info: null } }], {
      relativeTo: this.activatedRoute.parent,
    });
  }
}
