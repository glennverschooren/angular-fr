///<reference path="../../index.d.ts"/>

import '../../node_modules/angular2/bundles/angular2-polyfills';
import {Component, View} from '../../node_modules/angular2/core';
import {bootstrap} from '../../node_modules/angular2/platform/browser';
import { FrFormComponent } from '../../index';

@Component({
    selector: 'app',
    directives: [FrFormComponent],
    template: `<div>
                   <fr-form></fr-form>
               </div>`
})
export class App {
    constructor() {
        console.log('Initialize app');
    }
}


bootstrap(App);
