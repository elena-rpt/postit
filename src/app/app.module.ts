import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { PostitModule } from './postit/postit.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { VersionComponent } from './version/version.component';
import { KvaasService } from './kvaas.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    PostitModule,
    AppRoutingModule,
  ],
  declarations: [AppComponent, LoginComponent, VersionComponent],
  bootstrap: [AppComponent],
  providers: [KvaasService],
})
export class AppModule {}
