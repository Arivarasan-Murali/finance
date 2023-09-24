import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthenticationComponent } from "./authentication/authentication.component";
import { HomeComponent } from "./home/home.component";
import { ManageDataComponent } from "./manage-data/manage-data.component";
import { PageNotFoundComponent } from "./page-not-found.component";

const routes: Routes = [
  { path: "auth", component: AuthenticationComponent },
  { path: "home", component: HomeComponent },
  // {path: 'dashboard', component: DashboardComponent},
  { path: "manage-data", component: ManageDataComponent },
  // {path: 'settings', component: SettingsComponent},
  { path: "page-not-found", component: PageNotFoundComponent },
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "**", redirectTo: "page-not-found" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
