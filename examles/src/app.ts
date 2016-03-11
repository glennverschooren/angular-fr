///<reference path="../../index.d.ts"/>

import 'angular2/bundles/angular2-polyfills';
import {Component, View} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';
import { FrFormComponent } from '../../index';

//console.log(FrFormComponent);

@Component({
    selector: 'app',
    template: `<div>
                   FormRenderer
                   <fr-form></fr-form>
               </div>`
})
export class App {
    constructor() {
        console.log('test my app');
    }
}


bootstrap(App);
