import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from './components/home/home.component';
import { CreateComponent } from './components/admin/create/create.component';
import { ErrorComponent } from './components/error/error.component';
import { EditComponent } from "./components/admin/edit/edit.component";
import { ListComponent } from "./components/admin/list/list.component";
//import { homedir } from "os";


const appRoutes: Routes = [
    {path: '', component:HomeComponent},
    {path: 'create', component:CreateComponent},
    {path: 'projects', component:CreateComponent},
    {path: 'edit/:id', component: EditComponent},
    {path: 'admin', component: ListComponent},
    {path: '**', component:ErrorComponent}
    
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);