import { Component, OnInit } from '@angular/core';
import { DueService } from '../due.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Due } from '../due';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit{
    id!:number;
    due!:Due;

    constructor(
        public dueService:DueService,
        private route:ActivatedRoute,
        public datePipe:DatePipe
    ){}

    ngOnInit(): void {
        this.id = this.route.snapshot.params['dueId']; //get the id from the url with the :dueId which you declared in the due-routing.module.ts
        console.log("due Id "+this.id);
        this.dueService.find(this.id).subscribe((data:Due)=>{
            this.due = data;
            console.log("expense data: "+ JSON.stringify(this.due));
        })
    }
}
