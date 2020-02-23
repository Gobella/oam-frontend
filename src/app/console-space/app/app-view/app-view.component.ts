import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    ValidationErrors,
    Validators
} from '@angular/forms'
import { NzMessageService } from 'ng-zorro-antd';
import { ApiService } from '../../../services/api.service'
@Component({
    selector: 'app-app-view',
    templateUrl: './app-view.component.html',
    styleUrls: ['./app-view.component.css']
})
export class AppViewComponent implements OnInit {
    isVisible: boolean = false;
    appMeta: any = {
        name: "",
        resourceVersion: "",
        namespace: "",
        generation: "",
        appPublishedMode: "",
        port: "",
    }
    validateForm: FormGroup;
    applist = [];

    constructor(
        private fb: FormBuilder,
        private api: ApiService,
        private msg: NzMessageService
    ) {
        this.validateForm = this.fb.group({
            name: ['', [Validators.required]],
            port: ['', [Validators.required]],
            resourceVersion: ['', [Validators.required]],
            namespace: ['', [Validators.required]],
            generation: ['', [Validators.required]],
            appPublishedMode: ['', [Validators.required]],
            creationTimestamp: ['', [Validators.required]],
            UpdatedTimestamp: ['', [Validators.required]],
        });
    }

    ngOnInit() {
        this.initBaseData()
    }

    initBaseData = () => {
        this.api.GetApp().subscribe((resp) => {
            if (resp.code != 0) {
                this.msg.error(resp.err_message)
            } else {
                this.applist = resp.data;
            }
        })
    }

    showAPP = (item) => {
        this.validateForm.setValue(item);
        this.isVisible = true;
    }

    showCreateModule = () => {
        this.isVisible = true;
        this.appMeta = {
            name: "",
            resourceVersion: "",
            namespace: "",
            generation: "",
            appPublishedMode: "",
            port: "",
        }
    }

    handleCancel = () => {
        this.isVisible = false;
    }

    handleSubmit = () => {
        let values = this.validateForm.value
        delete values['creationTimestamp']
        delete values['UpdatedTimestamp']
        this.api.PostApp(values).subscribe((resp) => {
            if (resp.code != 0) {
                this.msg.error(resp.err_message)
            } else {
                this.msg.info("创建成功")
                this.isVisible = false;
                this.initBaseData()
            }
        })
    }

}
