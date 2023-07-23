import { Component, OnInit} from '@angular/core';
import { ExpenseService } from '../expense.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Expense } from '../expense';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as moment from 'moment-timezone';

@Component({
    selector: 'app-edit',
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit{
    form!:FormGroup;
    id!:number;
    expense!:Expense;
  
    constructor(
      public expenseService: ExpenseService, 
      private router:Router,
      private route:ActivatedRoute
    ){}
  
    ngOnInit(): void {
        this.id = this.route.snapshot.params['expenseId']; //this is the name of the parameter of the ID in your route
        console.log("expense id: "+this.id);
        this.expenseService.find(this.id).subscribe((data:Expense)=>{
            this.expense = data;
        
            console.log("expense data: " + JSON.stringify(this.expense));
        });
      
    /*DOCU: Initializes the content of the form. This also removes the error at first when
    OnInit is implemented on the class */
  
  
    const now = moment().utcOffset('+08:00');
    this.form = new FormGroup({
        name: new FormControl('', [Validators.required]),
        category: new FormControl('', [Validators.required]),
        description: new FormControl('', [Validators.required]),
        price: new FormControl('', [Validators.required]),
        createdAt: new FormControl(now.toDate())
    });

    }
  
    /*DOCU: this allows you to access the form controls and their values. */
    get input(){
      return this.form.controls;
    }
  
    submit(){       
        console.log(this.form.value);//optional if you want to see the values in the browser console
        this.expenseService.update(this.id, this.form.value).subscribe((res:any)=>{
          console.log('Expense updated successfully');
          this.router.navigateByUrl('expense/index'); //return to index when record has been saved.
        })
      }
}
