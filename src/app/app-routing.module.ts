import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResourceComponent } from './console-space/resource/resource.component'
import { AppChangeComponent } from './console-space/app/app-change/app-change.component'
import { AppSheetsComponent } from './console-space/app/app-sheets/app-sheets.component'
import { AppViewComponent } from './console-space/app/app-view/app-view.component'
import { ImageViewComponent } from './console-space/images/image-view/image-view.component'
import { TraitsViewComponent } from './console-space/traits/traits-view/traits-view.component'

const routes: Routes = [
    {
        path: 'resource',
        children: [{
            path: 'view',
            pathMatch: 'full',
            component: ResourceComponent,
        }],
    },
    {
        path: 'app',
        children: [{
            path: 'change',
            pathMatch: 'full',
            component: AppChangeComponent,
        },{
            path: 'sheets',
            pathMatch: 'full',
            component: AppSheetsComponent,
        },{
            path: 'view',
            pathMatch: 'full',
            component: AppViewComponent,
        }],
    },{
        path: 'image',
        children: [{
            path: 'view',
            pathMatch: 'full',
            component: ImageViewComponent,
        },{
            path: 'publish',
            pathMatch: 'full',
            component: AppSheetsComponent,
        }],
    },{
        path: 'trait',
        children: [{
            path: 'view',
            pathMatch: 'full',
            component: TraitsViewComponent,
        },{
            path: 'add',
            pathMatch: 'full',
            component: AppSheetsComponent,
        }],
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
