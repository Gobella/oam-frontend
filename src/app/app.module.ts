import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { ResourceComponent } from './console-space/resource/resource.component';
import { ImageViewComponent } from './console-space/images/image-view/image-view.component';
import { TraitsViewComponent } from './console-space/traits/traits-view/traits-view.component';
import { AppViewComponent } from './console-space/app/app-view/app-view.component';
import { AppChangeComponent } from './console-space/app/app-change/app-change.component';
import { AppSheetsComponent } from './console-space/app/app-sheets/app-sheets.component'

registerLocaleData(en);

@NgModule({
    declarations: [
        AppComponent,
        ResourceComponent,
        ImageViewComponent,
        TraitsViewComponent,
        AppViewComponent,
        AppChangeComponent,
        AppSheetsComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NgZorroAntdModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        BrowserAnimationsModule
    ],
    providers: [{ provide: NZ_I18N, useValue: en_US }],
    bootstrap: [AppComponent]
})
export class AppModule { }
