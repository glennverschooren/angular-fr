#Angular2 Form Renderer

## Schema

###The form object

````
{
    "id": "UniqueFormId",
    "name": "FormName",
    "info": {
        "title": "Form title",
        "body": "<div>Form body text</div>"
    },
    "saveOnNavigate": false,
    "steps": [],
    "fieldgroups": [],
    "fields": []
}
````


###A step

````
{
    "id": "UniqueStepId",
    "type": "regular",
    "title": "Step title",
    "body": "<div>Step body tekst</div>",
    "state": {
        "editable": true,
        "editmode": true   
    },
    "fieldgroups": [],
    "prerequisites": {}
}
````

###A fieldgroup

````
{
    "id": "UniqueFieldGroupId",
    "title": "Fieldgroup title",
    "subtitle": "Fieldgroup subtitle",
    "state": {
        "editable": true,
        "editmode": true,
        "collapsible": true,
        "collapsed": true
    },
    "fields": [],
    "prerequisites": {}
}
````

###A field

````
{
    "name": "FieldName",
    "type": "text",
    "value": "field value",
    "layout": {
        "fieldLayout": "full",
        "fieldClass": "control"
    },
    "options": {
        "label": "Field label",
        "placeholder": "placeholder text",
        "valueOptions": [
            {
                "key": "1",
                "value": "valueText"
            },
            {
                "key": "2",
                "value": "valueText"
            }  
        ],
        "whatElseYouWant": "template options"
    },
    "state": {
        "editable": true,
        "editmode": false
    },
    "prerequisites": {},
    "validation": {
        "errorMessage": "Default error message",
        "validators": [
            {
                "name": "validatorName",
                "type": "required",
                "errorMessage": "This field is required"
            }
        ]
    }
}
````


###Field prerequisites

####When one or more fields are complete (valid)
When you pass a 'fieldsCompleted' object to the prerequisites of a field, step or section, it will test the given fields for completion. Only once the test matches this element will be made visible.

- logical: The logical property tells us if you want 'firstname' and 'lastname' completed, or just one of the two. The logical property can thus be 'AND' or 'OR'.
- fields: The fields property should be an array of fields to be tested.


````
{
  ...
  "prerequisites": {
    "fieldsCompleted": {
      "logical": "AND",
      "fields": ["firstname", "lastname"]
    }
  }
}

````

####When one or more fieldgroups are complete (valid)
When you pass a 'fieldgroupsCompleted' object to the prerequisites of a field, step or fieldgroup, it will test the given sections for completion. Only once the test matches this element will be made visible.

- logical: The logical property tells us if you want 'fieldgroup0' and 'fieldgroup2' completed, or just one of the two, The logical property can thus be 'AND' or 'OR'.
- sections: The fieldgroups property should be an array of fieldgroups to be tested.

````
{
  ...
  "prerequisites": {
    "fieldgroupsCompleted": {
      "logical": "AND",
      "fieldgroups": ["fieldgroup0", "fieldgroup2"]
    }
  }
}
````

####When one or more steps are complete (valid)
When you pass a 'stepsCompleted' object to the prerequisites of a field, step or section, it will test the given steps for completion. Only once the test matches this element will be made visible.

- logical: The logical property tells us if you want 'step0' and 'step2' completed or just one of the two. The logical property can thus be 'AND' or 'OR'.
- steps: The steps property should be an array of steps to be tested.

````
{
  ...
  "prerequisites": {
    "stepsCompleted": {
      "logical": "AND",
      "steps": ["step0", "step2"]
    }
  }
}
````

####When the value of a certain field matches a specific operation.
When you pass a 'fieldValues' object to the prerequisites of a field, step or section, that element will only be visible if all given tests match.
- logical: The logical property tells us if both given tests should succeed or if just one is enough
- operands: The operands property should be an array of tests ... these tests should contain 3 properties of their own:
    - name: The name of the field to test.
    - value: The value that should be tested for.
    - operator: The operator to use for the test, do we test equality, or if a value is lower than some other value, or do we check if a checkbox is checked, thus testing if a value is in an array of values.

    `the available operators are:`
        - `==` [alias `eq`]: test for equality, is the given value equal to the value the user filled in
        - `!=` [alias `neq`]: test for inequality, is the given value different from the value the user filled in
        - `<` [alias `lt`]: test for lower than, is the user's value lower than the given value
        - `>` [alias `gt`]: test for greater than, is the user's value greater than the given value
        - `<=` [alias `lte`]: test for lower than or equals, is the user's value lower than or equal to the given value
        - `>=` [alias `gte`]: test for greater than or equals, is the user's value greater than or equal to the given value
        - `in`: test if the field filled in by the user contains a value like the given value (to be used with checkbox lists)
        - `!in`: test if the field filled in by the user doesn't contain a value like the given value (to be used with checkbox lists)


This setup will test if the user's nationality IS NOT `belg` OR if his firstname IS `Jan`.
````
{
  ...
  "prerequisites": {
    "fieldValues": {
      "logical": "OR",
      "operands": [
        {
          "name": "nationality",
          "value": "belg",
          "operator": "!="
        },
        {
          "name": "firstname",
          "value": "Jan",
          "operator": "=="
        }
      ]
    }
  }
}
````
The following setup will test if the user checked the `other` checkbox in a list of preferred contact methods, based on this, we could show an extra textfield asking him to clarify which other method he then prefers.
````
{
  ...
  "prerequisites": {
    "fieldValues": {
      "logical": "AND",
      "operands": [
        {
          "name": "preferedContactMethod",
          "value": "other",
          "operator": "in"
        }
      ]
    }
  }
}
````