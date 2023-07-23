import { Component, OnInit } from '@angular/core';
import { DueService } from '../due.service';
import { Due } from '../due';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit{
    dues:Due[] = [];
    showToggle: boolean = false;
    activeItem: any = null; // keeps track of the currently active item

    constructor(public dueService:DueService, private datePipe:DatePipe){}

    ngOnInit(): void {
        this.dueService.getAll().subscribe((data: Due[])=>{
            console.log(data);
            this.dues = data.map(due =>{
                const transformedDate = this.datePipe.transform(new Date(due.dueDate), 'MMMM dd yyyy');
                due.dueDate = transformedDate ? transformedDate: '';
                return due;
            })
        })
    }

    toggleRow(expense: any) {
        this.activeItem = this.activeItem === expense ? null : expense;
    }

    deleteDue(id:number){
        this.dueService.delete(id).subscribe(res =>{
            this.dues = this.dues.filter(item => item.id !== id);
            console.log('Due Bill Removed Successfully!');
        })
    }

    

}
