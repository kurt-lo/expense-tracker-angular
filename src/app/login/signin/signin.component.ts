import { Component , OnInit} from '@angular/core';
import { LoginService } from '../login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Login } from '../login';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as moment from 'moment-timezone';

/*DOCU: To get the login token */
import { TokenService } from 'src/app/token.service';

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit{
    form!:FormGroup;
    loginToken!:string;

   

    constructor(
    public loginService: LoginService, 
    private router:Router,
    private route:ActivatedRoute,
    private tokenService: TokenService
    ){}

    ngOnInit(): void {
        this.form = new FormGroup({
            username: new FormControl('', [Validators.required]),
            password: new FormControl('', [Validators.required])
        })
    }

    /*DOCU: this allows you to access the form controls and their values. */
    get input(){
        return this.form.controls;
    }

    submit(){
        console.log(this.form.value);
        console.log()
        this.loginService.find(this.form.value['username'],this.form.value['password']).subscribe((res:any)=>{
            console.log('logged in successfully!')
            this.loginToken = Math.random().toString(36).substring(2, 15);
            this.tokenService.setToken(this.loginToken);
            this.router.navigate(['/expense/index']).then(() => {
                location.reload();
              });
        })
    }
}
