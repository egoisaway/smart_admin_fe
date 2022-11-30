import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

import { HttpClientModule } from '@angular/common/http';
import { WalletModule } from './wallet/wallet.module';
import { FormsModule } from '@angular/forms';
import { ProposalsModule } from './proposals/proposals.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    WalletModule,
    ProposalsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
