import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { routing, appRoutingProviders } from './app.routing';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { RouterModule, ExtraOptions} from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { CreateComponent } from './components/admin/create/create.component';
import { ErrorComponent } from './components/error/error.component';
import { EditComponent } from './components/admin/edit/edit.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ListComponent } from './components/admin/list/list.component';

const routerOptions: ExtraOptions = {
  anchorScrolling: "enabled",
  scrollPositionRestoration: 'enabled'
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CreateComponent,
    ErrorComponent,
    EditComponent,
    ProjectsComponent,
    ListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    FormsModule,
    routing,
    RouterModule.forRoot(appRoutingProviders, routerOptions)
  ],
  providers: [
    appRoutingProviders,
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }


