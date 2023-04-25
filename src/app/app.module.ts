import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { ServicesComponent } from './components/services/services.component';
import { BannerComponent } from './components/banner/banner.component';
import { BannerExtraComponent } from './components/banner-extra/banner-extra.component';
import { AssistancesComponent } from './components/assistances/assistances.component';
import { NewsComponent } from './components/news/news.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { SignupComponent } from './components/signup/signup.component';
import { SignupAssistComponent } from './components/signup-assist/signup-assist.component';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { JwtInterceptorService } from './services/jwt-interceptor.service';
import { AssistantComponent } from './components/assistant/assistant.component';
import { AssitantInfoComponent } from './components/assitant-info/assitant-info.component';
import { SignupAdminComponent } from './components/signup-admin/signup-admin.component';
import { DashboardAdminComponent } from './components/dashboard-admin/dashboard-admin.component';
import { AssistantTabComponent } from './components/assistant-tab/assistant-tab.component';
import { UserTabComponent } from './components/user-tab/user-tab.component';
import { ProfileComponent } from './components/profile/profile.component';

// import { PdfViewerModule } from 'ng2-pdf-viewer';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ServicesComponent,
    BannerComponent,
    BannerExtraComponent,
    AssistancesComponent,
    NewsComponent,
    SearchBarComponent,
    SignupComponent,
    SignupAssistComponent,
    LoginComponent,
    AssistantComponent,
    AssitantInfoComponent,
    SignupAdminComponent,
    DashboardAdminComponent,
    AssistantTabComponent,
    UserTabComponent,
    ProfileComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    // PdfViewerModule
    FormsModule,

  ],
  
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
