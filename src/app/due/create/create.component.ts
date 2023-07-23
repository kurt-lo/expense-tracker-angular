import { Component, OnInit } from '@angular/core';
import { DueService } from '../due.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit{
  form!:FormGroup;

  constructor(public dueService:DueService, private router:Router){}

  /*DOCU: initializes the names of the properties we want to post. also for form validations.*/
  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('',[Validators.required]),
      description: new FormControl('',[Validators.required]),
      price: new FormControl('',[Validators.required]),
      dueDate: new FormControl('',[Validators.required])
    })
  }

  get input(){
    return this.form.controls;
  }

  submit(){
    console.log(this.form.value);
    this.dueService.create(this.form.value).subscribe((res:any)=>{
      console.log('Added Due Bill Successfully!');
      this.router.navigateByUrl('/due/index');
    })
  }

}
