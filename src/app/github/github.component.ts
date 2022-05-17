import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-github',
  templateUrl: './github.component.html',
  styleUrls: ['./github.component.css'],
})
export class GithubComponent implements OnInit {
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {}

  close() {
    this.router.navigate([{ outlets: { info: null } }], {
      relativeTo: this.activatedRoute.parent,
    });
  }
}
