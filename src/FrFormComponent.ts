import { Input, ElementRef, Component, View, Output, EventEmitter, ContentChild } from 'angular2/core';

@Component({
    selector: 'fr-form',
    template: '<div> FormRenderer template </div>'
})
export class FrFormComponent {
    constructor() {
        console.log('test my app');
    }
}