import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SdlViewComponent } from './sdl-view/sdl-view.component';
import { NewListComponent } from './new-list/new-list.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NewSdlComponent } from './new-sdl/new-sdl.component';
import { LogInComponent } from './log-in/log-in.component';
import { WebReqInterceptor } from './web-req.interceptor.service';
import { RegisterComponent } from './register/register.component';
import { UpdateListComponent } from './update-list/update-list.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { UpdateSdlComponent } from './update-sdl/update-sdl.component';




@NgModule({
  declarations: [
    AppComponent,
    SdlViewComponent,
    NewListComponent,
    NewSdlComponent,
    LogInComponent,
    RegisterComponent,
    UpdateListComponent,
    WelcomeComponent,
    UpdateSdlComponent,
],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: WebReqInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
