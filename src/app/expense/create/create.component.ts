import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../expense.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit{
    form!:FormGroup;

    constructor(public expenseService: ExpenseService, private router:Router){}

    /*DOCU: Initializes the content of the form. This also removes the error at first when
    OnInit is implemented on the class */
    ngOnInit(): void {
    this.form = new FormGroup({
        name: new FormControl('',[Validators.required]),
        category: new FormControl('',[Validators.required]),
        description: new FormControl('',[Validators.required]),
        price: new FormControl('',[Validators.required]),
    })
    }

    /*DOCU: this allows you to access the form controls and their values. */
    get input(){
        return this.form.controls;
    }


    submit(){
        console.log(this.form.value);
        this.expenseService.create(this.form.value).subscribe((res:any)=>{
            console.log('Added Expenses successfully!');
            this.router.navigateByUrl('expense/index');
        })
    }
}
