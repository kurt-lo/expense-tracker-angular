import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../expense.service';
import { Expense } from '../expense'; /*DOCU: This is the Expense Interface*/
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
    showToggle: boolean = false;
    activeItem: any = null; // keeps track of the currently active item

    expenses: Expense[] = [];
    categories: string[] = [];
    totalExpenses: number = 0;
  
    constructor(public expenseService: ExpenseService, private datePipe: DatePipe) {}
  
    ngOnInit(): void {
      this.expenseService.getAll().subscribe((data: Expense[]) => {
        console.log(data);
        this.expenses = data.map(expense => {
          const transformedDate = this.datePipe.transform(new Date(expense.createdAt), 'MMMM dd yyyy');
          expense.createdAt = transformedDate ? transformedDate : '';
          return expense;
        });
    
        // Sort expenses by createdAt property in descending order
        this.expenses.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    
        // Get all unique categories
        this.categories = Array.from(new Set(this.expenses.map(expense => expense.category)))
          .filter(category => category && category.trim().length > 0);
        
        console.log(this.expenses);
        console.log(this.categories);
    
        this.totalExpenses = this.calculateTotalExpenses();
      });
    }
    
  
    toggleRow(expense: any) {
    this.activeItem = this.activeItem === expense ? null : expense;
    }


    deleteExpense(id: number) {
      this.expenseService.delete(id).subscribe(res => {
        this.expenses = this.expenses.filter(item => item.id !== id);
        console.log('Expense removed successfully!')
        this.totalExpenses = this.calculateTotalExpenses();
      })
    }
  
    showExpensesByCategory(event: any): void {
        const category = event?.target?.value;
        if (category) {
          this.expenseService.show_by_category(category).subscribe(res => {
            this.expenses = res.map((expense: { createdAt: string | number | Date; }) => {
              const transformedDate = this.datePipe.transform(expense.createdAt, 'MMMM dd yyyy');
              expense.createdAt = transformedDate ? transformedDate : '';
              return expense;
            });
            this.totalExpenses = this.calculateTotalExpenses();
          });
        } else {
          this.expenseService.getAll().subscribe((data: Expense[]) => {
            this.expenses = data.map(expense => {
              const transformedDate = this.datePipe.transform(expense.createdAt, 'MMMM dd yyyy');
              expense.createdAt = transformedDate ? transformedDate : '';
              return expense;
            });
            this.totalExpenses = this.calculateTotalExpenses();
          });
        }
      }
      
      

    calculateTotalExpenses(): number {
      return this.expenses.reduce((total, expense) => total + expense.price, 0);
    }
  }
  