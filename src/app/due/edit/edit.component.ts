import { Component, OnInit } from '@angular/core';
import { DueService } from '../due.service';
import { ActivatedRoute,  Router} from '@angular/router';
import { Due } from '../due';
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
    due!:Due;

    /*DOCU: ActivatedRoute allows you to use snapshot.params which takes the parameter in your url.
    in this case, its :dueId.*/
    constructor(
        public dueService:DueService,
        private router:Router,
        private route:ActivatedRoute
    ){}

    ngOnInit(): void {
        this.id = this.route.snapshot.params['dueId'];
        this.dueService.find(this.id).subscribe((data:Due)=>{
            this.due = data;

            console.log('due data: '+ JSON.stringify(this.due));
        })

        const now = moment().utcOffset('+8:00').add(1, 'day');
        this.form = new FormGroup({
            name: new FormControl('',[Validators.required]),
            description: new FormControl('',[Validators.required]),
            price: new FormControl('',[Validators.required]),
            dueDate: new FormControl('',[Validators.required]),
        })
    }

    getFormattedDate(dateString: string): string {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
      }

    get input(){
        return this.form.controls;
    }
    
    submit(){
        console.log(this.form.value);
        this.dueService.edit(this.id, this.form.value).subscribe((res:any)=>{
            console.log('Due Bill is updated Successfully');
            this.router.navigateByUrl('/due/index');
        })
    }
}
