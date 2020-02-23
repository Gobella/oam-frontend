import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service'
import {
    FormBuilder,
    FormControl,
    FormGroup,
    ValidationErrors,
    Validators
} from '@angular/forms'
import { NzMessageService } from 'ng-zorro-antd';
import { NzNotificationService } from 'ng-zorro-antd';

@Component({
    selector: 'app-app-change',
    templateUrl: './app-change.component.html',
    styleUrls: ['./app-change.component.css']
})
export class AppChangeComponent implements OnInit {

    initStatus = "init";
    runningStatus = "run"
    doneStatus = "done";
    currentStep = "base-config";
    isCreateTraitsModalShow = false;

    steps = [{
        status: "init",
        name: "应用基础配置",
        key: "base-config"
    }, {
        status: "init",
        name: "应用能力配置",
        key: "op-config"
    }, {
        status: "init",
        name: "应用部署",
        key: "deploy"
    }]

    ChangeTypes = [{
        name: "首次部署",
        key: "freshDeploy"
    }, {
        name: "更新部署",
        key: "updateDeploy"
    }, {
        name: "扩缩容",
        key: "scaleDeploy"
    }, {
        name: "删除应用",
        key: "deleteDeploy"
    }]

    traitsList = [];

    traitsEnum = [{
        name: "manual-scaler",
        properties: {
            replicaCount: 3,
        }
    }, {
        name: "auto-scaler",
        properties: {
            maximum: 3,
            minimim: 2,
            cpu: 23,
            memory: 33
        }
    }, {
        name: "ingress",
        properties: {
            hostname: 3,
            serverPort: 2,
            path: 23
        }
    }, {
        name: "volume-mounter",
        properties: {
            volumename: 3,
            storageClass: 33
        }
    }]

    editTrait = {};
    editTraitKeys = [];

    images = ["technosophos/alpine-forever:latest", "technosophos/alpine-forever:v1.2.3"]

    validateForm: FormGroup;
    applist = [];

    constructor(private fb: FormBuilder,
        private api: ApiService,
        private notification: NzNotificationService,
        private msg: NzMessageService) {
        this.validateForm = this.fb.group({
            app_name: ['', [Validators.required]],
            change_type: ['', [Validators.required]],
            image: ['', [Validators.required]],
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

    showCreateTraits = () => {
        this.isCreateTraitsModalShow = true;
    }

    initTraitEdit = ($event) => {
        this.editTrait = $event;
        this.editTraitKeys = Object.keys($event['properties'])
    }

    deleteTrait = (name) => {
        this.traitsList = this.traitsList.filter((item) => {
            console.log(name + item.name)
            if (name == item.name) {
                return false;
            }
            return true;
        })
    }

    handleSubmit = () => {
        this.deleteTrait(this.editTrait['name'])
        this.traitsList.push(JSON.parse(JSON.stringify(this.editTrait)));
        this.isCreateTraitsModalShow = false;
    }

    handleCancel = () => {
        this.isCreateTraitsModalShow = false;
    }

    handleDeploy = () => {
        let value = this.validateForm.value;
        value['Traits'] = this.traitsList;
        this.api.PostChangeSheet(value).subscribe((resp) => {
            if (resp.code != 0) {
                this.msg.error(resp.err_message)
            } else {
                this.msg.success("创建成功")
                this.notification.blank(
                    'applicationConfiguration.yaml',
                    resp.data
                );
            }
        })
    }

    next = (step) => {
        this.currentStep = step;
        if (step == "op-config") {
            this.steps = this.steps.map((item) => {
                if (item['key'] == 'base-config') {
                    item['status'] = this.doneStatus;
                }
                return item
            })
        }
        if (step == "deploy") {
            this.steps = this.steps.map((item) => {
                if (item['key'] == 'op-config') {
                    item['status'] = this.doneStatus;
                }
                return item
            })
        }


    }

}
