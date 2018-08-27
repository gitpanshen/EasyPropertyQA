import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ModalModule } from 'ngx-bootstrap/modal';

import { ApiClientModule } from './api/client/api-client.module';
import { AppComponent } from './app.component';
import { PropertyEditorModalComponent } from './edit-property.modal';
import { UIContext } from './ui-context';

@NgModule({
  declarations: [
    AppComponent,
    PropertyEditorModalComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    ApiClientModule.forRoot(),
  ],
  entryComponents: [
    PropertyEditorModalComponent,
  ],
  providers: [
    UIContext
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
