import {
  Component,
  Input,
  Output,
  OnInit,
  ViewChild,
  EventEmitter,
} from '@angular/core';
import { KvaasService } from '../../../kvaas.service';
import { Postit } from '../postit-list.component';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  @Input() postit: Array<Postit>;
  @Input() service: KvaasService;
  @Output() submit = new EventEmitter();
  // riferimenti ad elementi del DOM identificati da una template reference variable
  @ViewChild('titolo') titolo;
  @ViewChild('content') contenuto;
  @ViewChild('important') checkbox;

  check: boolean = false;
  title: string = '';
  text: string = 'Scrivi il contenuto';

  constructor() {}

  ngOnInit() {}

  async createPostit() {
    if (!this.title) {
      alert('Inserisci un titolo');
      return;
    }

    // impedisco che vengano creati più postit con lo stesso titolo
    if (this.postit.some((el) => el.titolo === this.title)) {
      alert('Esiste già un postit con questo titolo!');
      return;
    }

    // ripulisco il form
    this.titolo.nativeElement.value = '';
    this.contenuto.nativeElement.value = 'Scrivi il contenuto';
    this.checkbox.nativeElement.checked = false;

    this.submit.emit();

    let newP = new Postit();
    newP.titolo = this.title;
    newP.contenuto = this.text;
    newP.id = Date.now();
    if (this.check) newP.importante = true;
    this.postit.push(newP);
    try {
      this.service.putData(this.postit).subscribe(
        (data) => {
          return;
        },
        (error) => {
          alert('Operazione fallita, riprova più tardi');
          console.error(error.message);
        }
      );
    } catch (error) {
      alert('Operazione fallita, riprova più tardi');
      this.postit.pop();
    }
  }

  clean() {
    if (this.contenuto.nativeElement.value === 'Scrivi il contenuto')
      this.contenuto.nativeElement.value = '';
  }
}
