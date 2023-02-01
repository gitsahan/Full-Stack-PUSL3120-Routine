import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; 
import { LogInComponent } from './log-in/log-in.component';
import { NewListComponent } from './new-list/new-list.component';
import { NewSdlComponent } from './new-sdl/new-sdl.component';
import { RegisterComponent } from './register/register.component';
import { SdlViewComponent } from './sdl-view/sdl-view.component';
import { UpdateListComponent } from './update-list/update-list.component';
import { UpdateSdlComponent } from './update-sdl/update-sdl.component';
import { WelcomeComponent } from './welcome/welcome.component';



const routes: Routes = [
  {path: '', redirectTo: '/welcome', pathMatch:"full"},
  {path: 'welcome', component: WelcomeComponent},
  {path: 'lists', component: SdlViewComponent},
  {path: 'new-list', component: NewListComponent},
  {path: 'log-in', component: LogInComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'update-list/:listId', component: UpdateListComponent},
  {path: 'lists/:listId', component: SdlViewComponent},
  {path: 'lists/:listId/new-sdl', component: NewSdlComponent},
  {path: 'lists/:listId/update-sdl/:scheduleId', component: UpdateSdlComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }