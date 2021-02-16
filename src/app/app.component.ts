import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, FormArray } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  locations: string[] = ['İstanbul','Ankara','İzmir'];
  departmentForm:FormGroup;

  constructor(private fb:FormBuilder){

  }

  ngOnInit(){
    this.initializeForm();

  }

  initializeForm(): void {
    this.departmentForm = this.fb.group({
      name:'',
      phoneNumber:'',
      preferredLocation: '',
      department: this.fb.group({ //nested form group
          software:false,
          finance:false,
          marketing:false
        }),
        references:this.fb.array([this.fb.control('')])
      });

  }
  onSubmit(): void{ //logging form and inspecting it when we click the apply button
    console.log(this.departmentForm);
  }

  selectLocation(event):void { ////allows us to update a form control
    this.departmentForm.patchValue({
      preferredLocation: event.target.value
    });

  }

  addEmail(): void {
    this.references.push(this.fb.control(''));
  }

  removeEmail(index: number): void {
    this.references.removeAt(index);
  }

  get references(): FormArray {  //looping over it in the template and access
      return this.departmentForm.get('references') as FormArray; //get imported from angular forms
  }


}
