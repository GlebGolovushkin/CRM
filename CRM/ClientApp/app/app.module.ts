import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { ReactiveFormsModule, FormsModule  } from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProcessList } from './processes/processList.component';
import { DataService } from './shared/dataService';
import { GantChart } from './ganttChart/ganttChart';
import { MatDialogModule } from 'node_modules/@angular/material/dialog';
import { MatToolbarModule } from 'node_modules/@angular/material/toolbar';
import { MatGridListModule } from 'node_modules/@angular/material/grid-list';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from 'node_modules/@angular/material/input';
import { MatDatepickerModule } from 'node_modules/@angular/material/datepicker';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { TaskCard } from './tasks/task.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ProcessCard } from './tasks/processCard/process';
import { ProductCard } from './tasks/productCard/product';
import { TypeCard } from './tasks/typeCard/type';
import { ToastrModule } from 'ngx-toastr';
import { UserComponent } from './user/user.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { LoginComponent } from './user/login/login.component';
import { UserService } from './shared/user.service';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { UserListComponent } from './userList/userList.component';


@NgModule({
  declarations: [
    AppComponent,
        ProcessList,
        GantChart,
        TaskCard,
        ProcessCard,
        ProductCard,
        TypeCard,
        UserComponent,
        RegistrationComponent,
        LoginComponent,
        ForbiddenComponent,
        UserListComponent
  ],
  imports: [
    BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      MatDialogModule,
      BrowserAnimationsModule,
      MatToolbarModule,
      ReactiveFormsModule,
      MatGridListModule,
      MatInputModule,
      MatSelectModule,
      MatDatepickerModule,
      MatNativeDateModule,
      MatSlideToggleModule,
      MatButtonModule,
      MatFormFieldModule,
      FormsModule,
      ToastrModule.forRoot(),
    ],
    entryComponents: [
        TaskCard,
        ProcessCard,
        ProductCard,
        TypeCard
    ],
    providers: [
        DataService,
        UserService,
        MatDatepickerModule,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
