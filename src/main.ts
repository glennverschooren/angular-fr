///<reference path="../node_modules/angular2/typings/browser.d.ts"/>
/*
 * Providers provided by Angular
 */
import * as ngCore from 'angular2/core';
import * as browser from 'angular2/platform/browser';

import {FrForm} from './app/app';

/**
 * Bootstrap our formRenderer with our top level component `FrForm` and 
 * inject our Services and Providers into Angular's dependency injections
 */
export function main() {
    return browser.bootstrap(FrForm).catch(err => console.log(err));
}
