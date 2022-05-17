import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class KvaasService {
  baseURL: string =
    'https://eu-central-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/kvaas-giwjg/service/kvaas/incoming_webhook';
  chiave: string = '7a3f3cd4';

  constructor(private http: HttpClient) {}

  // GET CON HTTPCLIENT
  // funzione che permette di recuperare la lista di postit associata a una chiave
  public getData(): Observable<any> {
    return this.http.get(this.baseURL + '/get?key=' + this.chiave);
  }

  // POST CON HTTPCLIENT
  // funzione che permette di aggiornare la stringa associata a una chiave
  public putData(list: object): Observable<any> {
    var msg = JSON.stringify(list);
    return this.http.post(
      this.baseURL + '/post?key=' + this.chiave + '&msg=' + msg,
      {}
    );
  }

  // POST CON FETCH NORMALE
  // funzione che permette di ottenere una nuova chiave
  public getKey(): Promise<string> {
    return fetch(this.baseURL + '/new', { method: 'POST' })
      .then((response) => response.json().then((key) => key))
      .catch((error) => {
        throw error;
      });
  }

  public setKey(key: string) {
    this.chiave = key;
  }

  public returnKey() {
    return this.chiave;
  }
}
