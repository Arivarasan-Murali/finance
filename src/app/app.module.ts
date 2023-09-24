import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AuthenticationComponent } from "./authentication/authentication.component";
import { HeaderComponent } from "./header/header.component";
import { ManageDataComponent } from "./manage-data/manage-data.component";
import { PageNotFoundComponent } from "./page-not-found.component";
import { HomeComponent } from "./home/home.component";
import { ResponseComponent } from "./response/response.component";

@NgModule({
  declarations: [
    AppComponent,
    AuthenticationComponent,
    HeaderComponent,
    ManageDataComponent,
    PageNotFoundComponent,
    HomeComponent,
    ResponseComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
