import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { AffichageComponent } from "../app/Components/affichage/affichage.component";
import { MarsipularmiCService } from "./Servers/marsipularmi-c.service";
import { HttpModule } from "../../node_modules/@angular/http";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "../app/Components/login/login.component";
import { AuthGuard } from "./auth.guard";
import { AuthService } from "./Servers/auth.service";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AddnewComponent } from "../app/Components/addnew/addnew.component";
import { AmisComponent } from "../app/Components/amis/amis.component";
import { EditComponent } from "../app/Components/edit/edit.component";
import { AmisPipe } from "../app/pipe/amis.pipe";
import { HttpClientModule } from "@angular/common/http";

const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: "login", component: LoginComponent },
  {
    path: "users/:username",
    component: AffichageComponent,
    canActivate: [AuthGuard]
  },
  { path: "ajout/:id", component: AddnewComponent },

  {
    path: "Amis/:id",
    component: AmisComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "edit/:id/:username",
    component: EditComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  declarations: [
    AppComponent,
    AffichageComponent,
    LoginComponent,
    AddnewComponent,
    AmisComponent,
    EditComponent,
    AmisPipe
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [MarsipularmiCService, AuthGuard, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {}
