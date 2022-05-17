import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { KvaasService } from '../../kvaas.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent implements OnInit {
  id: string = '';
  title: string = '';
  text: string = '';
  imp: boolean = false;

  constructor(
    public service: KvaasService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');

    try {
      this.service.getData().subscribe(
        (data) => {
          let postits;
          if (data === '{}') {
            postits = [];
            alert('Postit non trovato');
            this.router.navigate(['home']);
          } else {
            postits = JSON.parse(data);

            let postit = postits.find((el) => el.id == this.id);

            if (!postit) {
              alert('Postit non trovato');
              this.router.navigate(['home']);
              return;
            }
            this.title = postit.titolo;
            this.text = postit.contenuto;
            this.imp = postit.importante;
          }
        },
        (err) => {
          console.error(err.message);
          this.router.navigate(['']);
          setTimeout(() => alert('Devi fare login'), 500);
        }
      );
    } catch (error) {
      alert("E' al momento impossibile recuperare i dati");
    }
  }
}
