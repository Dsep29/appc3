"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const protractor_1 = require("protractor");
class AppPage {
    navigateTo() {
        return protractor_1.browser.get('/');
    }
    getPageTitle() {
        return protractor_1.element(protractor_1.by.css('ion-title')).getText();
    }
}
exports.AppPage = AppPage;
