import { Input, ElementRef, Component, View, Output, EventEmitter} from 'angular2/core';
import { NgForm, FORM_BINDINGS, FORM_DIRECTIVES, FormBuilder, ControlGroup } from 'angular2/common';

@Component({
    selector: 'fr-form',
    viewBindings: [FORM_BINDINGS],
    directives: [FORM_DIRECTIVES],
    template: 
        `<div>
            <h1 class="fr-form__title">Form title</h1>
            <div class="fr-form__body">Body text</div>
            <form [ngFormModel]=frModel 
                  (ngSubmit)="submit(frModel)">
                
                <div class="form-group">
                    <label for="firstName">First name:</label>
                    <input type="text"
                           id="firstName" 
                           placeholder="firstname"
                           ngControl="firstName">
                </div>
                
                <div class="form-group">
                    <label for="lastName">Last name:</label>
                    <input type="text"
                           id="lastName" 
                           placeholder="lastname"
                           ngControl="lastName">
                </div>
                
                <div ngControlGroup="contact">
                    <div class="form-group">
                        <label for="telephoneNumber">Telephone number:</label>
                        <input type="text"
                            id="telephoneNumber" 
                            placeholder="0484/99/99/99"
                            ngControl="telephoneNumber">
                    </div>
                </div>
                
                <button type="submit" [disabled]="!frModel.valid">Submit</button>
            </form>
        </div>`
})
export class FrFormComponent {
    // inputs
    @Input() schema: Object;
    @Input() active: Boolean;
    @Input() activeStep: String;
    @Input() debug: Boolean;
    
    // outputs
    @Output() onSubmit: EventEmitter<any> = new EventEmitter();
    @Output() onNavigate: EventEmitter<any> = new EventEmitter();
    
    // model
    frModel: ControlGroup;
        
    // TODO: ////////////////////////////////
    //      - Validate schema
    //      - parse schema
    //      - create model?
    //      - parse prerequisites
    constructor(fb: FormBuilder) {
        // TODO : create form model from schema
        this.frModel = fb.group({
            firstName: String [""],
            lastName: String [""],
            contact: fb.group({
                telephoneNumber: Number [0]
            })
        });
    }
   
    submit(model) {
        this.onSubmit.emit(model);
    }
    
    navigate() {
        this.onNavigate.emit('navigate form');
    }
}