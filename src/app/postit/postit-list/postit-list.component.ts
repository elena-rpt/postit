import { Component, OnInit } from '@angular/core';
import { KvaasService } from '../../kvaas.service';
import { Router } from '@angular/router';

export class Postit {
  titolo: string;
  contenuto: string;
  id: number = 1;
  importante: boolean = false;
}

@Component({
  selector: 'app-postit-list',
  templateUrl: './postit-list.component.html',
  styleUrls: ['./postit-list.component.css'],
})
export class PostitListComponent implements OnInit {
  postit: Array<Postit> = [];
  showedpostit: Array<Postit> = [];
  showAdd: boolean = false;
  // variabile che indica se devo mostrare tutti i postit o solo quelli importanti
  showAll: boolean = true;
  // testo del bottone per passare dalla visualizzazione normale a quella dei soli postit importanti e viceversa
  impButton: string = 'Mostra solo importanti';
  addButton: string = 'Aggiungi postit';

  constructor(public service: KvaasService, private router: Router) {}

  ngOnInit() {
    if (!this.service.returnKey()) {
      this.router.navigate(['']);
    } else {
      this.showPostit();
    }
  }

  showImportant() {
    this.showAll = !this.showAll;
    this.impButton = this.showAll ? 'Mostra solo importanti' : 'Mostra tutti';
    this.showedpostit = this.showAll
      ? this.postit
      : this.postit.filter((i) => i.importante);
  }

  toggleAdd() {
    this.showAdd = !this.showAdd;
    this.addButton = !this.showAdd ? 'Aggiungi postit' : 'Chiudi';
  }

  async deletePostit(title: string) {
    // controllo se l'elemento è presente
    if (this.postit.some((el) => el.titolo === title)) {
      // elimino il postit dal titolo indicato dall'array
      let copy = this.postit;
      this.postit = this.postit.filter((el) => el.titolo !== title);
      try {
        this.service.putData(this.postit).subscribe(
          (data) => {
            console.log(data);
          },
          (error) => {
            console.error(error.message);
          }
        );
      } catch (error) {
        alert('Operazione fallita,riprova più tardi');
        this.postit = copy;
        return;
      } finally {
        this.showedpostit = this.postit;
      }
    }
  }

  async showPostit() {
    try {
      this.service.getData().subscribe(
        (data) => {
          if (data === null) alert('Chiave inserita non valida'); // la chiave inserita non era valida, non posso fare il parsing
          if (data === '{}') data = '[]'; // non c'è nessun postit registrato
          this.postit = JSON.parse(data);
          this.showedpostit = this.postit;
        },
        (err) => {
          console.error(err.message);
          this.router.navigate(['']);
          setTimeout(() => alert('Chiave inserita non valida'), 500);
        }
      );
    } catch (error) {
      alert("E' al momento impossibile recuperare i dati");
    }
  }
}
