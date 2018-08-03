import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PlayerPageComponent } from './player-page/player-page.component';
import { SetCardComponent } from './set-card/set-card.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatFormFieldModule, MatInputModule, MatIconModule} from '@angular/material';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatProgressSpinnerModule} from '@angular/material';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import { AboutPageComponent } from './about-page/about-page.component';
import { JsonpModule } from '@angular/http';


const routes: Routes = [
  { path: '', redirectTo: 'player/1000', pathMatch: 'full'},
  { path: 'player/:id', component: PlayerPageComponent},
  { path: 'player', component: PlayerPageComponent},
  { path: 'about', component: AboutPageComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    PlayerPageComponent,
    SetCardComponent,
    AboutPageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'}),
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatCardModule,
    MatListModule,
    NoopAnimationsModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    JsonpModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
