import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent {

    title = 'oam-frontend';
    isCollapsed = false;
    triggerTemplate: TemplateRef<void> | null = null;
    @ViewChild('trigger') customTrigger: TemplateRef<void>;

    /** custom trigger can be TemplateRef **/
    changeTrigger(): void {
        this.triggerTemplate = this.customTrigger;
    }

    constructor(
        private router: Router,
    ) { }
    
    redictTo(url: string) {
        this.router.navigateByUrl(url)
    }

}
