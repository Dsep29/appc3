"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const angular_1 = require("@ionic/angular");
const router_1 = require("@angular/router");
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
const forms_1 = require("@angular/forms");
const tab1_page_1 = require("./tab1.page");
let Tab1PageModule = class Tab1PageModule {
};
Tab1PageModule = __decorate([
    core_1.NgModule({
        imports: [
            angular_1.IonicModule,
            common_1.CommonModule,
            forms_1.FormsModule,
            router_1.RouterModule.forChild([{ path: '', component: tab1_page_1.Tab1Page }])
        ],
        declarations: [tab1_page_1.Tab1Page]
    })
], Tab1PageModule);
exports.Tab1PageModule = Tab1PageModule;
