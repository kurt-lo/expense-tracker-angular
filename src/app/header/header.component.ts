import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

/*DOCU: To get the login token */
import { TokenService } from 'src/app/token.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
    token!: string;
    
    constructor(private router:Router, private tokenService: TokenService){}

    ngOnInit(): void {
        this.token = this.tokenService.getToken();
    }
    
    logout() {
        this.tokenService.clearToken();
        this.router.navigate(['/login/signin']).then(() => {
            location.reload();
          });
      }
}
