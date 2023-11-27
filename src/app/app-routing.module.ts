import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MatchersComponent } from './matchers/matchers.component';
import { DataComponent } from './data/data.component';
import { AsynchronousComponent } from './asynchronous/asynchronous.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'matchers', component: MatchersComponent },
  { path: 'asynchronous', component: AsynchronousComponent },
  { path: 'data/:id', component: DataComponent },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}
