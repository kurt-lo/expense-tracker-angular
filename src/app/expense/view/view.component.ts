import { Component, OnInit} from '@angular/core';
import { ExpenseService } from '../expense.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Expense } from '../expense';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit{
    id!:number;
    expense!:Expense;
  
    constructor(
        public expenseService: ExpenseService, 
        private route:ActivatedRoute,
        public datePipe: DatePipe
    ){}

    ngOnInit(): void {
        this.id = this.route.snapshot.params['expenseId']; //this is the name of the parameter of the ID in your route
        console.log("expense id: "+this.id);
        this.expenseService.find(this.id).subscribe((data:Expense)=>{
            this.expense = data;
            
            console.log("expense data: " + JSON.stringify(this.expense));
        });

        

    }
}
